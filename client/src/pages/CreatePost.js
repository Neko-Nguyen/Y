import "./CreatePost.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreatePost() {


   return (
      <div class="main">
         <Formik>
            <Form class="input">
               <Field 
                  autocomplete="off"
                  id="create-post-username" 
                  name="username" 
                  placeholder="Neko..."
               />
               <label>Username</label>

               <Field 
                  autocomplete="off"
                  id="create-post-title"
                  name="title" 
                  placeholder="Silksong is great..."
               />
               <label>Title</label>

               <Field 
                  autocomplete="off"
                  id="create-post-description"
                  name="postText" 
                  placeholder="Hating Silksong is a such a bad rage bait..."
               />
               <label>Description</label>

               <button type="submit" id="submit-btn"> Create Post </button>
            </Form>
         </Formik>
      </div>
  )
}

export default CreatePost
