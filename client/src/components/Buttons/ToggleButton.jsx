import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import './ToggleButton.css'
import { useState } from 'react'

const ToggleButton = () => {
    
    const [isDark, setIsDark] = useState(0)
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark')
    } else if (!isDark) {
        document.documentElement.setAttribute('data-theme', 'light')
    }
    return (
        <>
            <button className='toggle-theme'
            onClick={() => setIsDark(!isDark)}>
            {isDark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}</button>
        </>
    )
}

export default ToggleButton