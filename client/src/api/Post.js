import axios from "axios";
import { authHeader } from "./User";

export async function createPost(api, data, navigate) {
   await axios.post(`${api}/posts`, data, authHeader());
   navigate("/home");
};

export async function deletePost(api, postId, navigate) {
   await axios.delete(`${api}/posts/${postId}`, authHeader());
   navigate("/home");
}

export async function getHomePosts(api, userId) {
   const response = await axios.get(`${api}/posts`);
   const data = response.data;

   const updatedPosts = data.map((post) => {
      const isLiked = post.Likes.some((like) => like.UserId === userId);
      return { ...post, liked: isLiked };
   });
   return updatedPosts;
};

export async function likePost(postId, api, listOfPosts) {
   const response = await axios.post(`${api}/likes`, { PostId: postId }, authHeader());
   const data = response.data;

   const updatedPosts = listOfPosts.map((post) => {
      if (post.id !== postId) return post;

      if (data.liked) {
         return { ...post, Likes: [...post.Likes, 0], liked: true };
      } else {
         const likesArray = post.Likes;
         likesArray.pop();
         return { ...post, Likes: likesArray, liked: false };
      }
   });

   return updatedPosts;
};

export async function getPostById(api, id) {
   const response = await axios.get(`${api}/posts/byId/${id}`);
   return response.data;
};

export async function getPostByKey(api, key) {
   const response = await axios.get(`${api}/posts/search/${key}`);
   return response.data;
};