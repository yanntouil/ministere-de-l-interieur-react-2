import React, { useState, useRef } from "react"
import { useOnClickOutside } from "../../app/hooks"
import geoportailService from "../../services/geoportail"
import { Button } from "./Button"

/**
 * Form Location Autocomplete
 * @param {{
 *      location?: string, 
 *      setLocation?: React.Dispatch<string>,
 *      setError?: (error: string) => {},
 *      onSubmit?: () => {},
 *      placeholder?: string,
 *      name?: string,
 *      activeGeolocation?: boolean,
 * }} props
 * @returns {JSX.Element}
 */
const FormLocationAutocomplete = ({ location = '', setLocation = () => {}, setError = () => {}, onSubmit = () => {}, placeholder = '', name = 'form-location-autocomplete', submitLabel = 'Search', activeGeolocation = true }) => {

    /**
     * Field
     */
    const [ fieldValue, setFieldValue ] = useState(location)
    const fieldRef = useRef(null)
    const fieldChange = async ({ target }) => {
        setFieldValue(target.value)
        updateValue([], '')
        setGeolocation('off')
        openDropdown()
        try {
            let results = []
            const postcode = target.value.match(/((?:L)[-])?(\d{4})/g)
            if (postcode) {
                const result = await geoportailService.postcodeCoord(postcode[0])
                result && results.push({
                    label: result.location,
                    value: result.location,
                    coordinates: result.coordinates
                })
            } else {
                results = await geoportailService.prefillCity(target.value)
            }
            const addresses = await geoportailService.prefillAddress(target.value)
            results = [...results, ...addresses]
            setOptions(results)
            const option = results.find(option => option.value === target.value)
            if (option) updateValue(option.coordinates, option.value)
        } catch (error) {
            setError('api-error')
        }
    }

    const [ value, setValue ] = useState({
        coordinates: [],
        location: location,
    })
    const updateValue = (coordinates, location) => {
        setValue({ coordinates, location })
        setLocation({ coordinates, location })
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
        closeDropdown()
        onSubmit({
            coordinates: option.coordinates,
            location: option.value
        })
    }

    /**
     * Dropdown
     */
    const [ dropdown, setDropdown ] = useState(false)
    const blurRef = useRef(null)
    const dropdownRef = useRef(null)
    const openDropdown = () => {
        setDropdown(true)
    }
    const closeDropdown = () => {
        setDropdown(false)
    }
    useOnClickOutside(blurRef, () => closeDropdown(false))

    /**
     * Keyboard
     */
    const [ hoveredOption, setHoveredOption ] = useState(-1)
    const manageKeyboard = (e) => {
        if (!['Escape', 'Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
        if (e.key === 'Escape') return closeDropdown()
        if (e.key === 'Enter') {
            if (options[hoveredOption]) {
                e.preventDefault()
                return selectOption(options[hoveredOption])
            } else return
        }
        openDropdown()
        // Navigation
        e.preventDefault()
        let index = hoveredOption
        if (e.key === "ArrowDown") index = (index + 1 === options.length) ? 0 : index + 1
        else if (e.key === "ArrowUp") index = (index - 1 < 0) ? options.length -1 : index - 1
        setHoveredOption(Math.max(0, index))

        // Scroll management
        const refD = dropdownRef.current// Shortcut scrollable element
        const refO = optionsRef.current[index]// Shortcut hovered option element
        if (refO?.offsetTop < refD?.scrollTop) refD.scrollTop = refO.offsetTop
        else if ((refO?.offsetTop + refO?.offsetHeight) > (refD?.scrollTop + refD?.offsetHeight)) refD.scrollTop = refO.offsetTop + refO.offsetHeight - refD.offsetHeight
    }

    /**
     * Geolocation
     */
    const [ geolocation, setGeolocation ] = useState('off') 
    const geolocationError = (error) => {
        setGeolocation(error)
        setError('geolocation-' + error)
    }
    const onClickGeolocation = () => {
        setGeolocation('pending')
        if (!('geolocation' in navigator)) return geolocationError('disabled')
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            try {
                const location = await geoportailService.coordsAddress(coords)
                if (!location) return geolocationError('unavailable')
                setGeolocation('on')
                setFieldValue(location.address)
                updateValue(location.coordinates, location.address)
            } catch (error) {
                geolocationError('api-error')
            }
        }, (error) => geolocationError(error.code === 1 ? 'permission-denied' : 'unavailable'))
    }
    /**
     * Before submit
     */
    const beforeSubmit = (e) => {
        e?.preventDefault()
        onSubmit(value)
    }

    /**
     * Render
     */
    return (
        <form className="lg:relative lg:z-20 flex flex-wrap h-16 sm:h-18 xl:h-20 gap-y-8" onSubmit={beforeSubmit}>
            <div 
                className="relative flex grow h-full" 
                ref={blurRef}
            >
                <label 
                    htmlFor={name}
                    className="absolute inset-y-0 left-0 flex justify-center items-center w-20 sm:w-24 xl:w-28 text-neutral-400" 
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M22 22L19 19" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="sr-only">{placeholder}</span>
                </label>
                <input 
                    type="text" 
                    id={name}
                    name={name}
                    className={`grow h-full px-20 sm:px-24 xl:px-28 leading-4 bg-white shadow placeholder:text-neutral-500 text-lg`}
                    placeholder={placeholder}
                    autoComplete="off"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={dropdown ? 'true' : 'false'}
                    aria-owns={name + '-listbox'}
                    aria-controls={name + '-listbox'}
                    aria-autocomplete="list"
                    ref={fieldRef}
                    onKeyDown={manageKeyboard}
                    onBlur={({ relatedTarget }) => !blurRef?.current?.contains(relatedTarget) && closeDropdown()}
                    value={fieldValue}
                    onChange={fieldChange}
                    onFocus={openDropdown}
                />
                {activeGeolocation && (
                    <button 
                        className={`absolute inset-y-0 right-0 flex justify-center items-center w-20 sm:w-24 xl:w-28`}
                        type="button"
                        onClick={onClickGeolocation}
                        onFocus={closeDropdown}
                    >
                        <span 
                            className={`${(geolocation === 'pendding') ? 'text-primary-500 animate-pulse' : (geolocation === 'off') ? 'text-neutral-500' : (geolocation === 'on') ? 'text-green-500' : 'text-red-500'}`}
                            aria-hidden="true"
                        >
                            {(geolocation === 'disabled' || geolocation === 'permission-denied') ? (
                                <svg className={`w-7 h-7`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 4V2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M4 12H2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 20V22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M20 12H22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            ) : (
                                <svg className={`w-7 h-7`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 4V2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M4 12H2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M12 20V22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M20 12H22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )}
                        </span>
                        <span className="sr-only">geolocation</span>
                    </button>
                )}
                {dropdown && (
                    <ul 
                        className="absolute z-10 top-full inset-x-0 max-h-48 overflow-y-auto scrollbar bg-white shadow-md"
                        role="listbox"
                        id={name + '-listbox'} 
                        ref={dropdownRef}
                    >
                        {options.map(( option, index ) => (
                            <li 
                                key={`${name}-${index}`}
                                role="option"
                                aria-selected={option.label === fieldValue ? 'true' : 'false'}
                                className={`relative flex items-center w-full h-16 ${index === hoveredOption ? 'bg-neutral-100' : '' }`}
                                tabIndex="-1"
                                ref={(el) => optionsRef.current[index] = el}
                                onClick={() => selectOption(option)}
                                onMouseEnter={() => setHoveredOption(index)}
                                onMouseLeave={() => setHoveredOption(-1)}
                            >
                                <span className="absolute inset-y-0 left-0 flex justify-center items-center w-20 sm:w-24 xl:w-28" aria-hidden="true">
                                    <svg className="h-6 w-6 fill-current text-neutral-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path d="M192 0C85.969 0 0 85.969 0 192C0 269.41 26.969 291.035 172.281 501.676C177.047 508.559 184.523 512 192 512S206.953 508.559 211.719 501.676C357.031 291.035 384 269.41 384 192C384 85.969 298.031 0 192 0ZM192 473.918C51.932 271.379 32 255.969 32 192C32 103.777 103.775 32 192 32S352 103.777 352 192C352 255.879 332.566 270.674 192 473.918ZM192 112C147.818 112 112 147.816 112 192S147.818 272 192 272C236.184 272 272 236.184 272 192S236.184 112 192 112ZM192 240C165.533 240 144 218.467 144 192S165.533 144 192 144S240 165.533 240 192S218.467 240 192 240Z"/>
                                    </svg>
                                </span>
                                <span className="grow overflow-hidden pl-20 sm:pl-24 xl:pl-28 pr-10 truncate text-ellipsis text-neutral-600 leading-8 text-left text-lg">
                                    {option.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Button 
                type="submit"
                className="lg:absolute lg:top-0 lg:left-full justify-center w-full sm:w-max h-full px-16 text-lg"
            >
                {submitLabel}
            </Button>
        </form>
    )
}
export default FormLocationAutocomplete