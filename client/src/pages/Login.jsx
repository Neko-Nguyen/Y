import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {
   let navigate = useNavigate();
   
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const login = () => {
      const data = {username: username, password: password};
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
         console.log(response.data);
      });
   };

   return (
      <div className="main log-in">
         <input type="text" class="input" onChange={(event) => {
            setUsername(event.target.value);
         }}/>
         <input type="password" class="input" onChange={(event) => {
            setPassword(event.target.value);
         }}/>

         <button type="submit" class="sign-in-btn" onClick={login}>Login</button>
      </div>
   )
}

export default Login
