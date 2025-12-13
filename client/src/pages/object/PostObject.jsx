import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { ApiEndpointContext } from "../../helpers/ApiEndpointContext";
import { getUsername } from "../../api/User";

function PostObject({postInfo}) {
    const { authState } = useContext(AuthContext);
    const api = useContext(ApiEndpointContext);

    const [username, setUsername] = useState("");

    useEffect(() => {
        async function fetchUsernameById() {
            const data = await getUsername(api, postInfo.userId);
            setUsername(data);
        }

        fetchUsernameById();
    }, [api, postInfo.userId, setUsername]);

    function stop(e) {
        e.stopPropagation();
    };

    function handleLike(e) {
        postInfo.likePostFunc();
        e.stopPropagation();
    }

    return (
        <>
            <div className="header">
                <Link to={`/profile/${postInfo.userId}`} className="username" onClick={stop}>
                    {username}
                </Link>

                {authState.username === username ? (
                    <button 
                        className="delete-btn"
                        onClick={() => {
                            postInfo.deletePostFunc(postInfo.id)
                        }}
                    >✖</button>
                ) : (
                    <div></div>
                )}
            </div>

            <div className="body"> {postInfo.postText} </div>

            <div className="footer">
                <div className="like-btn-container">
                    <div 
                        className={postInfo.liked ? "like-btn liked" : "like-btn"}
                        onClick={handleLike}
                    >
                        {postInfo.liked 
                            ? <Favorite sx={{ fontSize: 15 }}/>
                            : <FavoriteBorder sx={{ fontSize: 15 }}/>
                        }
                    </div>

                    <label className={postInfo.liked ? "like-btn-label liked" : "like-btn-label"}> 
                        {postInfo.numOfLikes} 
                    </label>
                </div>

                {postInfo.createdAt && <div className="time">
                    {postInfo.createdAt.substring(11, 16)} · {postInfo.createdAt.substring(0, 10)}
                </div>}
            </div>
        </>
    )
}

export default PostObject
