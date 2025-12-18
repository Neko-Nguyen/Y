import "../styles/Profile.css";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { likePost } from "../api/Post";
import { getBasicInfo } from "../api/User";
import { follow, getFollowInfo } from "../api/Follows";

function Profile() {
   let { id } = useParams();
   const [username, setUsername] = useState("");
   const [joinTime, setJoinTime] = useState("");
   const [listOfPosts, setListOfPosts] = useState([]);
   const [followInfo, setFollowInfo] = useState({
      followers: [],
      followings: [] 
   });
   const [followState, setFollowState] = useState(false);
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      const fetchBasicInfo = async () => {
         const basicInfo = await getBasicInfo(api, id, authState);
         setUsername(basicInfo.username);
         setJoinTime(basicInfo.joinTime);
         setListOfPosts(basicInfo.listOfPosts);
      }
      async function fetchFollowInfo() {
         const followInfo = await getFollowInfo(api, id);
         setFollowInfo(followInfo);
         const newFollowState = followInfo.followers.find(u => u.followerId === authState.id);
         setFollowState(newFollowState);
      };

      fetchBasicInfo();
      fetchFollowInfo();
   }, [api, id, authState]);

   const fetchLikePost = async (postId) => {
      if (authState.id > 0) {
         const updatedPosts = await likePost(postId, api, listOfPosts);
         setListOfPosts(updatedPosts);
      }
   };

   async function fetchFollow() {
      await follow(api, id, setFollowState);
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
            <h2>{username}</h2>

            {authState.id !== Number(id)
            ? <button onClick={fetchFollow} className="btn">
                  {followState ? "Followed" : "Follow"}
               </button>
            : <div className="block"></div>}

            {joinTime && 
               <div className="join-time">
                  {joinTime.substring(11, 16)} · {joinTime.substring(0, 10)}
               </div>
            }

            <div className="follow-info-container">
               <Link className="follow-info">
                  <span className="follow-number">{followInfo.followings.length}</span> Following
               </Link>
               <Link className="follow-info">
                  <span className="follow-number">{followInfo.followers.length}</span> Followers
               </Link>
            </div>
         </div>
         
         <div className="list-of-posts">
            {listOfPosts.map((value, key) => {
               return (
                  <div 
                     className="post home-post"
                  >
                     <div className="header">
                        <Link to={`/profile/${id}`} className="username">{username}</Link>
                        <div></div>
                     </div>
   
                     <div 
                        className="body"
                        onClick={() => {
                           navigate(`/post/${value.id}`);
                        }}
                     >{value.postText}</div>
   
                     <div className="footer">
                        <div className="like-btn-container">
                           <div 
                              className={value.liked ? "like-btn liked" : "like-btn"}
                              onClick={() => {
                                 fetchLikePost(value.id);
                              }}
                           >
                              {value.liked 
                                 ? <Favorite sx={{ fontSize: 15}}/>
                                 : <FavoriteBorder sx={{ fontSize: 15}}/>
                              }
                           </div>
                           <label 
                              className={value.liked ? "like-btn-label liked" : "like-btn-label"}
                           >
                              {value.Likes.length}
                           </label>
                        </div>
   
                        {value.createdAt && 
                           <div className="time">
                              {value.createdAt.substring(11, 16)} · {value.createdAt.substring(0, 10)}
                           </div>
                        }
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   )
}

export default Profile
