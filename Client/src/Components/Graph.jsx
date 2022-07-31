import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { PostRequestGraph, handleDislike,handleLike } from '../logic/functions';







const Graph = () => {

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState([]);
    const length = data.length;

    useEffect(() => {

        const artists = [window.location.pathname.split("/")[2]]
        PostRequestGraph(artists, setData, setLoading)


    }, []);

   
    return (
        <div className="SlideShow">
            <div className="SlideShow-container">
                <div className="SlideShow-slides">
                    {
                        loading ? <div className="loader"></div> : data.map((item, index) => {
                            return (
                                <div className={index === current ? "SlideShow-slide current" : "SlideShow-slide"} key={index}>
                                    <img src={item.image} alt="" />
                                    <div className='audio'>
                                        <ReactAudioPlayer
                                            src={item.url}
                                            controls
                                            controlsList="nodownload noplaybackrate"




                                        />
                                    </div>
                                    <div className='like-or-not'>
                                        <i className="fa-solid fa-thumbs-up like" id={index} onClick={() => handleLike(item,likes,setLikes,setLoading,setData)}></i>
                                        <i className="fa-solid fa-thumbs-down like" id={index} onClick={() => handleDislike(setCurrent, current, length)}></i>
                                    </div>
                                </div>
                            )
                        }
                        )

                    }
                </div>
            </div>




        </div>



    );
};

export default Graph;