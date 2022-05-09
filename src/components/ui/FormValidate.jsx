import { createContext } from 'react'
import { useElementScrollSize } from '../../app/hooks'





/**
 * Context
 */
const FormValidateContext = createContext()
export { FormValidateContext }

/**
 * Form Validate
 */
const FormValidate = ({ message, isValid, validate, children }) => {
    const [ formValidateRef, size ] = useElementScrollSize()
    return (
        <FormValidateContext.Provider value={{ isValid, validate }}>
            {validate ? (
                <div>
                    { children }
                    <div 
                        ref={formValidateRef} 
                        style={{
                            height: !isValid && message ? size.height : 0,
                            overflow: 'hidden',
                            transition: 'height 300ms ease-in-out',
                        }}
                    >
                        {!isValid && message && (
                            <div className="form-error-message">
                                { message }
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>{ children }</>
            )}
        </FormValidateContext.Provider>
    )
}
export default FormValidate