import "./Home.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
   const [listOfPosts, setListOfPosts] = useState([]);
   const { authState } = useContext(AuthContext);
   let navigate = useNavigate();

   useEffect(() => {
      axios.get("http://localhost:3001/posts").then((response) => {
         const updatedPosts = response.data.map((post) => {
            console.log("use");
            const isLiked = post.Likes.some((like) => like.UserId === authState.id);
            return { ...post, liked: isLiked };
         });
         setListOfPosts(updatedPosts);
      });
   }, [authState.id]);

   const LikeAPost = (postId) => {
      axios
         .post("http://localhost:3001/likes", {
               PostId: postId
            }, {
               headers: {
                  accessToken: localStorage.getItem("accessToken")
               }
            })
         .then((response) => {
            setListOfPosts(listOfPosts.map((post) => {
               if (post.id !== postId) return post;

               if (response.data.liked) {
                  return { ...post, Likes: [...post.Likes, 0], liked: !post.liked };
               } else {
                  const likesArray = post.Likes;
                  likesArray.pop();
                  return { ...post, Likes: likesArray, liked: !post.liked };
               }
            }));
         });
   };

   return (
      <div className="main home list-of-posts">
         {listOfPosts.map((value, key) => {
            return (
               <div className="post home-post"> 
                  <div className="username">{value.username}</div>

                  <div 
                     className="body"
                     onClick={() => {
                        navigate(`/post/${value.id}`);
                     }}
                  >{value.postText}</div>

                  <div className="footer">
                     <div className="like-btn-container"> 
                        <button
                           className={value.liked ? "like-btn liked" : "like-btn"}
                           onClick={() => {
                              LikeAPost(value.id);
                           }}
                        >❤︎</button>
                        <label className="like-btn-label">{value.Likes.length}</label>
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
