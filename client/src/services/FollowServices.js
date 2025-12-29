import axios from "axios";
import { authHeader } from "./UserServices";

export async function follow(api, followingId, setFollowState) {
   const response = await axios.post(`${api}/follows/${followingId}`, {}, authHeader());
   setFollowState(response.data.followed);
};

export async function getFollowInfo(api, id) {
   const response = await axios.get(`${api}/follows/followinfo/${id}`);
   return response.data;
};