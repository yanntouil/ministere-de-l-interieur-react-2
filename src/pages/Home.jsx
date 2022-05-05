import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMedia } from "../app/hooks"
import FormPostcode from "../components/ui/FormPostcode"
import ProfileCardHome from "../components/ui/ProfileCardHome"
import businessProfiles from "../mock/businessProfiles"
import mapJSON from '../styles/map.json'

const sortProfile =  (profiles, rootCoord) => [ ...profiles ].sort((a, b) => getDistance(a.coordinates, rootCoord) - getDistance(b.coordinates, rootCoord))
const getDistance = (a, b) => {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    return Math.sqrt( x * x + y * y );
}


export default function Home({ profiles = businessProfiles}) {
    const resultMapRef = useRef(null);
    const mapRef = useRef(null);

    const luxmap = window.lux
    const media = useMedia()
    const { t } = useTranslation()
    const [ search, setSearch ] = useState({
        postcode: '',
        coord: [],
    })

    useEffect(() => {
        if (!resultMapRef.current) return;
        if (search.coord.length !== 2 ) return

        mapRef.current = new luxmap.Map({
            target: 'result-map',
            bgLayer: 'basemap_2015_global',
            bgLayerStyle: mapJSON,
            zoom: 14,
            positionSrs: 4326,
            position: search.coord
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

        return () => {
            mapRef.current.setTarget(undefined)
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ search.coord ])


    /**
     * Render
     */
    return (
        <div className="page-dashboard">
            <div className="w-full max-w-screen-2xl mx-auto px-[30px] sm:px-[40px] xl:px-[50px] 2xl:px-0">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center mt-12 lg:mt-0">
                        <div className="mb-12 lg:mb-24">
                            <h1 className="mb-6 font-black text-[35px] sm:text-[45px] lg:text-[55px] leading-[40px] sm:leading-[50px] lg:leading-[60px] text-secondary-500">
                                <span className="flex pb-10 gap-6">
                                    {t('pages.home.page-title-1')} <span className="font-shelby text-highlight-500 text-[85px] sm:text-[95px] lg:text-[115px] font-bold">{t('pages.home.page-title-2')}</span><br />
                                </span>
                                {t('pages.home.page-title-3')}
                            </h1>
                            <p className="lg:max-w-[500px] text-stone-500 font-light sm:text-[18px]">
                                {t('pages.home.page-secondary')}
                            </p>
                        </div>
                        <div className="relative">
                            <div className="lg:absolute lg:z-20 lg:top-0 lg:left-0" style={{width: media.min('lg') ? 'calc(100% + 50px + 95px)' : '100%'}}>
                                <FormPostcode
                                    placeholder={t('pages.home.search')}
                                    onSubmit={(value) => setSearch(value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="lg:z-10 aspect-video lg:aspect-3/4">
                        <img
                            className="object-cover w-full h-full"
                            src="/images/home.jpg" 
                            alt="Say yes" 
                        />
                    </div>
                </div>
            </div>
            {search.coord.length === 2 ? (
                <div className="bg-white relative z-0 lg:-mt-24 lg:pt-36">
                    <div className="w-full max-w-screen-2xl mx-auto px-[30px] sm:px-[40px] xl:px-[50px] 2xl:px-0 py-[50px]">
                        <div className="grid xl:grid-cols-2 gap-12">
                            <div>
                                <div className="flex gap-4 pb-12 flex-wrap sm:flex-nowrap">
                                    <h2 className="flex items-center w-full sm:w-auto text-3xl xl:text-2xl 2xl:text-4xl font-bold">{t('pages.home.result-title')}</h2>
                                    <div className="flex sm:justify-center items-center  grow font-thin">
                                        {profiles.length + ' ' + t('pages.home.result-count')}
                                    </div>
                                    <button className="flex justify-center items-center w-12 h-12 shrink-0 bg-primary-500 hover:bg-primary-600 transition-colors duration-300 ease-in-out text-white">
                                        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="stroke-current" d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path className="stroke-current" d="M20.5 12H3.67004" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                   </button>
                                    <button className="flex justify-center items-center w-12 h-12 shrink-0 bg-primary-500 hover:bg-primary-600 transition-colors duration-300 ease-in-out text-white">
                                        <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="stroke-current" d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path className="stroke-current" d="M3.5 12H20.33" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8">
                                    {sortProfile(profiles, search.coord).map((profile, index) => (
                                        <ProfileCardHome
                                            key={`profile-${profile.id}`}
                                            profile={profile} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="aspect-9/16 xl:aspect-auto 2xl:aspect-3/4">
                                <div id="result-map" ref={resultMapRef} className="result-map" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-12" />
            )}
        </div>
    )
}
