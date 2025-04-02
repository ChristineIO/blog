import ToggleButton from "../../components/Buttons/ToggleButton"
import HomeLink from "../../components/HomeLink"

const ProfilePage = () => {
    return (
        <>
            <div className="navbar">
                <div className="logo">
                <HomeLink />
                </div>
                <ToggleButton />
            </div>
            <div className="profile-content">
                <h1>Your Posts</h1>
            </div>
        </>
    )
}

export default ProfilePage