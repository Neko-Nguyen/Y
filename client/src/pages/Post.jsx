import "../styles/Post.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { deletePost, getPostById, likePost } from "../api/Post";
import { addComment, deleteComment, getCommentsByPostId, } from "../api/Comment";
import PostObject from "./object/PostObject";
import CommentObject from "./object/CommentObject";

function Post() {
   let { id } = useParams();
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   const [postObject, setPostObject] = useState({ 
      Likes: [], UserId: 0, liked: false
   });
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

   useEffect(() => {
      async function fetchPostAndUserById() {
         const data = await getPostById(api, id);
         const postData = {
            ...data,
            liked: data.Likes.find(x => x.UserId === authState.id) != null
         }
         setPostObject(postData);
      };
      async function fetchCommentsByPostId() {
         const data = await getCommentsByPostId(api, id);
         setComments(data);
      };

      fetchPostAndUserById();
      fetchCommentsByPostId();
   }, [api, id, setPostObject, setComments, authState]);

   async function fetchDeletePost(id) {
      await deletePost(api, id, navigate);
   };

   async function fetchAddComment() {
      const newCommentData = { commentBody: newComment, PostId: id };
      const commentsData = await addComment(api, comments, newCommentData);

      setComments(commentsData);
      setNewComment("");
   };

   async function fetchDeleteComment(id) {
      const newComments = await deleteComment(api, id, comments);
      setComments(newComments);
   };

   function thisLikeAPost(id) {
      async function fetchLikePost() {
         const updatedPosts = await likePost(api, id, [postObject]);
         setPostObject(updatedPosts[0]);
      };

      if (authState.id > 0) {
         fetchLikePost();
      }
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

            <PostObject postInfo={{
               postObject: postObject,
               deletePostFunc: fetchDeletePost,
               likePostFunc: thisLikeAPost
            }}/>
         </div>

         <div className="post">
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
                     <CommentObject commentInfo={{
                        commentObject: value,
                        deleteCommentFunc: fetchDeleteComment
                     }}/>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Post
