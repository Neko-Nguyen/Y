import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ApiEndpointContext } from '../../helpers/ApiEndpointContext';

const defaultInfo = {
    userObject: {
        id: 0,
        username: "",
        avatar: "",
        bio: "",
        createdAt: ""
    }
};

function UserObject({ info = defaultInfo }) {
    const userObject = info.userObject;
    let api = useContext(ApiEndpointContext);

    return (
        <>
            <div className="header">
                <div className="user-object-container">
                    {userObject.avatar
                        ? <img className="user-object-avatar" src={`${api}/uploads/${userObject.avatar}`} alt="avatar"/>
                        : <img className="user-object-avatar" src="/default-avatar.png" alt="avatar"/>
                    }

                    <div className="user-object-info">
                        <Link to={`/profile/${userObject.id}`} className="user-object-username">
                            {userObject.username}
                        </Link>

                        <div> {userObject.bio} </div>
                    </div>
                </div>
            </div>

            <br></br>

            <div className="footer">
                {userObject.createdAt && <div className="time">
                    {userObject.createdAt.substring(11, 16)} · {userObject.createdAt.substring(0, 10)}
                </div>}
            </div>
        </>
    )
}

export default UserObject
