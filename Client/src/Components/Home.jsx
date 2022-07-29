import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
var data = require("./MOCK_DATA.json");



const Home = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);

        navigate("/search/" + value);
        console.log("search ", searchTerm);
    };

    return (
        <div>
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
                       
                    </div>
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
                            .map((item) => (
                                <div
                                    onClick={() => onSearch(item.full_name)}
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
    )
}

export default Home