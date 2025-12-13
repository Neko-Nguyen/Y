import { Link } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';
import { useContext } from 'react';

function CommentObject({commentInfo}) {
    const { authState } = useContext(AuthContext);

    return (
        <>
            <div className="header">
                <Link to={`/profile/${commentInfo.userId}`} className="username">
                    {commentInfo.username}
                </Link>

                {authState.username === commentInfo.username ? (
                    <button 
                        className="delete-btn"
                        onClick={() => {
                            commentInfo.deleteCommentFunc(commentInfo.id)
                        }}
                    >✖</button>
                ) : (
                    <div></div>
                )}
            </div>

            <div className="comment"> {commentInfo.commentBody} </div>

            {commentInfo.createdAt && <div className="time">
                {commentInfo.createdAt.substring(11, 16)} · {commentInfo.createdAt.substring(0, 10)}
            </div>}
        </>
    )
}

export default CommentObject
