import "../styles/Profile.css";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { deletePost, likePost } from "../services/PostServices";
import { getBasicInfo } from "../services/UserServices";
import PostObject from "./object/PostObject";

function Profile() {
   let { id } = useParams();
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   const [username, setUsername] = useState("");
   const [bio, setBio] = useState("");
   const [joinTime, setJoinTime] = useState("");
   const [listOfPosts, setListOfPosts] = useState([]);

   useEffect(() => {
      const fetchBasicInfo = async () => {
         const basicInfo = await getBasicInfo(api, id, authState);
         setUsername(basicInfo.username);
         setBio(basicInfo.bio);
         setJoinTime(basicInfo.joinTime);
         setListOfPosts(basicInfo.listOfPosts);
      }

      fetchBasicInfo();
   }, [api, id, authState]);

   async function fetchDeletePost(id) {
      await deletePost(api, id, navigate);
   };

   async function fetchLikePost(id) {
      if (authState.id > 0) {
         const updatedPosts = await likePost(api, id, listOfPosts);
         setListOfPosts(updatedPosts);
      }
   };

   function navEditProfile() {
      navigate(`/editprofile/${id}`);
   };

   return (
      <div className="main home">
         <div className="go-back">
            <KeyboardBackspaceIcon 
               sx={{ fontSize: 25 }} 
               className="go-back-icon"
               onClick={() => {
                  navigate("/home");
               }}
            />
         <div className="go-back-text">{username}</div>
         </div>

         <div className="basic-info">
            <div className="edit-profile">
               <h2>{username}</h2>
               {authState.id === Number(id) &&
                  <button className="submit-btn" onClick={navEditProfile}> 
                     Edit Profile 
                  </button>
               }
            </div>
            <p>{bio}</p>
            {joinTime && 
               <div className="join-time">
                  {joinTime.substring(11, 16)} · {joinTime.substring(0, 10)}
               </div>
            }
         </div>
         
         <div className="list-of-posts">
            {listOfPosts.map((value, key) => {
               return (
                  <div 
                     className="post home-post"
                  >
                     <PostObject postInfo={{
                        postObject: value,
                        isDirectPost: false,
                        deletePostFunc: fetchDeletePost,
                        likePostFunc: fetchLikePost
                     }}/>
                  </div>
               );
            })}
         </div>
      </div>
   )
}

export default Profile
