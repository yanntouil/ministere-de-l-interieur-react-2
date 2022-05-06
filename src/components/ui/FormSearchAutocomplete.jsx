import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOnClickOutside } from '../../app/hooks'




/**
 * Form Address Autocomplete
 */
const FormSearchAutocomplete = ({ onSubmit }) => {
    const  { t } = useTranslation()
    const [ coordinates, setCoordinates ] = useState([])
    const [ fieldError, setFieldError ] = useState(false)

    const [hoverOption, setHoverOption] = useState(-1)
    const [searchError, setSearchError] = useState('')
    

    /**
     * Geolocation
     */
    const [geolocation, setGeolocation] = useState(false)
    const [geolocationPending, setGeolocationPending] = useState(false)
    const [geolocationError, setGeolocationError] = useState(false)
    const getGeolocation = () => {
        reset()
        setGeolocationPending(true)
        if (!('geolocation' in navigator)) return locationError('service-unavailable')
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const api = 'https://apiv3.geoportail.lu/geocode/reverse'
            try {
                const res = await fetch(`${api}?lon=${coords.longitude}&lat=${coords.latitude}`)
                const data = await res.json()
                if (data.results.length === 0) return locationError('position-unavailable')
                const coord = data.results[0].geomlonlat.coordinates
                const label = `${data.results[0].number}, ${data.results[0].street}, L-${data.results[0].postal_code} ${data.results[0].locality}`
                setGeolocationPending(false)
                setGeolocation(true)
                setCoordinates(coord)
                setSearch(label)
                onSubmit({ label, coordinates: coord})
            } catch (error) {
                return locationError('position-unavailable')
            }
        }, (error) => locationError(error.code === 1 ? 'permission-denied' : 'position-unavailable'))
    }
    const locationError = (error) => {
        setGeolocationPending(false)
        setGeolocationError(true)
        setFieldError(t('ui.form-postcode.errors.' + error))
    }

    /**
     * Search
     */    
    const searchRef = useRef(null)
    const [search, setSearch] = useState('')
    const [apiError, setApiError] = useState(false)
    const updateSearch = async ({ target }) => {
        // add lodash throttle to delay requests
        reset()
        setSearch(target.value)
        openDropdown()
        let options = []
        const postcode = target.value.trim().match(/((?:L)[-])?(\d{4})/g)

        
        try {
            if (postcode) {
                const res = await fetch(`https://apiv3.geoportail.lu/geocode/search?zip=${postcode[0]}`)
                const data = await res.json()
                if (!!data.results[0].geom) {
                    options.push({
                        label: data.results[0].address.replace(',', ', '), 
                        coordinates: data.results[0].geomlonlat.coordinates
                    })
                    setOptions({label: data.results[0].address, coordinates: data.results[0].geomlonlat.coordinates})
                }
            } else {
                const queryString = encodeURIComponent(target.value)
                const res = await fetch(`https://apiv3.geoportail.lu/fulltextsearch?limit=5&query=${queryString}`)
                const data = await res.json()
                const addresses = data.features
                    .filter(feature => feature.properties.layer_name === 'Localité')
                    .map(feature => ({ 
                        label: feature.properties.label,
                        coordinates: feature.geometry.coordinates 
                    }))
                options = [ ...options, ...addresses]
            }
            if (target.value) {
                const queryString = encodeURIComponent(target.value)
                const res = await fetch(`https://apiv3.geoportail.lu/fulltextsearch?limit=5&layer=Adresse&query=${queryString}`)
                const data = await res.json()
                const addresses = data.features
                    .filter(feature => feature.properties.layer_name === 'Adresse')
                    .map(feature => ({ 
                        label: feature.properties.label, 
                        coordinates: feature.geometry.coordinates 
                    }))
                options = [ ...options, ...addresses]
            }
            setOptions(options)
        } catch (error) {
            setFieldError(t('ui.form-postcode.errors.api-error'))
        }
    }

    /** 
     * Options
     */
    const [ options, setOptions ] = useState([])
    const optionsRef = useRef([])
    const selectOption = (option) => {
        searchRef.current.focus()
        setDropdown(false)
        setSearch(option.label)
        setCoordinates(option.coordinates)
        onSubmit({
            label: option.label,
            coordinates: option.coordinates,
        })
    }
    const reset = () => {
        setGeolocation(false)
        setGeolocationError(false)
        setFieldError('')
        setCoordinates([])
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
        setHoverOption(-1)
    }, [options, search])

    /**
     * Keyboard management
     */
    const manageKeyboard = (e) => {
        if (!['Escape', 'Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
        if (e.key === 'Escape') return closeDropdown()// Escape => Close
        if (e.key === 'Enter') {// Enter => Select option or do nothing
            if (options[hoverOption]) {
                e.preventDefault()
                return selectOption(options[hoverOption])
            }
            else return
        }
        e.preventDefault()
        openDropdown()
        // Options navigation
        let index = hoverOption
        if (e.key === "ArrowDown") index = (index + 1 === options.length) ? 0 : index + 1
        else if (e.key === "ArrowUp") index = (index - 1 < 0) ? options.length -1 : index - 1
        setHoverOption(Math.max(0, index));
        // Scroll management
        const refD = dropdownRef.current// Shortcut scrollable element
        const refO = optionsRef.current[index]// Shortcut hovered option element
        if (refO?.offsetTop < refD?.scrollTop)// Top
            refD.scrollTop = refO.offsetTop
        else if ((refO?.offsetTop + refO?.offsetHeight) > (refD?.scrollTop + refD?.offsetHeight))// Bottom
            refD.scrollTop = refO.offsetTop + refO.offsetHeight - refD.offsetHeight
    }
    
    /**
     * Valid form before submit
     */
    const beforeSubmit = (e) => {
        e?.preventDefault()
        if( coordinates.length !== 2) return setFieldError(t('ui.form-postcode.errors.invalid-position'))
        onSubmit({
            label: search,
            coordinates: coordinates,
        })
    }

    /**
     * Render
     */
    return (
        <form 
            className="flex flex-col items-stretch" 
            onSubmit={beforeSubmit}
            autoComplete="off" 
        >
            <div className="flex flex-col items-stretch sm:flex-row gap-6 sm:gap-0">
                <div className="relative grow">
                    <div className="relative w-full">
                        <label htmlFor="search" className="absolute inset-y-0 left-0 flex justify-center items-center px-8">
                            <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="stroke-current" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="stroke-current" d="M22 22L19 19" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                        <input 
                            type="text"
                            id="search"
                            className="w-full h-20 px-24 bg-white shadow-form"
                            placeholder={t('ui.form-postcode.placeholder')}
                            autoComplete="off" 
                            ref={searchRef}
                            value={search}
                            onBlur={() => setTimeout(closeDropdown , 200)}
                            onChange={updateSearch}
                            onFocus={openDropdown}
                            onKeyDown={manageKeyboard}
                        />
                        <button 
                            className={`absolute inset-y-0 right-0 flex justify-end items-center px-8`}
                            type="button"
                            onClick={getGeolocation}
                        >
                            <svg className={`w-7 h-7 stroke-current ${geolocationPending ? 'text-blue-500 animate-ping' : geolocation ? 'text-green-500' : geolocationError ? 'text-red-500' : 'text-slate-500'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="stroke-current" d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="stroke-current" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="stroke-current" d="M12 4V2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="stroke-current" d="M4 12H2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="stroke-current" d="M12 20V22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path className="stroke-current" d="M20 12H22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    {dropdown && options.length > 0 && (
                        <ul className="absolute top-full right-0 left-0 overflow-y-auto scrollbar max-h-40 flex flex-col bg-white shadow-md" ref={dropdownRef}>
                            {options.map((option, index) => (
                                <li key={`address-option-${index}`}>
                                    <button 
                                        className={`w-full px-[40px] py-4 text-left cursor-pointer ${index === hoverOption ? 'bg-gray-100' : '' }`}
                                        type="button"
                                        tabIndex="-1"
                                        ref={(el) => optionsRef.current[index] = el}
                                        onClick={(e) => selectOption(option)}
                                        onMouseEnter={() => setHoverOption(index)}
                                        onMouseLeave={() => setHoverOption(-1)}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button 
                    className="h-20 shrink-0 px-12 bg-primary-500 hover:bg-primary-600 text-center text-white transition-colors duration-300 ease-in-out"
                    type="submit"
                >
                    {t('ui.form-postcode.button')}
                </button>
            </div>
            <div className="flex items-center h-16 text-red-500 font-light text-lg">
                {fieldError}
            </div>
        </form>
    )
}
export default FormSearchAutocomplete