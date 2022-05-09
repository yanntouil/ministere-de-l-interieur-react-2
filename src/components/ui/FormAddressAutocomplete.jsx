import React, { useState, useRef, useContext } from "react"
import { useOnClickOutside } from "../../app/hooks"
import geoportailService from "../../services/geoportail"
import { FormValidateContext } from "./FormValidate"

/**
 * Form Address Autocomplete
 * @param {{
 *      address?: string, 
 *      setAddress?: React.Dispatch<string>,
 *      setError?: (error: 'api-error'|'geolocation-disabled'|'geolocation-unavailable'|'geolocation-permission-denied'|'geolocation-api-error') => {},
 *      placeholder?: string,
 *      name?: string,
 *      activeGeolocation?: boolean,
 * }} props
 * @returns {JSX.Element}
 */
const FormAddressAutocomplete = ({ address = '', setAddress = () => {}, setError = () => {}, placeholder = '', name = 'form-address-autocomplete' }) => {
    const { isValid, validate } = useContext(FormValidateContext)

    /**
     * Field
     */
    const [ fieldValue, setFieldValue ] = useState(address)
    const fieldRef = useRef(null)
    const fieldChange = async ({ target }) => {
        setFieldValue(target.value)
        updateValue([], '')
        setDropdown(true)
        try {
            const results = await geoportailService.prefillAddress(target.value, 20)
            setOptions(results)
            const option = results.find(option => option.value === target.value)
            if (option) updateValue(option.coordinates, option.value)
        } catch (error) {
            setError('api-error')
        }
    }

    const updateValue = (coordinates, address) => {
        setAddress({ coordinates, address })
    }

    /**
     * Options
     */
    const optionsRef = useRef([])
    const [ options, setOptions ] = useState([])
    const selectOption = (option) => {
        setFieldValue(option.label)
        updateValue(option.coordinates, option.value)
        fieldRef?.current?.focus()
        setHoveredOption(-1)
        setDropdown(false)
    }

    /**
     * Dropdown
     */
    const [ dropdown, setDropdown ] = useState(false)
    const blurRef = useRef(null)
    const dropdownRef = useRef(null)
    useOnClickOutside(blurRef, () => setDropdown(false))

    /**
     * Keyboard
     */
    const [ hoveredOption, setHoveredOption ] = useState(-1)
    const manageKeyboard = (e) => {
        if (!['Escape', 'Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
        if (e.key === 'Escape') return setDropdown(false)
        if (e.key === 'Enter') {
            if (options[hoveredOption]) {
                e.preventDefault()
                return selectOption(options[hoveredOption])
            } else return
        }
        setDropdown(true)
        // Navigation
        e.preventDefault()
        let index = hoveredOption
        if (e.key === "ArrowDown") index = (index + 1 === options.length) ? 0 : index + 1
        else if (e.key === "ArrowUp") index = (index - 1 < 0) ? options.length -1 : index - 1
        setHoveredOption(Math.max(0, index))
        scrollTo(Math.max(0, index))
    }

    /**
     * Scroll
     */
     const scrollTo = (index) => {
        const refD = dropdownRef.current
        const refO = optionsRef.current[index]
        if (refO?.offsetTop < refD?.scrollTop) refD.scrollTop = refO.offsetTop
        else if ((refO?.offsetTop + refO?.offsetHeight) > (refD?.scrollTop + refD?.offsetHeight)) refD.scrollTop = refO.offsetTop + refO.offsetHeight - refD.offsetHeight
    }

    /**
     * Render
     */
    return (
        <div 
            className="relative flex w-full h-16 sm:h-18 xl:h-20" 
            ref={blurRef}
        >
            <input 
                type="text" 
                id={name}
                name={name}
                className={`grow h-full px-10 leading-4 bg-white shadow placeholder:text-neutral-400 ${validate ? (isValid ? 'shadow-green-200' : 'shadow-red-200') : ''}`}
                placeholder={placeholder}
                autoComplete="none"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={dropdown ? 'true' : 'false'}
                aria-owns={name + '-listbox'}
                aria-controls={name + '-listbox'}
                aria-autocomplete="list"
                ref={fieldRef}
                onKeyDown={manageKeyboard}
                onBlur={({ relatedTarget }) => !blurRef?.current?.contains(relatedTarget) && setDropdown(false)}
                value={fieldValue}
                onChange={fieldChange}
                onFocus={() => setDropdown(true)}
            />
            {dropdown && (
                <ul 
                    className="absolute z-20 top-full inset-x-0 max-h-48 overflow-y-auto scrollbar bg-white shadow-md"
                    role="listbox"
                    id={name + '-listbox'}
                    ref={dropdownRef}
                >
                    {options.map(( option, index ) => (
                        <li 
                            key={`${name}-${index}`}
                            role="option"
                            aria-selected={option.label === fieldValue ? 'true' : 'false'}
                            className={`relative flex items-center w-full h-16 cursor-pointer ${index === hoveredOption ? 'bg-neutral-50' : '' }`}
                            tabIndex="-1"
                            ref={(el) => optionsRef.current[index] = el}
                            onClick={() => selectOption(option)}
                            onMouseEnter={() => setHoveredOption(index)}
                            onMouseLeave={() => setHoveredOption(-1)}
                        >
                            <span className="hidden sm:flex justify-center items-center h-full aspect-square text-neutral-600" aria-hidden="true">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" stroke="#292D32" strokeWidth="1.5"/><path className="stroke-current" d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" stroke="#292D32" strokeWidth="1.5"/></svg>
                            </span>
                            <span className="grow overflow-hidden pl-4 sm:pl-0 pr-4 truncate text-ellipsis text-neutral-600 leading-8 text-left font-light">
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default FormAddressAutocomplete