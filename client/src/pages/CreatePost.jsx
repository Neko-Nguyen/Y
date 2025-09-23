import "./CreatePost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
   let navigate = useNavigate();
   
   const initialValues = {
      postText: "",
      username: "",
   };

   const onSubmit = (data) => {
      axios.post("http://localhost:3001/posts", data).then((response) => {
         navigate("/home");
      });
   };

   const validationSchema = Yup.object().shape({
      postText: Yup.string().required("You need to add some description!"),
      username: Yup.string().min(3).max(15).required("You need to add your username!"),
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
                  name="username" 
                  className="input"
                  placeholder="Neko..."
               />
               <ErrorMessage name="username" component="span"/>
               <label className="create-post-label">Username</label>

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
