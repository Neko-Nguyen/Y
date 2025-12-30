import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { getFollowInfo } from "../services/FollowServices";
import ListOfUsers from "./object/ListOfUsers";

function FollowInfo() {
   let { info, id } = useParams();
   const [followInfo, setFollowInfo] = useState({
      followers: [],
      followings: []
   });
   const api = useContext(ApiEndpointContext);
   let navigate = useNavigate();

   useEffect(() => {
      async function fetchFollowInfo() {
         const followInfo = await getFollowInfo(api, id);
         setFollowInfo(followInfo);
      };

      fetchFollowInfo();
   }, [api, id]);

   return (
      <div className="main home">
         <div className="go-back">
            <KeyboardBackspaceIcon 
               sx={{ fontSize: 25 }} 
               className="go-back-icon"
               onClick={() => {
                  navigate(`/profile/${id}`);
               }}
            />
            <div className="go-back-text">Profile</div>
         </div>

         {info === "followings"
            ? <ListOfUsers info={{listOfUsers: followInfo.followings.map(u => u.Following)}}/>
            : <ListOfUsers info={{listOfUsers: followInfo.followers.map(u => u.Follower)}}/>
         }
      </div>
   );
}

export default FollowInfo;
