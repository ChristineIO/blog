const InputField = ({ label, name, type }) => {
    return (
        <>
            <div className="input-field">
                <label htmlFor={name}>{label}</label>
                <input name={name} type={type} required/>
            </div>
        </>
    )
}

export default InputField;