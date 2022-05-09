import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMedia, useWindowSize } from "../app/hooks"
import { FormLocationAutocomplete, PageHeading } from "../components/ui"
import ProfileCardHome from "../components/ui/ProfileCardHome"
import businessProfiles from "../mock/businessProfiles"
import mapJSON from '../styles/map.json'

const sortProfile =  (profiles, rootCoord) => [ ...profiles ].sort((a, b) => getDistance(a.coordinates, rootCoord) - getDistance(b.coordinates, rootCoord))
const getDistance = (a, b) => {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    return Math.sqrt( x * x + y * y );
}
const profileOnPage = (profiles, page, entriesPerPage) => profiles.slice((page - 1) * entriesPerPage, page * entriesPerPage)


export default function Home({ profiles = businessProfiles}) {
    const resultMapRef = useRef(null);
    const mapRef = useRef(null);
    const luxmap = window.lux
    const media = useMedia()
    const windowSize = useWindowSize()

    const [ page, setPage ] = useState(1)

    const entriesPerPage = media.min('xl') ? 3 : 4
    
    const { t, i18n } = useTranslation()
    const [ search, setSearch ] = useState({
        label: '',
        coordinates: [],
    })

    /**
     * Maps
     */
    useEffect(() => {
        if (!resultMapRef.current) return;
        if (search.coordinates.length !== 2 ) return
        mapRef.current = new luxmap.Map({
            target: 'result-map',
            bgLayer: 'basemap_2015_global',
            bgLayerStyle: mapJSON,
            zoom: 13,
            positionSrs: 4326,
            position: search.coordinates
        })
        profiles.forEach((profile, index) => {
            mapRef.current.showMarker({
                position: profile.coordinates,
                positioning: 'center-center',
                positionSrs: 4326,
                iconURL: '/images/location.svg',
                html: `
                <img
                    className="cover"
                    src="${profile.image}" 
                    alt="${profile.name}" 
                />
                <div class="description">
                    <h2 class="name">${profile.name}</h2>
                    <p class="address">${profile.address}</p>
                    <a class="phone" href="mailto:${profile.phone}">${t('ui.profile-card.phone')}&nbsp;: ${profile.phone}</a>
                    <a class="email" href="mailto:${profile.email}">${t('ui.profile-card.email')}&nbsp;: ${profile.email}</a>
                <div/>
                `,
            })
        })
        return () => mapRef.current.setTarget(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ search.coordinates, windowSize ])


    /**
     * Render
     */
    return (
        <>
            <section className="container px-8 sm:px-0 mx-auto pb-24 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 sm:gap-24">
                <div className="flex flex-col justify-center gap-12 sm:gap-24">
                    <div>
                        <PageHeading title={(
                            <>
                                <span className={`flex  gap-6 ${i18n.language === 'fr' ? '': 'pb-10'}`}>
                                    {t('pages.home.page-title-1')} <span className={`font-shelby text-highlight-500 text-[85px] sm:text-[95px] lg:text-[115px] font-bold`}>{t('pages.home.page-title-2')}</span><br />
                                </span>
                                {t('pages.home.page-title-3')}
                            </>
                        )} secondary={(
                            <>
                                {t('pages.home.page-secondary')}
                                <a href={
                                    (i18n.language === 'fr') ? 'https://mint.gouvernement.lu/fr/dossiers/2022/ceremonies-civiles.html' :
                                    (i18n.language === 'de') ? 'https://mint.gouvernement.lu/de/dossiers/2022/ceremonies-civiles.html' :
                                    (i18n.language === 'lu') ? 'https://mint.gouvernement.lu/lb/dossiers/2022/ceremonies-civiles.html' :
                                    'https://mint.gouvernement.lu/en/dossiers/2022/ceremonies-civiles.html'
                                } target="_blank" rel="noreferrer noopener" className="underline hover:text-primary-500 transition-colors duration-300 ease-in-out">{t('pages.home.page-secondary-link')}</a>
                            </>
                        )} />
                    </div>
                    <FormLocationAutocomplete
                        onSubmit={setSearch}
                        submitLabel={t('ui.form-postcode.button')}
                        placeholder={t('ui.form-postcode.placeholder')}
                    />
                </div>
                <div className="lg:relative lg:z-10 flex items-stretch aspect-[16/6] lg:aspect-3/4 overflow-y-hidden">
                    <img className="object-cover grow" src="/images/home.jpg" alt="Say yes" />
                </div>
            </section>
            {search.coordinates.length === 2 ? (
                <section className="relative bg-white -mt-48">
                    <div className="container grid xl:grid-cols-2 px-8 sm:px-0 mx-auto pt-48 pb-24 gap-y-8 sm:gap-x-24">
                        <div>
                            <div className="flex gap-4 pb-12 flex-wrap sm:flex-nowrap">
                                <h2 className="flex items-center w-full sm:w-auto text-3xl xl:text-2xl 2xl:text-4xl font-bold">{t('pages.home.result-title')}</h2>
                                <div className="flex sm:justify-center items-center grow shrink-0 h-12 font-thin">
                                    {profiles.length + ' ' + t('pages.home.result-count')}
                                </div>
                                <button 
                                    className={`flex justify-center items-center w-12 h-12 shrink-0 transition-colors duration-300 ease-in-out text-white ${ page === 1 ? 'bg-neutral-500 cursor-auto' : 'bg-primary-500 hover:bg-primary-600 cursor-pointer'}`}
                                    onClick={() => setPage(Math.max(1, (page - 1)))}
                                >
                                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="stroke-current" d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path className="stroke-current" d="M20.5 12H3.67004" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button 
                                    className={`flex justify-center items-center w-12 h-12 shrink-0 transition-colors duration-300 ease-in-out text-white ${ page === Math.ceil(profiles.length / entriesPerPage) ? 'bg-neutral-500 cursor-auto' : 'bg-primary-500 hover:bg-primary-600 cursor-pointer'}`}
                                    onClick={() => setPage(Math.min((page + 1), Math.ceil(profiles.length / entriesPerPage)))}
                                >
                                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="stroke-current" d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path className="stroke-current" d="M3.5 12H20.33" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8">
                                {profileOnPage( sortProfile( profiles, search.coordinates ), page, entriesPerPage ).map((profile, index) => (
                                    <ProfileCardHome
                                        key={`profile-${index}`}
                                        profile={profile} 
                                        displayOnMap={() => setSearch({label: profile.name, coordinates: profile.coordinates})}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="relative h-96 xl:h-auto">
                            <div id="result-map" ref={resultMapRef} className="result-map" />
                        </div>
                    </div>
                </section>
            ) : (<div className="h-12" />)}
        </>
    )
}
