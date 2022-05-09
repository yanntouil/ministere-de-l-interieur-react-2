





/**
 * Form Heading
 */
const FormHeading = ({ children, className = '' }) => {
    return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${className}`}>
            {children}
        </h2>
    )
}
export default FormHeading