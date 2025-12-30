import { useContext, useState } from "react";
import "../styles/Explore.css";
import SearchIcon from '@mui/icons-material/Search';
import { getUserByKey } from "../services/UserServices";
import { getPostByKey } from "../services/PostServices";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import ListOfPosts from "./object/ListOfPosts";
import ListOfUsers from "./object/ListOfUsers";

function Explore() {
   const api = useContext(ApiEndpointContext);
   
   const [userResults, setUserResults] = useState([]);
   const [postResults, setPostResults] = useState([]);
   const [key, setKey] = useState("");

   async function fetchSearch() {
      const newUserResult = await getUserByKey(api, key);
      const newPostResult = await getPostByKey(api, key);

      setUserResults(newUserResult);
      setPostResults(newPostResult);
   };

   function handleKeyDown(e) {
      if (e.key === "Enter") {
         fetchSearch();
      }
   };

   return (
      <div className="main home">
         <div className="search-container">
            <SearchIcon sx={{ fontSize: 35 }} className="search-icon"/>
            <input
               value={key}
               onChange={e => setKey(e.target.value)}
               onKeyDown={handleKeyDown}
               type="text" 
               placeholder="Search" 
               className="search-bar"
            />
         </div>

         <ListOfUsers info={{
            listOfUsers: userResults
         }}/>

         <ListOfPosts info={{
            listOfPosts: postResults,
            enableDelete: false,
            enableLike: false,
            deletePostFunc: () => {},
            likePostFunc: () => {}
         }}/>
      </div>
   );
};

export default Explore;
