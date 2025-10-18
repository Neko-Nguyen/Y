import axios from "axios";
import { authHeader } from "./User";

export async function getCommentsByPostId(api, id) {
   const response = await axios.get(`${api}/comments/${id}`);
   return response.data;
};

export async function addComment(api, comments, newComment) {
   const response = await axios.post(`${api}/comments`, newComment, authHeader());
   const data = response.data;

   if (data.error) {
      alert(data.error);
      return comments;
   }

   const commentToAdd = response.data;
   return [...comments, commentToAdd];
};

export async function deleteComment(api, id, comments) {
   await axios.delete(`${api}/comments/${id}`, authHeader());
   return comments.filter((val) => {
      return val.id !== id;
   });
};