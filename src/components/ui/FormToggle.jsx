





/**
 * FormCheckbox
 */
const FormToggle = ({ label, value, onChange, disabled }) => {
    return (
        <label className={`form-toggle${value ? ' checked' : ''}${disabled ? ' disabled' : ''}`}>
            <input 
                type="checkbox" 
                checked={value}
                onChange={onChange} 
            />
            <span className="form-toggle-label">{label}</span>
            <span className="form-toggle-switch" />
        </label>
    )
}
export default FormToggle