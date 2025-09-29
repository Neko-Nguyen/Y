import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { logout } from "../api/Auth";

function Navbar({ authState, setAuthState }) {
  return (
    <div className="nav-bar">
        <div className="nav-bar-above">
            <Link to="/" className="logo-container">
                <img src="/logo.png" alt="logo" className="logo"/>
            </Link>

            {!authState.status ? (
            <>
                <Link to="/login" className="route-container">
                    <LoginIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <div className="route">Login</div>
                </Link>
                <Link to="/signin" className="route-container">
                    <AssignmentIndIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <div className="route">Sign in</div>
                </Link>
            </>
            ) : (
            <>
                <Link to="/home" className="route-container">
                    <HomeIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <div className="route">Home</div>
                </Link>
                <Link to="/signin" className="route-container">
                    <LogoutIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <div className="route" onClick={() => { logout(setAuthState) }}>Log out</div>
                </Link>
                <Link to="/createpost" className="route-post">Post</Link>
            </>
            )}
        </div>
        
        <div className="nav-bar-bottom">
            <Link to={`/profile/${authState.id}`} className="user">{authState.username}</Link>
        </div>
    </div>
  )
}

export default Navbar;
