import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { ApiEndpointContext } from "./helpers/ApiEndpointContext";
import { storage } from "./helpers/Storage";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });
  const [loading, setLoading] = useState(true);
  const api = useContext(ApiEndpointContext);

  useEffect(() => {
    axios
      .get(`${api}/users/auth`, { 
        headers: {
          accessToken: localStorage.getItem(storage),
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
    localStorage.removeItem(storage);
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
                  <div className="route-container">
                    <div className="route-icon"><LoginIcon sx={{ fontSize: 35}}/></div>
                    <Link to="/login" className="route">Login</Link>
                  </div>
                  <div className="route-container">
                    <div className="route-icon"><AssignmentIndIcon sx={{ fontSize: 35}}/></div>
                    <Link to="/signin" className="route">Sign In</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="route-container">
                    <div className="route-icon"><LogoutIcon sx={{ fontSize: 35}}/></div>
                    <button onClick={logout} className="route">Log out</button>
                  </div>
                  <Link to="/createpost" className="route-post">Post</Link>
                </>
              )}
            </div>
            
            <div className="nav-bar-bottom">
              <div className="user">{authState.username}</div>
            </div>
          </div>
          
          <Routes>
            <Route path="/" exact element={<Intro/>}/>
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
