





/**
 * FormCheckbox
 */
const FormCheckbox = ({ value, onChange, disabled }) => {
    return (
        <label className={`form-checkbox${value ? ' checked' : ''}${disabled ? ' disabled' : ''}`}>
            <input 
                type="checkbox" 
                onChange={onChange} 
                checked={value} 
                disabled={disabled} 
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="12.746" height="8.886" viewBox="0 0 12.746 8.886">
                <path id="Vector" d="M0,3.537,3.537,7.075,10.625,0" transform="translate(1.061 1.061)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            </svg>
        </label>
    )
}
export default FormCheckbox