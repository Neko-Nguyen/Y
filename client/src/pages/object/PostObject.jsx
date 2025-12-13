import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

const defaultPostInfo = {
    postObject: {
        id: 0,
        UserId: 0,
        username: "",
        postText: "",
        createdAt: "",   
        liked: false,
        Likes: []
    },
    deletePostFunc: () => {},
    likePostFunc: () => {},
};

function PostObject({postInfo=defaultPostInfo}) {
    const { authState } = useContext(AuthContext);
    const postObject = postInfo.postObject;

    function stop(e) { e.stopPropagation(); };

    function handleLike(e) {
        postInfo.likePostFunc(postObject.id);
        console.log(postObject);
        stop(e);
    };

    return (
        <>
            <div className="header">
                <Link to={`/profile/${postObject.UserId}`} className="username" onClick={stop}>
                    {postObject.username}
                </Link>

                {authState.username === postObject.username ? (
                    <button 
                        className="delete-btn"
                        onClick={() => {
                            postInfo.deletePostFunc(postObject.id)
                        }}
                    >✖</button>
                ) : (
                    <div></div>
                )}
            </div>

            <div className="body"> {postObject.postText} </div>

            <div className="footer">
                <div className="like-btn-container">
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
                        {postObject.Likes.length} 
                    </label>
                </div>

                {postObject.createdAt && <div className="time">
                    {postObject.createdAt.substring(11, 16)} · {postObject.createdAt.substring(0, 10)}
                </div>}
            </div>
        </>
    )
}

export default PostObject
