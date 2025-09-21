import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", { 
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        } 
      })
  }, [])

  return (
    <div className="App" id="app">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="nav-bar">
            <Link to="/home" className="logo-container">
              <img src="/logo.png" alt="logo" className="logo"/>
            </Link>
            <Link to="/createpost"> Create a post </Link>
            {!authState && (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/signin"> Signin</Link>
              </>
            )}
          </div>
          
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/createpost" element={<CreatePost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signin" element={<Signin/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
