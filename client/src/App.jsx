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
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", { 
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            username: "",
            id: 0,
            status: false
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true
          });
        } 
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false
    });
  };

  return (
    <div className="App" id="app">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="nav-bar">
            <div className="nav-bar-above">
              <Link to="/home" className="logo-container">
                <img src="/logo.png" alt="logo" className="logo"/>
              </Link>
              <Link to="/createpost" className="route">Create Post</Link>

              {!authState.status ? (
                <>
                  <Link to="/login" className="route">Login</Link>
                  <Link to="/signin" className="route">Sign In</Link>
                </>
              ) : (
                <button onClick={logout} className="route">Log out</button>              
              )}
            </div>
            
            <div className="nav-bar-bottom">
              <div className="user">{authState.username}</div>
            </div>
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
