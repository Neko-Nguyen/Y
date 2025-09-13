import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div class="App">
      <Router>
        <Link to="/createpost" class="create-post"> Create a post </Link>
        <Link to="/" class="create-post"> HomePage</Link>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createpost" element={<CreatePost/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
