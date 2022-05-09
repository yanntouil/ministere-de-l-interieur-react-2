import styles from './FormTime.module.css'; 



/**
 * Form time
 */
const FormTime = ({ value, onChange, disabled = false }) => {
    return (
        <input 
            type="time" 
            className={`flex justify-center w-24 py-2 border border-neutral-500 text-lg font-light ${disabled ? 'text-neutral-400 bg-neutral-100' : ''} ${styles.formTime}`}
            disabled={disabled}
            value={value}
            onChange={({ target }) => onChange(target.value)}
        />
    )
}
export default FormTime


