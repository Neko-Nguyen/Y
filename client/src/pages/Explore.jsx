import { useContext, useState } from "react";
import "../styles/Explore.css";
import SearchIcon from '@mui/icons-material/Search';
import { getUserByKey } from "../api/User";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { getPostByKey } from "../api/Post";

function Explore() {
   const [userResults, setUserResults] = useState([]);
   const [postResults, setPostResults] = useState([]);
   const [key, setKey] = useState("");
   const api = useContext(ApiEndpointContext);

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

         {userResults.map(user => {
            return (<div>
               {user.username}
            </div>);
         })}

         {postResults.map(post => {
            return (<div>
               {post.postText}
            </div>);
         })}
      </div>
   );
};

export default Explore;
