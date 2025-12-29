
function ListOfUsers({ listOfUsers }) {
   return listOfUsers.map(user => (
      <div>
         {user.username}
      </div>
   ));
}

export default ListOfUsers;
