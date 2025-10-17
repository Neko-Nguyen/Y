import axios from "axios";

export async function getBasicInfo(api, id, authState) {
    const response = await axios.get(`${api}/users/basicinfo/${id}`);
    const data = response.data;

    const updatedPosts = data.Posts.map((post) => {
        const isLiked = post.Likes.some((like) => like.UserId === authState.id);
        return { ...post, liked: isLiked };
    });

    return {
        username: data.username,
        joinTime: data.createdAt,
        listOfPosts: updatedPosts
    };
};