import "./CreatePost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
   let navigate = useNavigate();

   const initialValues = {
      title: "",
      postText: "",
      username: "",
   };

   const validationSchema = Yup.object().shape({
      title: Yup.string().required("You need to add a title!"),
      postText: Yup.string().required("You need to add some description!"),
      username: Yup.string().min(3).max(15).required("You need to add your username!"),
   });

   const onSubmit = (data) => {
      axios.post("http://localhost:3001/posts", data).then((response) => {
         navigate("/");
      });
   };

   return (
      <div class="main">
         <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
         >
            <Form class="input">
               <Field 
                  autocomplete="off"
                  id="create-post-username" 
                  name="username" 
                  placeholder="Neko..."
               />
               <ErrorMessage name="username" component="span"/>
               <label>Username</label>

               <Field 
                  autocomplete="off"
                  id="create-post-title"
                  name="title" 
                  placeholder="Silksong is great..."
               />
               <ErrorMessage name="title" component="span"/>
               <label>Title</label>

               <Field 
                  autocomplete="off"
                  id="create-post-description"
                  name="postText" 
                  placeholder="Hating Silksong is a such a bad rage bait..."
               />
               <ErrorMessage name="postText" component="span"/>
               <label>Description</label>

               <button type="submit" id="submit-btn"> Create Post </button>
            </Form>
         </Formik>
      </div>
  )
}

export default CreatePost
