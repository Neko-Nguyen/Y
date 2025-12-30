import "./styles/App.css";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import EditProfile from "./pages/EditProfile";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./pages/object/Navbar";
import { AuthContext } from "./helpers/AuthContext";
import { ApiEndpointContext } from "./helpers/ApiEndpointContext";
import { getAuth } from "./services/UserServices";
import FollowInfo from "./pages/FollowInfo";

function App() {
  const api = useContext(ApiEndpointContext);
  
  const [authState, setAuthState] = useState({ id: 0, username: "", avatar: "", status: false });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAuth = async () => {
      const data = await getAuth(api);
      setAuthState(data);
    };
    
    fetchAuth().then(() => {
      setLoading(false);
    });
  }, [api, setAuthState, setLoading]);

  
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App" id="app">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar authState={authState} setAuthState={setAuthState}/>
          
          <Routes>
            <Route path="/" exact element={<Intro/>}/>
            <Route path="/home" exact element={<Home/>}/>
            <Route path="/createpost" exact element={<CreatePost/>}/>
            <Route path="/post/:id" exact element={<Post/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/signin" exact element={<Signin/>}/>
            <Route path="/profile/:id" exact element={<Profile/>}/>
            <Route path="/followinfo/:info/:id" exact element={<FollowInfo/>}/>
            <Route path="/explore" exact element={<Explore/>}/>
            <Route path="/editprofile/:id" exact element={<EditProfile/>}/>
            <Route path="*" exact element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
