import React, { useState , useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';





const Graph = () => {
    const [current, setCurrent] = useState(0);
    const [data,setData] = useState([{
        "artist": "",
    }]);
    
    const length = data.length;
    useEffect(() => {
        
        axios.post("http://localhost:4000/login", {
            username: "test",  
            password:"test"
        })
            .then(res => {
                axios.post("http://localhost:3001/api/data/get-tracks" ,
                {
                    artistId:window.location.pathname.split("/")[2]
                },
                {  
                    headers: {
                       "Authorization": `Bearer ${res.data.accessToken}`,
                        "Content-Type": "application/json"
                    }

                },
                ).then(res => {
                    setData(res.data);
                }
                )       
            }
            ) 
    },[]);


    const nextSlide = () => {
        console.log("nextSlide");
        setCurrent(current === length - 1 ? 0 : current + 1);

    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);

    };

    if (!Array.isArray(data) || data.length <= 0) {
        return null;
    }



    return (
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />

            {data.map((item, index) => {
                console.log(item);
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (

                            <div className='elements-caroussel'>
                                <img src={item.image} className='image' alt="" />
                                <div className='audio'>
                                <ReactAudioPlayer
                                    src={item.url}
                                    controls
                                    controlsList="nodownload noplaybackrate"
                                    
                                    

                                />
                                
                                </div>
                                <div className='like-or-not'>
                                <i class="fa-solid fa-thumbs-up like" id={index}></i>
                                <i class="fa-solid fa-thumbs-down like" id={index}></i>
                                    </div>
                               


                            </div>

                        )}
                    </div>
                );
            })}

        </section>
    );
};

export default Graph;