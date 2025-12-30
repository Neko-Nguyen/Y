import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { ApiEndpointContext } from "../../helpers/ApiEndpointContext";

const defaultInfo = {
    postObject: {
        id: 0,
        UserId: 0,
        username: "",
        avatar: "",
        postText: "",
        createdAt: "",   
        liked: false,
        Likes: []
    },
    enableDelete: false,
    enableLike: false,
    deletePostFunc: () => {},
    likePostFunc: () => {}
};

function PostObject({ info = defaultInfo }) {
    const { authState } = useContext(AuthContext);
    const postObject = info.postObject;
    const api = useContext(ApiEndpointContext);

    function stop(e) { e.stopPropagation(); };

    function handleLike(e) {
        info.likePostFunc(postObject.id);
        stop(e);
    };

    function handleDelete(e) {
        info.deletePostFunc(postObject.id);
        stop(e);
    };

    return (
        <>
            <div className="header">
                <div className="user-info">
                    {postObject.avatar
                        ? <img className="post-avatar" src={`${api}/uploads/${postObject.avatar}`} alt="avatar"/>
                        : <img className="post-avatar" src="/default-avatar.png" alt="avatar"/>
                    }
                    
                    <Link to={`/profile/${postObject.UserId}`} className="username" onClick={stop}>
                        {postObject.username}
                    </Link>
                </div>

                {info.enableDelete && authState.username === postObject.username 
                    ? <button className="delete-btn" onClick={handleDelete}>✖</button>
                    : <div></div>
                }
            </div>

            <div className="body"> {postObject.postText} </div>

            <div className="footer">
                {info.enableLike && <div className="like-btn-container">
                    <div 
                        className={postObject.liked ? "like-btn liked" : "like-btn"}
                        onClick={handleLike}
                    >
                        {postObject.liked 
                            ? <Favorite sx={{ fontSize: 15 }}/>
                            : <FavoriteBorder sx={{ fontSize: 15 }}/>
                        }
                    </div>

                    <label className={postObject.liked ? "like-btn-label liked" : "like-btn-label"}> 
                        {postObject.Likes ? postObject.Likes.length : -1} 
                    </label>
                </div>}

                {postObject.createdAt && <div className="time">
                    {postObject.createdAt.substring(11, 16)} · {postObject.createdAt.substring(0, 10)}
                </div>}
            </div>
        </>
    )
}

export default PostObject
