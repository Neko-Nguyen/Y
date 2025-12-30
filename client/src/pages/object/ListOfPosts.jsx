import { useNavigate } from "react-router-dom";
import PostObject from "./PostObject";

const defaultInfo = {
    listOfPosts: [],
    enableDelete: false,
    enableLike: false,
    deletePostFunc: () => {},
    likePostFunc: () => {}
};

function ListOfPosts({ info = defaultInfo }) {
    let navigate = useNavigate();

    function navPost(id) {
        navigate(`/post/${id}`);
    };

    return (<div className="list">
        {info.listOfPosts.map(post => (
            <div className="post home-post" onClick={() => navPost(post.id)}>
                <PostObject info={{
                    postObject: post,
                    enableDelete: info.enableDelete,
                    enableLike: info.enableLike,
                    deletePostFunc: info.deletePostFunc,
                    likePostFunc: info.likePostFunc
                }}/>
            </div>
        ))}
    </div>);
};

export default ListOfPosts;
