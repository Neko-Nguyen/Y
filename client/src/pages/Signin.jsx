import "./Signin.css";
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signin() {
   let navigate = useNavigate();

   const initialValues = {
      username: "",
      password: "",
   };

   const onSubmit = (data) => {
      axios.post("http://localhost:3001/users", data).then((response) => {
         navigate("/home");
      });
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string().min(3).max(15).required("You will need a username"),
      password: Yup.string().min(8).required("You will need a password"),
   });

   return (
      <div className="main sign-in-container">
         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
         >
            <Form>
               <div className="sign-in">
                  <Field
                     autoComplete="off"
                     name="username"
                     className="input sign-in-input"
                     placeholder="Username"
                  />
                  <ErrorMessage name="username" component="span"/>

                  <Field
                     autoComplete="off"
                     id="password"
                     type="password"
                     name="password"
                     className="input sign-in-input"
                     placeholder="Password"
                  />
                  <div>
                     <input 
                        type="checkbox" 
                        id="show-password" 
                        className="show-password-checkbox"
                        onChange={(event) => {
                           let password = document.getElementById("password");
                           password.type = event.target.checked ? "text" : "password";
                        }}
                     />
                     <label htmlFor="show-password" className="show-password-label">Show Password</label>
                  </div>
                  <ErrorMessage name="password" component="span"/>
               </div>

               <button type="submit" className="sign-in-btn">Sign in</button>
            </Form>
         </Formik>
      </div>
   )
}

export default Signin
