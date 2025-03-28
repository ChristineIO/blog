import Button from "../components/Button"
import ToggleButton from "../components/Buttons/ToggleButton"
import HomeLink from "../components/HomeLink"
import './styles/CreatePost.css'

const CreatePost = () => {
    return (
        <>
            <div className="navbar">
                <HomeLink />
                <ToggleButton />
            </div>
            <form className="post-form">
                <textarea className="post-text"></textarea>
                <Button type='submit' text='Post' className='btn'/>
            </form>
        </>
    )
}


export default CreatePost