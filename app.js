require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// setting the spotify-api goes here:

// Our routes go here:

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/artist-search-results', (req, res) => {
    spotifyApi
    .searchArtists(req.query.artist)
    .then(data => {
        console.log(data.body.artists)
        res.render('artist-search-results', {artists: data.body.artists.items})
    })
    .catch(error => console.log('some error in the search: ', error))
})

app.get('/albums/:artistId', (req, res) => {
    spotifyApi
    .getArtistAlbums(req.params.artistId)
    .then(data => {
        console.log(data.body.items)
        res.render('albums', {albums: data.body.items})
    })
    .catch(error => console.log('some error in the search: ', error))
})

app.get('/tracks/:albumId', (req, res) => {
    spotifyApi
    .getAlbumTracks(req.params.albumId)
    .then(data => {
        console.log(data.body.items)
        res.render('tracks', {tracks: data.body.items})
    })
    .catch(error => console.log('some error in the search: ', error))
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
