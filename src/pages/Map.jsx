import { useEffect, useRef } from "react";
import mapJSON from '../styles/map.json'
import businessProfiles from "../mock/businessProfiles"
import { useTranslation } from "react-i18next";





export default function Carte({ profiles = businessProfiles}) {
    const luxmap = window.lux
    const { t } = useTranslation()
    const mapRef = useRef(null);
    const resultMapRef = useRef(null);

    useEffect(() => {
        if (!resultMapRef.current) return;

        mapRef.current = new luxmap.Map({
            target: 'global-map',
            bgLayer: 'basemap_2015_global',
            bgLayerStyle: mapJSON,
            zoom: 12,
            positionSrs: 4326,
            position: [ 6.1317, 49.6128 ]
        })

        profiles.forEach((profile, index) => {
            mapRef.current.showMarker({
                position: profile.coordinates,
                positioning: 'center-center',
                positionSrs: 4326,
                iconURL: '/images/location.svg',
                // click: true,
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultMapRef])


    return (
        <div className="w-full max-w-screen-2xl mx-auto px-[30px] sm:px-[40px] xl:px-[50px] 2xl:px-0 py-[50px]">
            <div className="aspect-9/16 sm:aspect-video">
                <div id="global-map" ref={resultMapRef} className="result-map" />
            </div>
        </div>
    )
}
