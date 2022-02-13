import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import { getAccessToken, authCallback, getSavedSongs } from './controller/spotifyController';

const host = 'localhost';
const port = 5000;

const app = express();

app.use(express.json())
    .use(cors())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser());


app.get('/', (req, res) => {
        res.send('working...');
    });

app.get('/authorize', getAccessToken);
app.get('/callback', authCallback);
app.get('/getSavedSongs', getSavedSongs);


app.listen(port, host, () => {
    console.log(`server listening at http://${host}:${port}`);
});