import { useNavigate } from "react-router-dom";
import UserObject from "./UserObject"

const defaultInfo = {
   listOfUsers: []
}

function ListOfUsers({ info = defaultInfo }) {
   let navigate = useNavigate();

   function navProfile(id) {
      navigate(`/profile/${id}`);
   }

   return (<div className="list">
      {info.listOfUsers.map(user => (
         <div className="post home-post" onClick={() => navProfile(user.id)}>
            <UserObject info={{ userObject: user }}/>
         </div>
      ))}
   </div>);
}

export default ListOfUsers;
