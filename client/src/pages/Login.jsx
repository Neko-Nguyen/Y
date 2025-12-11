import "../styles/Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { login } from "../api/User";

function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const { setAuthState } = useContext(AuthContext);
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   async function fetchLogin() {
      const userData = {username: username, password: password};
      const data = await login(api, userData);
      
      setAuthState(data);
      if (data.id) navigate("/home");
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

         <button type="submit" className="sign-in-btn" onClick={fetchLogin}>Login</button>
      </div>
   )
}

export default Login
