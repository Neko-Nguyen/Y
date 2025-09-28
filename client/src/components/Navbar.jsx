import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function Navbar({ authState }) {
  return (
    <div className="nav-bar">
        <div className="nav-bar-above">
            <Link to="/home" className="logo-container">
                <img src="/logo.png" alt="logo" className="logo"/>
            </Link>

            {!authState.status ? (
            <>
                <div className="route-container">
                    <LoginIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <Link to="/login" className="route">Login</Link>
                </div>
                <div className="route-container">
                    <AssignmentIndIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <Link to="/signin" className="route">Sign in</Link>
                </div>
            </>
            ) : (
            <>
                <div className="route-container">
                    <HomeIcon sx={{ fontSize: 35}} className="route-icon"/>
                    <Link to="/home" className="route">Home</Link>
                </div>
                <div className="route-container">
                    <LogoutIcon sx={{ fontSize: 35}} className="route-icon"/>
                    {/* <Link to="/signin" className="route" onClick={logout}>Log out</Link> */}
                </div>
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
