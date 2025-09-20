import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {

   const [listOfPosts, setListOfPosts] = useState([]);
   let navigate = useNavigate();

   useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
         setListOfPosts(response.data);
      });
   }, []);

   return (
      <div className="main home list-of-posts">
         {listOfPosts.map((value, key) => {
            return (
               <div 
                  className="post home-post"
                  onClick={() => {
                     navigate(`/post/${value.id}`);
                  }}
               > 
                  <div className="footer"> {value.username} </div>
                  <div className="body"> {value.postText} </div>
                  {value.createdAt && 
                     <div className="time">
                        {value.createdAt.substring(11, 16)} · {value.createdAt.substring(0, 10)}
                     </div>
                  }
               </div>
            );
         })}
      </div>
   );
}

export default Home
