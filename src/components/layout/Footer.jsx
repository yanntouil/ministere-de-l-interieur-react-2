import { Link, useLocation } from "react-router-dom"
import { useMedia } from "../../app/hooks"
import { useTranslation } from 'react-i18next'
import MainNav from "./MainNav"






const Footer = () => {
    const { t } = useTranslation()
    const media = useMedia()
    const { pathname } = useLocation()

    /**
     * Render
     */
    return (
        <footer className="footer">
            { !(pathname === '/login' || media.max('lg')) && (
                <MainNav />
            )}
            {media.max('lg') && (
                <Link to="/" className="footer-logo">
                    <img 
                        src="/images/logo.svg" 
                        alt={t('layout.site-title')} 
                        aria-hidden="true"
                    />
                    <span className="sr-only">{t('layout.site-title')}</span>
                </Link>
            )}

            <nav className="footer-bottom">
                <div className="footer-bottom-renow">
                    <a 
                        className="footer-bottom-renow-link"
                        href="https://renow.public.lu/"
                        target="blank"
                        rel="noopener noreferrer"
                    >
                        <img 
                            src="/images/renow.png"
                            alt="Renow" 
                            aria-hidden="true"
                            width={85}
                            height={28}
                        />
                        <span className="sr-only">{t('layout.renow')}</span>
                    </a>
                </div>
                <div className="footer-bottom-allrightreserved">
                    {t('layout.all-right-reserved')}
                </div>
                <div className="footer-bottom-101">
                    <a 
                        className="footer-bottom-101"
                        href="https://101.lu/"
                        target="blank"
                        rel="noopener noreferrer"
                    >
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={96} height={17}><g><text transform="translate(0 13)" fill="#242424" fontSize={12} fontFamily="Poppins-Regular, Poppins"><tspan x={0} y={0}>made by</tspan></text><g><g fill="#242424"><path d="m67.503 3.489-3.339 2.892v4.013l3.339-2.892v6.187h3.744v-10.2Z" /><path d="M96 13.689v-10.2h-3.745l-3.338 2.892v4.013l3.339-2.892v6.187Z" /><path d="M86.507 13.69V9.385a5.882 5.882 0 0 0-6.226-6.076c-3.339 0-6.249 2.175-6.249 6.076v4.305h3.745V9.453a2.508 2.508 0 1 1 4.985 0v4.238Z" /></g></g></g></svg>
                        <span className="sr-only">{t('layout.studio-101')}</span>
                    </a>
                </div>
            </nav>
        </footer>
    )   
}
export default Footer