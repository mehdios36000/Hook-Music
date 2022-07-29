import React,{useState} from 'react'
var data = require("./MOCK_DATA_SLIDER.json");

const Graph = () => {
   const [play, setPlay] = useState(false);

   setTimeout(() => {

     const playingContainer = document.getElementsByClassName("play-container")[0];
     playingContainer.style.display="none"; 
       
        
    }
    , 4000);
   const handleShow = (index) => {
        

        const playingContainer = document.getElementsByClassName("play-container")[index];
        playingContainer.style.display = "block";
    }
    const handleHide = (index) => {
        const playingContainer = document.getElementsByClassName("play-container")[index];
       
      
            playingContainer.style.display="none";
       
        
    }
    return (

    <>
      <div class="slider">
    
        {data.map((item, index) => (
           
              <a href={"#slide-"+(index+1)}>{(index+1)}</a>
               
      
          
           

            
        ))}
            


      


  
    

  <div class="slides">
    {data.map((item, index) => (
         <div id={"slide-"+(index+1)} onClick={() => setPlay(!play)} onMouseEnter={() => handleShow(index)}
         onMouseLeave={() => handleHide(index)}>
         <img src={item.img} alt="item-slider"/>
         <div className='play-container'>
         {play? <i class="fa-solid fa-pause play-button"></i>  : <i class="fa-solid fa-play play-button" ></i>} 
            </div>
         
       </div>
    ))}
   
   
  </div>
</div>

    </>
  )
}

export default Graph