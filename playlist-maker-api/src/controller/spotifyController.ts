import { getRandomString } from '../util/util';
import config from '../config';
import { Request, Response } from 'express';
import axios from 'axios';
import type { Artist } from '../models/spotify-models';
import type { Song } from '../models/api-models';

export const getAccessToken = async (req: Request, res: Response) => {
    const state = getRandomString(16);
    res.cookie(config['state_key'], state);

    const scope = config['scopes'];
    var params = new URLSearchParams({
        response_type: 'code',
        client_id: config['client_id'],
        scope: config['scopes'],
        redirect_uri: config['redirect_uri'],
        state: state
    });
    res.redirect('https://accounts.spotify.com/authorize?' + params.toString());
};

export const authCallback = async (req: Request, res: Response) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[config['state_key']] : null;
    if (state == null || state != storedState) {
        const params = new URLSearchParams({
            'error': 'state_mismatch'
        });
        res.redirect('/#' + params.toString());
    }
    else {
        res.clearCookie(config['state_key']);
        var response = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: {
                code: code,
                redirect_uri: config['redirect_uri'],
                grant_type:'authorization_code'
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: config['client_id'],
                password: config['client_secret']
            }
        });
        config['access_token'] = response.data.access_token;
        console.log(config['access_token']);
        res.send('accessToken: ' + config['access_token']);
    }
};


export const getSavedSongs = async (req: Request, res: Response) => {
    var apiResponse = await axios({
        url: 'https://api.spotify.com/v1/me/tracks',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config['access_token']}`
        }
    });
    
    var savedSongs = apiResponse.data.items.reduce((arr: Song[], item: any) => {
        var output: Song = {
            name: item.track.name,
            id: item.track.id,
            href: item.track.href,
            album: item.track.album.name,
            artists: item.track.artists.map((artist: Artist) => artist.name)
        }
        return [...arr, output]
    },[]);

    console.log(savedSongs);

    res.send(savedSongs);
};