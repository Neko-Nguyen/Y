import axios from "axios";
import { authHeader } from "./Auth";

export function createPost(api, data, navigate) {
   axios
      .post(`${api}/posts`, data, authHeader())
      .then((response) => {
         console.log(response);
         navigate("/home");
      });
};

export function getHomePosts(api, userId, setListOfPosts) {
   axios
      .get(`${api}/posts`)
      .then((response) => {
         const updatedPosts = response.data.map((post) => {
            const isLiked = post.Likes.some((like) => like.UserId === userId);
            return { ...post, liked: isLiked };
         });
         setListOfPosts(updatedPosts);
      });
};

export function likePost(postId, api, listOfPosts, setListOfPosts) {
   axios
      .post(`${api}/likes`, { PostId: postId }, authHeader())
      .then((response) => {
         setListOfPosts(listOfPosts.map((post) => {
            if (post.id !== postId) return post;

            if (response.data.liked) {
               return { ...post, Likes: [...post.Likes, 0], liked: true };
            } else {
               const likesArray = post.Likes;
               likesArray.pop();
               return { ...post, Likes: likesArray, liked: false };
            }
         }));
      });
};
