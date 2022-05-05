import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useElementScrollSize } from "../../app/hooks"










const FormPostcode = ({ onSubmit }) => {
    const  { t } = useTranslation()
    const [ fieldErrorRef, fieldErrorSize ] = useElementScrollSize()
    const [ fieldError, setFieldError ] = useState(false)
    const [ value, setValue ] = useState('')
    const [ coord, setCoord ] = useState([])
    

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
                const postcode = 'L-' + data.results[0].postal_code
                setGeolocationPending(false)
                setGeolocation(true)
                setCoord(coord)
                setValue(postcode)
                onSubmit({ postcode, coord})
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
     * Postcode field
     */
    const updateValue = async ({ target }) => {
        reset()
        setValue(target.value)
        const postcode = target.value.trim().match(/(\d{4})/g)
        if (postcode) {
            try {
                // const res2 = await fetch(`https://apiv3.geoportail.lu/fulltextsearch?limit=5&layer=Adresse&query=${postcode[0]}`)
                // const data2 = await res2.json()
                // console.log(data2.features)
                const res = await fetch(`https://apiv3.geoportail.lu/geocode/search?zip=${postcode[0]}`)
                const data = await res.json()
                if (data.results.length === 0) {
                    return setFieldError(t('ui.form-postcode.errors.invalid-postcode'))
                }
                setCoord(data.results[0].geomlonlat.coordinates)
            } catch (error) {
                setFieldError(t('ui.form-postcode.errors.api-error'))
            }
        }
    }

    const reset = () => {
        setGeolocation(false)
        setGeolocationError(false)
        setFieldError('')
        setCoord([])
    }

    /**
     * Valid form
     */
    const onClick = () => {
        if( coord.length !== 2) return setFieldError(t('ui.form-postcode.errors.invalid-postcode'))
        const postcode = 'L-' + value.match(/(\d{4})/g)[0]
        setValue(postcode)
        onSubmit({
            postcode,
            coord,
        })
    }

    /**
     * Render
     */
    return (
        <div className="">
            <div className="flex flex-col sm:flex-row w-full gap-6 sm:gap-0">
                <div className="relative grow">
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
                        autoComplete="do-not-autofill" 
                        value={value}
                        onChange={updateValue}
                        onKeyUp={({ key }) => key === 'Enter' && onClick()}
                    />
                    <button 
                        className={`absolute inset-y-0 right-0 flex justify-end items-center px-8 ${geolocationPending ? 'text-blue-500 animate-ping' : geolocation ? 'text-green-500' : geolocationError ? 'text-red-500' : 'text-slate-500'}`}
                        onClick={getGeolocation}
                    >
                        <svg className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="stroke-current" d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="stroke-current" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="stroke-current" d="M12 4V2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="stroke-current" d="M4 12H2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="stroke-current" d="M12 20V22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path className="stroke-current" d="M20 12H22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <button 
                    className="h-20 px-12 bg-primary-500 hover:bg-primary-600 text-center text-white transition-colors duration-300 ease-in-out"
                    onClick={onClick}
                >
                    {t('ui.form-postcode.button')}
                </button>
            </div>
            <div className="flex items-center h-16 text-red-500 font-light text-lg">
                {fieldError}
            </div>
        </div>
    )
}
export default FormPostcode