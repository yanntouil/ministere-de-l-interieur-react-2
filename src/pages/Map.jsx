import { useEffect, useRef } from "react";
import mapJSON from '../styles/map.json'







export default function Carte() {
    const luxmap = window.lux
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
