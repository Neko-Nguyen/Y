import "../styles/Home.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { getHomePosts, likePost } from "../services/PostServices";
import ListOfPosts from "./object/ListOfPosts";

function Home() {
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();
   
   const [listOfPosts, setListOfPosts] = useState([]);

   useEffect(() => {
      if (!authState.status) navigate("/");
      async function fetchData() {
         const data = await getHomePosts(api, authState.id);
         setListOfPosts(data);
      }
      
      fetchData();
   }, [api, authState.id, authState.status, navigate, setListOfPosts]);

   async function fetchLikePost(id) {
      if (authState.id > 0) {
         const updatedPosts = await likePost(api, id, listOfPosts);
         setListOfPosts(updatedPosts);
      }
   }

   return (
      <div className="main home">
         <ListOfPosts info={{
            listOfPosts: listOfPosts,
            enableDelete: false,
            enableLike: true,
            deletePostFunc: () => {},
            likePostFunc: fetchLikePost
         }}/>
      </div>
   );
}

export default Home
