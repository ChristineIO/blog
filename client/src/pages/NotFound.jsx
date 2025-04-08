import { Link } from 'react-router-dom'
import Button from '../components/MyButton'
import './styles/NotFound.css'
const NotFound = () => {
    return (
        <div className='not-found'>
            <div className="dashed">
                <h1>Oops... Try Again ༘⋆♡⸝⸝💌love ⊹。 °˖➴</h1>
                <p>Wrong page ‧₊˚❀༉‧₊˚  ✦⋆🍒.₊ ⊹</p>
                <Link to='/home' className='auth-btn' style={{width: '90px', justifySelf: 'center', marginBottom: '25px'}}>Go Home</Link>
            </div>
        </div>
    )
}

export default NotFound