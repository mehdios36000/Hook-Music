import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import ReactAudioPlayer from 'react-audio-player';

var data = require("./MOCK_DATA_SLIDER.json");


const Graph = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;


    const nextSlide = () => {
        console.log("nextSlide");
        setCurrent(current === length - 1 ? 0 : current + 1);

    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);

    };

    if (!Array.isArray(slides) || slides.length <= 0) {
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
                                <img src={item.img} className='image' alt="" />
                                <div className='audio'>
                                <ReactAudioPlayer
                                    src={item.audio}
                                    controls
                                    controlsList="nodownload noplaybackrate"
                                    
                                    

                                />
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