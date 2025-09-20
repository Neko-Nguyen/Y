import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

function App() {
  return (
    <div className="App" id="app">
      <Router>
        <div className="nav-bar">
          <Link to="/" className="logo-container">
            <img src="/logo.png" alt="logo" className="logo"/>
          </Link>
          <Link to="/createpost"> Create a post </Link>
          <Link to="/login"> Login</Link>
          <Link to="/signin"> Signin</Link>
        </div>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
