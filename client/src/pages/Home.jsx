import "../styles/Home.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { deletePost, getHomePosts, likePost } from "../api/Post";
import PostObject from "./object/PostObject";

function Home() {
   const [listOfPosts, setListOfPosts] = useState([]);
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      if (!authState.status) navigate("/");
      async function fetchData() {
         const data = await getHomePosts(api, authState.id);
         setListOfPosts(data);
      }

      fetchData();
   }, [api, authState.id, authState.status, navigate, setListOfPosts]);

   async function fetchDeletePost(id) {
      await deletePost(api, id, navigate);
   };

   async function fetchLikePost(id) {
      if (authState.id > 0) {
         const updatedPosts = await likePost(api, id, listOfPosts);
         setListOfPosts(updatedPosts);
      }
   }

   function navPost(id) {
      navigate(`/post/${id}`);
   };

   return (
      <div className="main home list-of-posts">
         {listOfPosts.map((value, key) => {
            return (
               <div className="post home-post" onClick={() => navPost(value.id)}>
                  <PostObject postInfo={{
                     postObject: value,
                     deletePostFunc: fetchDeletePost,
                     likePostFunc: fetchLikePost
                  }}/>
               </div>
            );
         })}
      </div>
   );
}

export default Home
