import "./Post.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
   let { id } = useParams();
   const [postObject, setPostObject] = useState({});

   useEffect(() => {
      axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
         setPostObject(response.data);
      });
   }, []);

   return (
      <div class="main">
         <div class="post">
            <div class="footer"> {postObject.username} </div>
            <div class="title"> {postObject.title} </div>
            <div class="body"> {postObject.postText} </div>
         </div>
            
         <div class="comment"></div>
      </div>
   );
}

export default Post
