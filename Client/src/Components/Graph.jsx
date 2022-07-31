import React, { useState , useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {PostRequestGraph} from '../logic/functions';







const Graph = () => {
   
    const [data,setData] = useState([]);
    const [current,setCurrent] = useState(0);
    const [loading,setLoading] = useState(true);
    const [likes,setLikes] = useState([]);
  
    
    
    
    const length = data.length;
    
    useEffect(() => {
        
        const artists=[window.location.pathname.split("/")[2]]
        PostRequestGraph(artists,setData,setLoading)
             

        
    },[]);

  const handleLike =  (item) => {
    const artistId=item.artistId;
    const newData=likes;
    newData.push(artistId);
    if(newData.length===5){
        const newData2=[artistId];
        setLikes(newData2);

    }
    else{
        setLikes(newData);

    }
    
    console.log(likes);



    
    
    
   
    setLoading(true);
   

        PostRequestGraph(likes,setData,setLoading)
        
   
  }
  const handleDislike = () => {
    const audio=document.getElementsByTagName("audio");
    for(let i=0;i<audio.length;i++){
        audio[i].pause();
    }

    if(current < length-1){
        setCurrent(current+1);
    }
    else{
        setCurrent(0);
    }
  }

   



    return (
      <div className="SlideShow">
        <div className="SlideShow-container">
            <div className="SlideShow-slides">
                {
                    loading ? <div className="loader"></div> : data.map((item,index) => {
                        return (
                            <div className={index===current? "SlideShow-slide current":"SlideShow-slide"} key={index}>
                                <img src={item.image} alt=""/>
                                <div className='audio'>
                                <ReactAudioPlayer
                                        src={item.url}
                                        controls
                                        controlsList="nodownload noplaybackrate"
                                
                                        
                                        
    
                                    />
                                    </div>
                                    <div className='like-or-not'>
                                    <i className="fa-solid fa-thumbs-up like" id={index} onClick={()=> handleLike(item)}></i>
                                    <i className="fa-solid fa-thumbs-down like" id={index} onClick={()=> handleDislike()}></i>
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