const InputField = ({ label, name, type, onChange, maxLength }) => {
    return (
        <>
            <div className="input-field">
                <label htmlFor={name}>{label}</label>
                <input name={name} type={type} onChange={onChange} maxLength={maxLength} required autoComplete="true"/>
            </div>
        </>
    )
}

export default InputField;