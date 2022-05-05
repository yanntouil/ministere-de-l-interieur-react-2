import { useElementScrollSize } from '../../app/hooks'








const FormValidate = ({ message, isValid, validate, children }) => {
    const [ formValidateRef, size ] = useElementScrollSize()
    return validate ? (
        <div className={isValid ? 'form-success' : 'form-error'}>
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
    )
}
export default FormValidate