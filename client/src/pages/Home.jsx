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

   function thisLikeAPost(postId) {
      async function fetchLikePost() {
         const updatedPosts = await likePost(api, postId, listOfPosts);
         setListOfPosts(updatedPosts);
      };

      if (authState.id > 0) {
         fetchLikePost();
      }
   };

   function navPost(id) {
      navigate(`/post/${id}`);
   };

   return (
      <div className="main home list-of-posts">
         {listOfPosts.map((value, key) => {
            return (
               <div className="post home-post" onClick={() => navPost(value.id)}>
                  <PostObject postInfo={{
                     id: Number(value.id),
                     userId: Number(value.UserId),
                     postText: value.postText,
                     createdAt: value.createdAt,
                     deletePostFunc: fetchDeletePost,
                     likePostFunc: thisLikeAPost,
                     liked: value.liked,
                     numOfLikes: value.Likes.length
                  }}/>
               </div>
            );
         })}
      </div>
   );
}

export default Home
