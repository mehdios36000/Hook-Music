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


export { PostRequestGraph};