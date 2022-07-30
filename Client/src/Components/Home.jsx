import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Home = () => {
    const [value, setValue] = useState("");
    const [data,setData] = useState([{
        "artist": "",
    }]);
    const navigate = useNavigate();
    const onChange = (event) => {
        if(event.target.value.length > 0){
            axios.post("http://localhost:4000/login", {
            username: "test",
            password:"test"
        })
            .then(res => {
                axios.post("http://localhost:3001/api/data" ,
                {
                    query:event.target.value
                },
                {  
                    headers: {
                       "Authorization": `Bearer ${res.data.accessToken}`,
                        "Content-Type": "application/json"
                    }

                },
                                
                ).then(res => {
                    console.log(res.data);
                    setData(res.data);
                }
                )       
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
        
        }


        setValue(event.target.value);
    };

    const onSearch = (searchTerm,index) => {
    
        

        //navigate and send the country as a parameter to the next page

        navigate(`/search/${searchTerm}`, {
            state: {
                country:data
                }
                });
     
    };

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
                        <input type="text" value={value} onChange={onChange} />
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
                                    onClick={() => onSearch(item.artistId,index)}
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