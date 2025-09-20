import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Image } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Image src="/img/logo.png" alt="logo" class="logo"/> */}
        <Link to="/" className="create-post"> HomePage </Link>  
        <Link to="/createpost" className="create-post"> Create a post </Link>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Post/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
