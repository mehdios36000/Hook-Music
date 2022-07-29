'use strict'
require('dotenv').config()
const SpotifyWebApi = require('spotify-web-api-node');

 exports.querySpotify= (req, res) => {
    const query = req.body.query;
    console.log(query);

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI
        });
        spotifyApi.clientCredentialsGrant().then(
            function(data) {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
                if(query){
                  //query spotify by artist name

                spotifyApi.searchArtists(query).then(
                    function(data) {
                           
                        const artists=data.body.artists.items;
                         //filter the artists list to {"artist":}
                        const artistsList=artists.map(artist=>{
                            return {
                                "artist":artist.name,
                                "artistId":artist.id
                            }
                        }
                        )
                        
                      


                
                        res.status(200).json(artistsList);
                    }
                );
                }
                
                
            }
        ).catch(function(err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
        );


 

   

}
