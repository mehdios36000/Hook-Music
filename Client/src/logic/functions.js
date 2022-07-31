import axios from "axios";



const PostRequestGraph = (artists,setData,setLoading) => {
    
    
   axios.post(`http://${process.env.REACT_APP_DOMAIN}:4000/login`, {
        username: process.env.REACT_APP_USERNAME,  
        password:process.env.REACT_APP_PASSWORD
    })
        .then(res => {
            axios.post(`http://${process.env.REACT_APP_DOMAIN}:3001/api/data/get-tracks` ,
            {
                artistId:artists
                    
                
            },
            {  
                headers: {
                   "Authorization": `Bearer ${res.data.accessToken}`,
                    "Content-Type": "application/json"
                }

            },
            ).then(res => {
                setData(res.data)
                setLoading(false)
                


            }
            )       
        }
        )
        .catch(err => {
            console.log(err);
        }

        )
    
}
const PostRequestHome=(value,setData)=>{
    axios.post(`http://${process.env.REACT_APP_DOMAIN}:4000/login`, {
        username: process.env.REACT_APP_USERNAME,
        password:process.env.REACT_APP_PASSWORD
    })
        .then(res => {
            axios.post(`http://${process.env.REACT_APP_DOMAIN}:3001/api/data` ,
            {
                query:value
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

const handleDislike = (setCurrent,current,length) => {
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

const onChange = (event,setData,setValue) => {
    if(event.target.value.length > 0){
       PostRequestHome(event.target.value,setData);
    
    }


    setValue(event.target.value);
};
const onSearch = (searchTerm,navigate) => {
    navigate(`/search/${searchTerm}`);
 
};
const handleLike = (item,likes,setLikes,setLoading,setData) => {
    const artistId = item.artistId;
    const newData = likes;
    newData.push(artistId);
    if (newData.length === 5) {
        const newData2 = [artistId];
        setLikes(newData2);

    }
    else {
        setLikes(newData);

    }

   
    setLoading(true);
    PostRequestGraph(likes, setData, setLoading)

}


export { PostRequestGraph,PostRequestHome,handleDislike,onChange,onSearch,handleLike };