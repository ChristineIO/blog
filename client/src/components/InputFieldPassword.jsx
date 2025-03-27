import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

const InputFieldPassword = ({ label, name, type }) => {
    const [isVisible, setIsVisible] = useState(false)
    if (isVisible) {
        type = 'text'
    }
    return (
        <>
            <div className="input-field">
                <label htmlFor={name}>{label}</label>
                <input name={name} type={type} />
                <button type='button'className='inline-icon' onClick={() => setIsVisible(!isVisible)}>{isVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</button>
            </div>
        </>
    )
}

export default InputFieldPassword;