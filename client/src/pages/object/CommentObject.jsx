import { Link } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';
import { useContext } from 'react';

const defaultInfo = {
    commentObject: {
        id: 0,
        UserId: 0,
        username: "",
        commentBody: "",
        createdAt: ""
    },
    deleteCommentFunc: () => {},
};

function CommentObject({ info = defaultInfo }) {
    const { authState } = useContext(AuthContext);
    const commentObject = info.commentObject;

    return (
        <>
            <div className="header">
                <Link to={`/profile/${commentObject.UserId}`} className="username">
                    {commentObject.username}
                </Link>

                {authState.username === commentObject.username ? (
                    <button 
                        className="delete-btn"
                        onClick={() => {
                            info.deleteCommentFunc(commentObject.id)
                        }}
                    >✖</button>
                ) : (
                    <div></div>
                )}
            </div>

            <div className="comment"> {commentObject.commentBody} </div>

            <div className="footer">
                {commentObject.createdAt && <div className="time">
                    {commentObject.createdAt.substring(11, 16)} · {commentObject.createdAt.substring(0, 10)}
                </div>}
            </div>
        </>
    )
}

export default CommentObject
