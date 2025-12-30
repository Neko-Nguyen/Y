import CommentObject from "./CommentObject";

const defaultInfo = {
    listOfComments: [],
    deleteCommentFunc: () => {}
};

function ListOfComments({ info = defaultInfo }) {

    return (<div className="list">
        {info.listOfComments.map(comment => (
            <div className="comment-container">
                <CommentObject info={{
                    commentObject: comment,
                    deleteCommentFunc: info.deleteCommentFunc
                }}/>
            </div>
        ))}
    </div>);
};

export default ListOfComments;
