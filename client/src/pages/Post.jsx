import "./Post.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
   let { id } = useParams();
   const [postObject, setPostObject] = useState({});
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

   useEffect(() => {
      axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
         setPostObject(response.data);
      });

      axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
         setComments(response.data);
      });
   }, []);

   const addComment = () => {
      axios
         .post("http://localhost:3001/comments", {
            commentBody: newComment, 
            PostId: id,
         }, {
            headers: {
               accessToken: sessionStorage.getItem("accessToken")
            }
         })
         .then((response) => {
            if (response.data.error) {
               alert(response.data.error);
            } else {
               const commentToAdd = { 
                  commentBody: newComment,
                  username: response.data.username,
               };
               setComments([...comments, commentToAdd]);
   
               setNewComment("");
            }
         });
   };

   return (
      <div className="main home post-full">
         <div className="post">
            <div className="footer"> {postObject.username} </div>
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
               <button className="create-comment-btn" onClick={addComment}> Comment </button>
            </div>
         </div>  

         <div className="list-of-comments">
            {comments.map((value, key) => {
               return (
                  <div className="comment-container">
                     <div className="footer"> {value.username} </div>
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
