const Button = ({type, text, className, style, onClick}) => {
    return (
        <button type={type} className={className} style={style} onClick={onClick}>{text}</button>
    )
}

export default Button