import { useMedia, useOnClickOutside } from "../../app/hooks"
import { Link, useLocation } from "react-router-dom"
import { useState, useRef } from "react"
import { useTranslation } from 'react-i18next'
import { supportedLngs } from "../../i18n"




const MainNav = () => {
    const media = useMedia()
    const { t, i18n } = useTranslation()
    const router = useLocation()
    const linkIsActive = (link) => router.pathname === link

    /**
     * Mobile menu
     */
    const [ mobileDropdown, setMobileDropdown ] = useState(false)
    const mobileDropdownRef = useRef(null)
    useOnClickOutside(mobileDropdownRef, () => setMobileDropdown(false))

    /**
     * Languages
     */
    const [ languageDropdown, setLanguageDropdown ] = useState(false)
    const languageDropdownRef = useRef(null)
    useOnClickOutside(languageDropdownRef, () => setLanguageDropdown(false))
    const changeLanguage = (language) => {
        // localStorage.setItem('language', language)
        document.documentElement.setAttribute('lang', language)
        i18n.changeLanguage(language)
        setLanguageDropdown(false)
    }

    /**
     * Render
     */
    return (
        <nav className="mainnav">
            <Link to="/" className="mainnav-logo">
                <img 
                    src="/images/logo.svg" 
                    alt={t('layout.site-title')}
                    aria-hidden='true'
                />
                <span className="sr-only">{t('layout.site-title')}</span>
            </Link>
            {media.min('lg') ? (
                <>
                    <Mainmenu />
                    <ul className="mainnav-actions">
                        <li className="mainnav-actions-item">
                            <Link to="/login" className={`mainnav-actions-item-login${linkIsActive('/login') ? ' active' : ''}`}>
                                {t('layout.menu-login')}
                            </Link>
                        </li>
                        <li 
                            className="mainnav-actions-item" 
                            ref={languageDropdownRef}
                        >
                            <button 
                                className="mainnav-actions-item-languages"
                                onClick={() => setLanguageDropdown(true)}
                            >
                                {i18n.language.slice(0, 2).toUpperCase()}
                            </button>
                            {languageDropdown && (
                                <Languages 
                                    onChange={(language) => changeLanguage(language)}
                                    current={i18n.language}
                                />
                            )}
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <div className="mainnav-actions">
                        <button 
                            className="mainnav-actions-mobile"
                            onClick={() => setMobileDropdown(!mobileDropdown)}
                        >
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 112H432C440.844 112 448 104.844 448 96S440.844 80 432 80H16C7.156 80 0 87.156 0 96S7.156 112 16 112ZM432 240H16C7.156 240 0 247.156 0 256S7.156 272 16 272H432C440.844 272 448 264.844 448 256S440.844 240 432 240ZM432 400H16C7.156 400 0 407.156 0 416S7.156 432 16 432H432C440.844 432 448 424.844 448 416S440.844 400 432 400Z"/></svg>
                            <span className="sr-only">{t('open-menu')}</span>
                        </button>
                        {mobileDropdown && (
                            <>
                                <div 
                                    className="mainnav-backdrop" 
                                    aria-hidden="true" 
                                    onClick={() => setMobileDropdown(false)} 
                                />
                                <div 
                                    className="mainnav-actions-dropdown" 
                                    onClick={() => setMobileDropdown(false)}
                                >
                                    <button 
                                        className="mainnav-actions-dropdown-close"
                                        onClick={() => setMobileDropdown(false)}
                                    >
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M317.656 402.344C320.781 405.469 320.781 410.531 317.656 413.656C314.529 416.783 309.471 416.783 306.344 413.656L160 267.312L13.656 413.656C10.529 416.783 5.471 416.783 2.344 413.656C-0.781 410.531 -0.781 405.469 2.344 402.344L148.687 256L2.344 109.656C-0.781 106.531 -0.781 101.469 2.344 98.344S10.531 95.219 13.656 98.344L160 244.688L306.344 98.344C309.469 95.219 314.531 95.219 317.656 98.344S320.781 106.531 317.656 109.656L171.312 256L317.656 402.344Z"/></svg>
                                        <span className="sr-only">{t('close-menu')}</span>
                                    </button>
                                    <Mainmenu />
                                    <Link to="/login" className={`mainnav-actions-dropdown-login${linkIsActive('/login') ? ' active' : ''}`}>
                                        {t('layout.menu-login')}
                                    </Link>
                                    <Languages 
                                        onChange={(language) => changeLanguage(language)}
                                        current={i18n.language}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </nav>
    )   
}
export default MainNav


/**
 * Mainmenu
 */
const Mainmenu = () => {
    const { t } = useTranslation()
    const router = useLocation()
    const linkIsActive = (link) => router.pathname === link
    const menu = [
        { name: t('layout.menu-home'), path: '/' },
        { name: t('layout.menu-map'), path: '/map' },
        { name: t('layout.menu-dashboard'), path: '/dashboard' },
    ]
    
    /**
     * Render
     */
    return (
        <ul className="mainmenu">
            {menu.map((link, index) => (
                <li 
                    className="mainmenu-item" 
                    key={`mainmenu-item-${index}`}
                >
                    <Link 
                        to={link.path} 
                        className={`mainmenu-item-link${linkIsActive(link.path) ? ' active' : ''}`}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

/**
 * Languages
 */
const Languages = ({ onChange, current }) => {
    /**
     * Render
     */
    return (
        <ul className="languages">
            {supportedLngs.map((language, index) => (
                <li 
                    className="languages-item" 
                    key={`languages-item-${index}`}
                >
                    <button 
                        className={`languages-item-button${language === current ? ' active' : ''}`}
                        onClick={() => onChange(language)}
                    >
                        {language.slice(0, 2).toUpperCase()}
                    </button>
                </li>
            ))}
        </ul>
    )
}