import { useState, useRef, useCallback, useEffect } from 'react'
import { useOnClickOutside } from '../../app/hooks'




/**
 * Form Address Autocomplete
 */
const FormSearchAutocomplete = ({ placeholder, value, setValue }) => {
    const [hoverOption, setHoverOption] = useState(-1)
    const [searchError, setSearchError] = useState('')
    
    const [geolocation, setGeolocation] = useState(false)
    const [geolocationPending, setGeolocationPending] = useState(false)

    /**
     * Geolocation
     */
    const getGeolocation = () => {
        setGeolocationPending(true)
        if (!('geolocation' in navigator)) return locationError('SERVICE_UNAVAILABLE')
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const api = 'https://apiv3.geoportail.lu/geocode/reverse'
            try {
                const res = await fetch(`${api}?lon=${coords.longitude}&lat=${coords.latitude}`)
                const data = await res.json()
                if (data.results.length === 0) return locationError('POSITION_UNAVAILABLE')
                setGeolocationPending(false)
                setGeolocation(data.results[0].geomlonlat.coordinates)
                // add set value
            } catch (error) {
                return locationError('POSITION_UNAVAILABLE')
            }
        }, (error) => (error.code === 1) ? locationError('PERMISSION_DENIED') : locationError('POSITION_UNAVAILABLE'))
    }
    const locationError = (error) => {
        setGeolocationPending(false)
        setSearchError('Error message')// SERVICE_UNAVAILABLE POSITION_UNAVAILABLE PERMISSION_DENIED
    }

    /**
     * Search
     */    
    const searchRef = useRef(null)
     const [search, setSearch] = useState(value)
     const [apiError, setApiError] = useState(false)
     const updateSearch = async ({ target }) => {
        // add lodash throttle to delay requests
        setSearch(target.value)
        setApiError(false)
        openDropdown()
        const postcode = target.value.trim().match(/((?:L)[-])?(\d{4})/g)
        let options = []
        if (postcode) {
            try {
                const res = await fetch(`https://apiv3.geoportail.lu/geocode/search?zip=${postcode}`)
                const data = await res.json()
                if (data)
                console.log(data);
            } catch (error) {
                setApiError(true)
            }
        }

        return


        const queryString = encodeURIComponent(target.value)
        const api = 'https://map.geoportail.lu/fulltextsearch'
        const limit = 10
        try {
            if (true) return 
            const res = await fetch(`${api}?limit=${limit}&query=${queryString}`)
            const data = await res.json()
            const layers = ['Adresse', 'Localité', 'Commune']
            const features = data.features.filter((feature) => layers.includes(feature.properties.layer_name))
            
            
            //console.log(features.map(feature => [feature.properties.label, feature.properties.layer_name]))
            /*
                # Recherche de code postal
                1) faire une recherche dans l'adresse
                2) Recupere le 1er resultat et faire une recherche avec le nom de la commune
            */


            setOptions(features)
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
            <div className="input-group flex-grow-1">
                <label htmlFor="search" className="input-group-icon">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </label>
                <input 
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder={placeholder}
                    autoComplete="do-not-autofill" 
                    ref={searchRef}
                    value={search}
                    onChange={updateSearch}
                    onFocus={openDropdown}
                    onKeyDown={manageKeyboard}
                />
                <button 
                    className={`input-group-button ${geolocationPending ? 'text-blue-500 animate-pulse' : geolocation ? 'text-green-500' : 'text-slate-500'}`}
                    onClick={getGeolocation}
                >
                    <svg className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 160C202.98 160 160 202.98 160 256S202.98 352 256 352S352 309.019 352 256S309.02 160 256 160ZM256 336C211.889 336 176 300.113 176 256S211.889 176 256 176C300.113 176 336 211.887 336 256S300.113 336 256 336ZM504 248H448C447.846 248 447.756 248.156 447.604 248.164C443.566 148.406 363.596 68.433 263.836 64.398C263.844 64.242 264 64.156 264 64V8C264 3.594 260.422 0 256 0S248 3.594 248 8V64C248 64.156 248.156 64.242 248.164 64.398C148.404 68.433 68.434 148.406 64.396 248.164C64.244 248.156 64.154 248 64 248H8C3.578 248 0 251.594 0 256S3.578 264 8 264H64C64.154 264 64.244 263.844 64.396 263.836C68.434 363.594 148.404 443.566 248.164 447.601C248.156 447.758 248 447.844 248 448V504C248 508.406 251.578 512 256 512S264 508.406 264 504V448C264 447.844 263.844 447.758 263.836 447.601C363.596 443.566 443.566 363.594 447.604 263.836C447.756 263.844 447.846 264 448 264H504C508.422 264 512 260.406 512 256S508.422 248 504 248ZM256 432C158.953 432 80 353.047 80 256S158.953 80 256 80S432 158.953 432 256S353.047 432 256 432Z"/></svg>
                </button>
            </div>
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
export default FormSearchAutocomplete