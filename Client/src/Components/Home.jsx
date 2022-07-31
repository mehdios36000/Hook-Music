import axios from 'axios';
import React from 'react'
import { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { onChange,onSearch } from '../logic/functions';


const Home = () => {
    const [value, setValue] = useState("");
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        //if the url contains the access_token
        if(window.location.href.includes("access_token")){
            //get the access_token
            const access_token = window.location.href.split("access_token=")[1].split("&")[0];
            console.log(access_token);
    
            axios.post(`http://${process.env.REACT_APP_DOMAIN}:4000/login`, {
                username: process.env.REACT_APP_USERNAME,  
                password:process.env.REACT_APP_PASSWORD
            })
                .then(res => {
                    axios.post(`http://${process.env.REACT_APP_DOMAIN}:3001/api/data/save-tracks` ,
                    {
                        tracks:JSON.parse(localStorage.getItem("tracks")),
                        accessToken:access_token

                            
                        
                    },
                    {  
                        headers: {
                           "Authorization": `Bearer ${res.data.accessToken}`,
                            "Content-Type": "application/json"
                        }
        
                    },
                    ).then(res => {
                        if(res.data.message === "tracks added to playlist"){
                            localStorage.removeItem("tracks");
                           
                        }
                        
                        
        
        
                    }
                    )       
                }
                )
                .catch(err => {
                    console.log(err);
                }
        
                )
        }
    }, []);
    return (
        <section className='home'>
            <div className='card'>
                <div className='header-title'>
                    Hook Music
                </div>
                <div className='header-subtitle'>
                    Discover new music starting from a root node
                </div>
                <div className='search-label'>
                    Enter the name of an artist to start
                </div>
                <div className="search-container">
                    <div className="search-inner">
                        <input type="text" value={value} onChange={(e)=>onChange(e,setData,setValue)} />
                        <div className="dropdown">
                        {data
                            .filter((item) => {
                                const searchTerm = value.toLowerCase();
                                const artist = item.artist.toLowerCase();

                                return (
                                    searchTerm &&
                                    artist.startsWith(searchTerm) &&
                                    artist !== searchTerm
                                );
                            })
                            .slice(0, 10)
                            .map((item,index) => (
                                <div
                                    onClick={() => onSearch(item.artistId,navigate)}
                                    className="dropdown-row"
                                    key={item.artist}
                                >
                                    {item.artist}
                                </div>
                            ))}
                            
                    </div>
                       
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default Home