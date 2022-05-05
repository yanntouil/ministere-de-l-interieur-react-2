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
            <h1 className="title">{t('pages.login.page-title')}</h1>
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
