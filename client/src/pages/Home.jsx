import "../styles/Home.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { storage } from "../helpers/Storage";

function Home() {
   const [listOfPosts, setListOfPosts] = useState([]);
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      if (!authState.status) {
         navigate("/login");
      }

      axios
         .get(`${api}/posts`)
         .then((response) => {
            const updatedPosts = response.data.map((post) => {
               const isLiked = post.Likes.some((like) => like.UserId === authState.id);
               return { ...post, liked: isLiked };
            });
            setListOfPosts(updatedPosts);
         });
   }, [authState.id]);

   const LikeAPost = (postId) => {
      if (authState.id > 0) {
         axios
            .post(`${api}/likes`, {
                  PostId: postId
               }, {
                  headers: {
                     accessToken: localStorage.getItem(storage)
                  }
               })
            .then((response) => {
               setListOfPosts(listOfPosts.map((post) => {
                  if (post.id !== postId) return post;
   
                  if (response.data.liked) {
                     return { ...post, Likes: [...post.Likes, 0], liked: true };
                  } else {
                     const likesArray = post.Likes;
                     likesArray.pop();
                     return { ...post, Likes: likesArray, liked: false };
                  }
               }));
            });
      }
   };

   return (
      <div className="main home list-of-posts">
         {listOfPosts.map((value, key) => {
            return (
               <div className="post home-post">
                  <div className="header">
                     <div></div>
                     <Link to={`/profile/${value.UserId}`} className="username">
                        {value.username}
                     </Link>
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
                              LikeAPost(value.id);
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
   );
}

export default Home
