import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
   let navigate = useNavigate();
   
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const { setAuthState } = useContext(AuthContext);

   const login = () => {
      const data = {username: username, password: password};
      axios.post("http://localhost:3001/users/login", data).then((response) => {
         if (response.data.error) {
            alert(response.data.error);
         } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
               username: response.data.username,
               id: response.data.id,
               status: true
            });
            navigate("/home");
         }
      });
   };

   return (
      <div className="main log-in-container">
         <div className="log-in">
            <input 
               type="text" 
               className="input log-in-input" 
               onChange={(event) => {
                  setUsername(event.target.value);
               }}
               placeholder="Username"
            />

            <input 
               id="password"
               type="password"  
               className="input log-in-input"
               onChange={(event) => {
                  setPassword(event.target.value);
               }}
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
         </div>

         <button type="submit" className="sign-in-btn" onClick={login}>Login</button>
      </div>
   )
}

export default Login
