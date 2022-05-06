import { useState } from "react"
import { useTranslation } from "react-i18next"




/**
 * Login
 */
export default function Login() {
    const { t } = useTranslation()

    /**
     * Initial state
     */
    const [ passwordType, setPasswordType ] = useState('password')
        const [ formData, setFormData ] = useState({
        username: '', 
        password: '',
    })

    /**
     * Form submit
     */
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    /**
     * Forgot password
     */
    const forgotPassword = (e) => {
        console.log('Help i need somebody !!!')
    }
    
    /**
     * Render
     */
    return (
        <div className="page-login max-w-xl mx-8 sm:mx-auto">
            <div className="mt-24 mb-24">
                <h1 className=" mb-6 font-black text-center text-[35px] sm:text-[45px] lg:text-[55px] leading-[40px] sm:leading-[50px] lg:leading-[60px] text-secondary-500">{t('pages.login.page-title')}</h1>
                <p className="text-stone-500 text-center font-light sm:text-[18px]">{t('pages.login.page-secondary')}</p>
            </div>
            <form name="login" onSubmit={onSubmit}>

                <div className="input-group form-group">
                    <label htmlFor="loginUsername" className="input-group-icon">
                        <img 
                            src="/images/ui/form/username-icon.svg" 
                            alt="Username Icon"
                            width="25" 
                            height="25"
                            aria-hidden="true"
                        />
                        <span className="sr-only">{t('pages.login.username')}</span>
                    </label>
                    <input 
                        type="text"
                        id="loginUsername"
                        className="form-control" 
                        placeholder="E-mail ou nom d’utilisateur"
                        value={formData.username}
                        onChange={({ target }) => setFormData({ ...formData, username: target.value })}
                    />
                </div>

                <div className="input-group form-group">
                    <label htmlFor="loginPassword" className="input-group-icon">
                        <img 
                            src="/images/ui/form/password-icon.svg"
                            alt="Password"
                            width="25" 
                            height="25"
                            aria-hidden="true"
                        />
                        <span className="sr-only">{t('pages.login.password')}</span>
                    </label>
                    <input 
                        type={passwordType}
                        id="loginPassword"
                        className="form-control" 
                        placeholder={t('pages.login.password')}
                        value={formData.password}
                        onChange={({ target }) => setFormData({ ...formData, password: target.value })}
                    />
                    <button 
                        className="input-group-button"
                        type="button"
                        onClick={() => setPasswordType(passwordType === 'text' ? "password": 'text')}
                    >
                        <img 
                            src="/images/ui/form/password-eye-icon.svg"
                            alt="Display Password"
                            width="25" 
                            height="25"
                            aria-hidden="true"
                        />
                        <span className="sr-only">{t('pages.login.display-password')}</span>
                    </button>
                </div>

                <div className="forgot-password">
                        <button 
                            className="link"
                            type="button"
                            onClick={forgotPassword}
                            >
                            {t('pages.login.forgot-password')}
                        </button>
                </div>

                <div className="form-submit">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        {t('pages.login.login-button')}
                    </button>
                </div>

            </form>
        </div>
    )
}
