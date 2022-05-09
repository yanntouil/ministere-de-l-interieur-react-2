import { useState, useRef, useContext } from "react"
import { FormValidateContext } from "./FormValidate"



/**
 * Form Text
 */
 const FormText = ({ value, setValue, label, placeholder = '', name = 'form-text', password = false}) => {
    const [ showPassword, setShowPassword ] = useState(false)
    const fieldRef = useRef(null)
    const { isValid, validate } = useContext(FormValidateContext)
    /**
     * Render
     */
    return (
        <div className="relative flex w-full h-16 sm:h-18 xl:h-20">
            {!!label && (
                <label 
                    htmlFor={name}
                    className="absolute inset-y-0 left-0 flex justify-center items-center w-20 sm:w-24 xl:w-28 text-neutral-400" 
                    aria-hidden="true"
                >
                    {label}
                    <span className="sr-only">{placeholder}</span>
                </label>
            )}
            <input 
                className={`flex justify-between items-center grow h-full leading-4 bg-white shadow text-left placeholder:text-neutral-400 ${validate ? (isValid ? 'shadow-green-200' : 'shadow-red-200') : ''} ${label ? 'pl-20 sm:pl-24 xl:pl-28' : 'pl-10'} ${password ? 'pr-20 sm:pr-24 xl:pr-28' : 'pr-10'}`}
                type={password && !showPassword ? 'password' : 'text'}
                id={name}
                name={name}
                ref={fieldRef}
                value={value}
                onChange={({ target }) => setValue(target.value)}
                placeholder={placeholder}
            />
            {password && (
                <button 
                    className="absolute inset-y-0 right-0 flex justify-center items-center w-20 sm:w-24 xl:w-28 text-neutral-400 hover:text-primary-500 transition-colors duration-300 ease-in-out" 
                    aria-hidden="true"
                    onClick={() => { setShowPassword(!showPassword); fieldRef?.current?.focus()}}
                >
                    {showPassword ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M14.53 9.47004L9.47004 14.53C8.82004 13.88 8.42004 12.99 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C12.99 8.42004 13.88 8.82004 14.53 9.47004Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.46997 3.72998 5.17997 5.80998 2.88997 9.40998C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M8.42004 19.5301C9.56004 20.0101 10.77 20.2701 12 20.2701C15.53 20.2701 18.82 18.1901 21.11 14.5901C22.01 13.1801 22.01 10.8101 21.11 9.40005C20.78 8.88005 20.42 8.39005 20.05 7.93005" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M9.47 14.53L2 22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M22 2L14.53 9.47" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                </button>
            )}
        </div>
    )
}
export default FormText