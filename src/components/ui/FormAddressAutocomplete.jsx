import { useState, useRef, useCallback, useEffect } from 'react'
import { useOnClickOutside } from '../../app/hooks'




/**
 * Form Address Autocomplete
 */
const FormAddressAutocomplete = ({ placeholder, value, setValue }) => {
    const [hoverOption, setHoverOption] = useState(-1)
    
    /**
     * Search
     */    
    const searchRef = useRef(null)
     const [search, setSearch] = useState(value)
     const [apiError, setApiError] = useState(false)
     const updateSearch = async ({ target }) => {
        // add lodash throttle to delay requests
        setSearch(target.value)
        openDropdown()
        const queryString = encodeURIComponent(target.value)
        const api = 'https://apiv3.geoportail.lu/fulltextsearch'
        const limit = 10
        try {
            const res = await fetch(`${api}?limit=${limit}&layer=Adresse&query=${queryString}`)
            const data = await res.json()
            setOptions(data.features)
            setApiError(false)
        } catch (error) {
            setApiError(true)
        }
        if (target.value === '') return setValue('', [])
        const option = options.find((option) => option.properties.label === target.value)
        if (option) setValue(option.properties.label, option.geometry.coordinates)
    }

    /** 
     * Options
     */
    const [ options, setOptions ] = useState([])
    const optionsRef = useRef([])
    const selectOption = (option) => {
        searchRef.current.focus()
        setDropdown(false)
        setValue(option.properties.label, option.geometry.coordinates)
        setSearch(option.properties.label)
    }

    /**
     * Dropdown
     */
    const [ dropdown, setDropdown ] = useState(false)
    const dropdownRef = useRef(null)
    useOnClickOutside(dropdownRef, () => closeDropdown(false))
    const openDropdown = () => {
        setDropdown(true)
    }
    const closeDropdown = useCallback(() => {
        setDropdown(false)
        setOptions([])
        const option = options.find((option) => option.properties.label === search)
        if (option) setValue(option.properties.label, option.geometry.coordinates)
        else setSearch('')
    }, [options, search, setValue])

    /**
     * Clear value from parent component
     */
    useEffect(() => {
        if (value === '') setSearch('')
    }, [value])

    /**
     * Keyboard management
     */
    const manageKeyboard = (e) => {
        if (!['Escape', 'Enter', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
        if (e.key === 'Escape') return closeDropdown()// Escape => Close
        if (e.key === 'Enter') {// Enter => Select option or do nothing
            const option = options.find((option) => option.id === hoverOption)
            return option && selectOption(option)
        }
        e.preventDefault()
        openDropdown()
        // Options navigation
        let index = options.findIndex((option) => option.id === hoverOption)
        if (e.key === "ArrowDown") index = (index + 1 === options.length) ? 0 : index + 1
        else if (e.key === "ArrowUp") index = (index - 1 < 0) ? options.length -1 : index - 1
        else if (e.key === "Home") index = 0 
        else if (e.key === "End") index = options.length -1
        setHoverOption(options[Math.max(0, index)].id);
        // Scroll management
        const refD = dropdownRef.current// Shortcut scrollable element
        const refO = optionsRef.current[index]// Shortcut hovered option element
        if (refO?.offsetTop < refD?.scrollTop)// Top
            refD.scrollTop = refO.offsetTop
        else if ((refO?.offsetTop + refO?.offsetHeight) > (refD?.scrollTop + refD?.offsetHeight))// Bottom
            refD.scrollTop = refO.offsetTop + refO.offsetHeight - refD.offsetHeight
    }

    /**
     * Render
     */
    return (
        <div className="relative z-10">
            <input 
                type="text"
                className="form-control"
                placeholder={placeholder}
                autoComplete="do-not-autofill"
                ref={searchRef}
                value={search}
                onChange={updateSearch}
                onFocus={openDropdown}
                onKeyDown={manageKeyboard}
            />
            {dropdown && options.length > 0 && (
                <ul className="absolute top-full right-0 left-0 overflow-y-auto scrollbar max-h-40 flex flex-col bg-white shadow-md" ref={dropdownRef}>
                    {options.map((option, index) => (
                        <li key={`address-option-${index}`}>
                            <button 
                                className={`w-full px-[40px] py-4 text-left cursor-pointer ${option.id === hoverOption ? 'bg-gray-100' : '' }`}
                                tabIndex="-1"
                                ref={(el) => optionsRef.current[index] = el}
                                onClick={() => selectOption(option)}
                                onMouseEnter={() => setHoverOption(option.id)}
                                onMouseLeave={() => setHoverOption('')}
                            >
                                {option.properties.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {dropdown && apiError && (
                <div className="absolute top-full right-0 left-0 px-[40px] py-4 bg-white shadow-md text-secondary-500 text-center">
                    Une erreur sur le serveur Géoportail nous empêche de vérifier l&apos;adresse
                </div>
            )}
        </div>
    )
}
export default FormAddressAutocomplete