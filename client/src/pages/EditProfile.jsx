import { useEffect, useState } from "react";
import { ApiEndpointContext } from "../helpers/ApiEndpointContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBasicInfo, updateBasicInfo } from "../api/User";
import { AuthContext } from "../helpers/AuthContext";

function EditProfile() {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        avatar: {},
        username: "",
        bio: ""
    });
    const { authState } = useContext(AuthContext);
    const api = useContext(ApiEndpointContext);
    let navigate = useNavigate();
    

    useEffect(() => {
        async function fetchData() {
            const data = await getBasicInfo(api, id, authState);
            setFormData({
                avatar: {},
                username: data.username,
                bio: data.bio
            });
        };

        fetchData();
    }, [api, id, authState, setFormData]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        try {
            updateBasicInfo(api, id, formData, navigate);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <div class="main home">
            <form 
                className="input-box update-profile"
                onSubmit={handleSubmit}
            >
                <input
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    className="input avatar"
                />
                <label className="input-label"> Profile picture </label>

                <input
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input edit-username"
                />
                <label className="input-label"> Username </label>

                <input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input edit-bio"
                />
                <label className="input-label"> Bio </label>

                <button type="submit" className="submit-btn"> Save Profile </button>
            </form>
        </div>
    )
}

export default EditProfile
