import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const MenuButton = () => {
    let menuIsVisible = false;
    let menuVisible = () => {
        if (!menuIsVisible) {
            document.getElementById('dropdown-list').style.display = 'grid'
            menuIsVisible = true
        } else if (menuIsVisible) {
            document.getElementById('dropdown-list').style.display = 'none'
            menuIsVisible = false
        }
    }
    return (
        <><button className='toggle-theme menu' onClick={menuVisible}><FontAwesomeIcon icon={faBars} /></button></>
    )
}

export default MenuButton