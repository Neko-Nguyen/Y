import "./CreatePost.css";
import { useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
   const { authState } = useContext(AuthContext);
   let navigate = useNavigate();

   useEffect(() => {
      if (!authState.status) {
         navigate("/login");
      }
   }, []);
   
   const initialValues = {
      postText: ""
   };

   const onSubmit = (data) => {
      axios
         .post("http://localhost:3001/posts", data, {
               headers: {
                  accessToken: localStorage.getItem("accessToken")
               }
            })
         .then((response) => {
            navigate("/home");
         });
   };

   const validationSchema = Yup.object().shape({
      postText: Yup.string().required("You need to add some description!")
   });

   return (
      <div className="main home">
         <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema} 
         >
            <Form className="create-post">
               <Field 
                  autoComplete="off"
                  name="postText"
                  className="input"
                  placeholder="Hating Silksong is a such a bad rage bait..."
                  component="textarea"
                  onInput={(event) => {
                     event.target.style.height = "auto";
                     event.target.style.height = event.target.scrollHeight + "px";
                  }}
               />
               <ErrorMessage name="postText" component="span"/>
               <label className="create-post-label">Description</label>

               <button type="submit" className="submit-btn"> Create Post </button>
            </Form>
         </Formik>
      </div>
  )
}

export default CreatePost
