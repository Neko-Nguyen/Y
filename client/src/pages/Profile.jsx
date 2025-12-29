import "../styles/Profile.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { deletePost, likePost } from "../services/PostServices";
import { follow, getFollowInfo } from "../services/FollowServices";
import { getBasicInfo } from "../services/UserServices";
import PostObject from "./object/PostObject";

function Profile() {
   let { id } = useParams();
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();
   
   const [username, setUsername] = useState("");
   const [followInfo, setFollowInfo] = useState({
      followers: [],
      followings: [] 
   });
   const [followState, setFollowState] = useState(false);
   const [avatar, setAvatar] = useState("");
   const [bio, setBio] = useState("");
   const [joinTime, setJoinTime] = useState("");
   const [listOfPosts, setListOfPosts] = useState([]);

   useEffect(() => {
      const fetchBasicInfo = async () => {
         const basicInfo = await getBasicInfo(api, id, authState);
         setUsername(basicInfo.username);
         setAvatar(basicInfo.avatar);
         setBio(basicInfo.bio);
         setJoinTime(basicInfo.joinTime);
         setListOfPosts(basicInfo.listOfPosts);
      }
      async function fetchFollowInfo() {
         const newFollowInfo = await getFollowInfo(api, id);
         setFollowInfo(newFollowInfo);
         const newFollowState = newFollowInfo.followers.find(u => u.followerId === authState.id);
         setFollowState(Boolean(newFollowState));
      };

      fetchBasicInfo();
      fetchFollowInfo();
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

   async function fetchFollow() {
      await follow(api, id, setFollowState);
   };

   function navEditProfile() {
      navigate(`/editprofile/${id}`);
   };

   function navPost(id) {
      navigate(`/post/${id}`);
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
            {avatar 
               ? <img className="profile-avatar" src={`${api}/uploads/${avatar}`} alt="avatar"/>
               : <img className="profile-avatar" src="/default-avatar.png" alt="avatar"/>
            }
            <div className="edit-profile">
               <h2>{username}</h2>
               {authState.id === Number(id)
                  ? <button className="submit-btn" onClick={navEditProfile}> 
                        Edit Profile 
                     </button>
                  : <button onClick={fetchFollow} className="btn">
                        {followState ? "Followed" : "Follow"}
                     </button>
               }
            </div>
            
            <p>{bio}</p>

            {joinTime && 
               <div className="join-time">
                  {joinTime.substring(11, 16)} · {joinTime.substring(0, 10)}
               </div>
            }

            <div className="follow-info-container">
               <Link to={`/followinfo/followings/${id}`} className="follow-info">
                  <span className="follow-number">{followInfo.followings.length}</span> Following
               </Link>
               <Link to={`/followinfo/followers/${id}`} className="follow-info">
                  <span className="follow-number">{followInfo.followers.length}</span> Followers
               </Link>
            </div>
         </div>
         
         <div className="list-of-posts">
            {listOfPosts.map((value, key) => {
               return (
                  <div className="post home-post" onClick={() => navPost(value.id)}>
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
