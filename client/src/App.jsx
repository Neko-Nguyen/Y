import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", { 
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
      })
      .finally(() => {
        setLoading(false);
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

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App" id="app">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="nav-bar">
            <div className="nav-bar-above">
              <Link to="/home" className="logo-container">
                <img src="/logo.png" alt="logo" className="logo"/>
              </Link>

              {!authState.status ? (
                <>
                  <Link to="/login" className="route">Login</Link>
                  <Link to="/signin" className="route">Sign In</Link>
                </>
              ) : (
                <>
                  <button onClick={logout} className="route">Log out</button>              
                  <Link to="/createpost" className="route-post">Post</Link>
                </>
              )}
            </div>
            
            <div className="nav-bar-bottom">
              <div className="user">{authState.username}</div>
            </div>
          </div>
          
          <Routes>
            <Route path="/home" exact element={<Home/>}/>
            <Route path="/createpost" exact element={<CreatePost/>}/>
            <Route path="/post/:id" exact element={<Post/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/signin" exact element={<Signin/>}/>
            <Route path="/profile/:id" exact element={<Profile/>}/>
            <Route path="*" exact element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
