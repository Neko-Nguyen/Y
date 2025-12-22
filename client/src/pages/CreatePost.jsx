import "../styles/CreatePost.css";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { createPost } from "../services/PostServices";

function CreatePost() {
   const [formData, setFormData] = useState({
      postText: "",
      file: {}
   });
   const { authState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      if (!authState.status) navigate("/login");
   }, [authState, navigate]);

   function handleChange(e) {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      });
   };

   function handleInputBox(e) {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
   }

   async function fetchCreatePost(e) {
      e.preventDefault();

      try {
         createPost(api, formData, navigate);
      } catch (err) {
         console.error("Error: ", err);
      }
   };

   return (
      <div className="main home">
         <form 
            className="input-box"
            method="post"
            enctype="multipart/form-data"
            onSubmit={fetchCreatePost}
         >
            <input
               type="text"
               autoComplete="off"
               name="postText"
               className="input"
               placeholder="What is in your mind right now..."
               component="textarea"
               onChange={handleChange}
               onInput={handleInputBox}
            />
            <label className="input-label">Description</label>

            <input 
               type="file"
               name="file"
               onChange={handleChange}
               accept="image/*"
            />
            <label className="input-label">Upload Images or Videos</label>

            <button type="submit" className="submit-btn"> Create Post </button>
         </form>
      </div>
  )
}

export default CreatePost
