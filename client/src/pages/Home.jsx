import "../styles/Home.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { getHomePosts, likePost } from "../api/Post";

function Home() {
   const [listOfPosts, setListOfPosts] = useState([]);
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      if (!authState.status) navigate("/");
      getHomePosts(api, authState.id, setListOfPosts);
   }, [authState.id]);

   const thisLikeAPost = (postId) => {
      if (authState.id > 0) {
         likePost(postId, api, listOfPosts, setListOfPosts);
      }
   }

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
                  <div className="header">
                     <Link 
                        to={`/profile/${value.UserId}`} 
                        className="username"
                        onClick={(e) => {
                           e.stopPropagation();
                        }}
                     >
                        {value.username}
                     </Link>
                     
                     <div></div>
                  </div>

                  <div className="body">{value.postText}</div>

                  <div className="footer">
                     <div className="like-btn-container">
                        <div 
                           className={value.liked ? "like-btn liked" : "like-btn"}
                           onClick={(e) => {
                              thisLikeAPost(value.id);
                              e.stopPropagation();
                           }}
                        >
                           {value.liked 
                              ? <Favorite sx={{ fontSize: 15 }}/>
                              : <FavoriteBorder sx={{ fontSize: 15 }}/>
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
   );
}

export default Home
