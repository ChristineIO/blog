const Button = ({ type, text, className, style, onClick, id, disabled = false }) => {
    return (
        <button type={type} id={id} className={className} style={style} onClick={onClick} disabled={disabled}>{text}</button>
    )
}

export default Button