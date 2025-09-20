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
      axios.post("http://localhost:3001/auth", data).then((response) => {
         // navigate("/");
         console.log(data);
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
                     autocomplete="off"
                     id="username"
                     name="username"
                     className="input sign-in-input"
                     placeholder="Username"
                  />
                  <ErrorMessage name="username" component="span"/>

                  <Field
                     autocomplete="off"
                     type="password"
                     id="password"
                     name="password"
                     className="input sign-in-input"
                     placeholder="Password"
                  />
                  <ErrorMessage name="password" component="span"/>
               </div>

               <button type="submit" class="sign-in-btn">Sign in</button>
            </Form>
         </Formik>
      </div>
   )
}

export default Signin
