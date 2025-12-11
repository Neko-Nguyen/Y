import "../styles/Post.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { deletePost, getPostById } from "../api/Post";
import { addComment, deleteComment, getCommentsByPostId, } from "../api/Comment";

function Post() {
   let { id } = useParams();
   const [postObject, setPostObject] = useState({});
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      const fetchPostById = async () => {
         const data = await getPostById(api, id);
         setPostObject(data);
      };
      const fetchCommentsByPostId = async () => {         
         const data = await getCommentsByPostId(api, id);
         setComments(data);
      };

      fetchPostById();
      fetchCommentsByPostId();
   }, [api, id, setPostObject, setComments]);

   async function fetchAddComment() {
      const newCommentData = {
         commentBody: newComment,
         PostId: id
      };
      const commentsData = await addComment(api, comments, newCommentData);

      setComments(commentsData);
      setNewComment("");
   };

   async function fetchDeleteComment(id) {
      const newComments = await deleteComment(api, id, comments);
      setComments(newComments);
   };

   async function fetchDeletePost() {
      await deletePost(api, postObject.id, navigate);
   };

   return (
      <div className="main home post-full">
         <div className="post">
            <div className="go-back">
               <KeyboardBackspaceIcon 
                  sx={{ fontSize: 25 }} 
                  className="go-back-icon"
                  onClick={() => {
                     navigate("/home");
                  }}
               />
               <div className="go-back-text">Post</div>
            </div>

            <div className="header">
               <Link to={`/profile/${id}`} className="username">
                  {postObject.username}
               </Link>

               {authState.username === postObject.username ? (
                  <button 
                     className="delete-btn"
                     onClick={fetchDeletePost}
                  >✖</button>
               ) : (
                  <div></div>
               )}
            </div>

            <div className="body"> {postObject.postText} </div>

            {postObject.createdAt && (
               <div className="single-post-time time">
                  {postObject.createdAt.substring(11, 16)} · {postObject.createdAt.substring(0, 10)}
               </div>
            )}
            
            <div className="create-comment-container">
               <textarea
                  autoComplete="off"
                  type="text"
                  className="create-comment-input input"
                  placeholder="Post your comment..."
                  value={newComment}
                  onInput={(event) => {
                     event.target.style.height = "auto";
                     event.target.style.height = event.target.scrollHeight + "px";
                  }}
                  onChange={(event) => {
                     setNewComment(event.target.value);
                  }}
               />
               <button className="create-comment-btn" onClick={fetchAddComment}> Comment </button>
            </div>
         </div>  

         <div className="list-of-comments">
            {comments.map((value, key) => {
               return (
                  <div className="comment-container">
                     <div className="header">
                        <Link to={`/profile/${value.id}`} className="username">
                           {value.username}
                        </Link>

                        {authState.username === value.username ? (
                           <button 
                              className="delete-btn"
                              onClick={() => {
                                 fetchDeleteComment(value.id)
                              }}
                           >✖</button>
                        ) : (
                           <div></div>
                        )}
                     </div>

                     <div className="comment"> {value.commentBody} </div>

                     {value.createdAt && 
                        <div className="time">
                           {value.createdAt.substring(11, 16)} · {value.createdAt.substring(0, 10)}
                        </div>  
                     }
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Post
