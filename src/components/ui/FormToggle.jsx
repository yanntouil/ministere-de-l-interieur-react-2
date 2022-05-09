





/**
 * FormCheckbox
 */
const FormToggle = ({ label, value, onChange, name = "form-toggle" }) => {
    return (
        <label className={`flex justify-between items-center w-full h-16 sm:h-18 xl:h-20 gap-4 px-10 leading-4 bg-white shadow cursor-pointer ${value ? '' : 'text-neutral-400'}`}>
            {label}
            <input type="checkbox" name={name} id={name} onChange={onChange} className="absolute opacity-0 w-0 h-0" />
            <span className={`relative flex items-center w-[66px] h-[36px] shrink-0 p-1 w rounded-full border transition-all duration-300 ease-in-out ${value ? 'border-primary-500' : 'border-neutral-400'}`}>
                <span className={`absolute top-[4px] bottom-[4px] aspect-square rounded-full transition-all duration-300 ease-in-out ${value ? 'left-[34px] bg-primary-500' : 'left-[4px] bg-neutral-400'}`} />
            </span>
        </label>
    )
}
export default FormToggle