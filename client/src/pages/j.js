import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
   const [listOfPosts, setListOfPosts] = useState([]);

   useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
         setListOfPosts(response.data);
      });
   }, []);

   return (
      <div class="main">
         {listOfPosts.map((value, key) => {
            return (
               <div class="post"> 
                  <div class="footer"> {value.username} </div>
                  <div class="title"> {value.title} </div>
                  <div class="body"> {value.postText} </div>
               </div>
            );
         })}
      </div>
   );
}

export default Home
