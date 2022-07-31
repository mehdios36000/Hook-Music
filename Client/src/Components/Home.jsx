import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { onChange,onSearch } from '../logic/functions';


const Home = () => {
    const [value, setValue] = useState("");
    const [data,setData] = useState([]);
    const navigate = useNavigate();
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