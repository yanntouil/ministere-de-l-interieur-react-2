import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, FormText, FormValidate, PageHeading } from "../components/ui"




/**
 * Page Login
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
        <div className="max-w-xl mx-8 sm:mx-auto py-24">
            <PageHeading title={t('pages.login.page-title')} secondary={t('pages.login.page-secondary')} center />
            <form name="login" onSubmit={onSubmit} className="flex flex-col gap-12 mt-24">
                <FormValidate isValid={true} validate={false} message={''}>
                    <FormText
                        value={formData.username}
                        setValue={(value) => setFormData({ ...formData, username: value })}
                        placeholder={t('pages.login.username')}
                        name="form-username"
                        label={(
                            <img src="/images/ui/form/username-icon.svg" alt="Username Icon" width="25" height="25" aria-hidden="true" />
                        )}
                    />
                </FormValidate>
                <FormValidate isValid={true} validate={false} message={''}>
                    <FormText
                        value={formData.password}
                        setValue={(value) => setFormData({ ...formData, password: value })}
                        placeholder={t('pages.login.password')}
                        name="form-password"
                        password
                        label={(
                            <img src="/images/ui/form/password-icon.svg" alt="Password" width="25" height="25" aria-hidden="true" />
                        )}
                    />
                </FormValidate>
                <div className="flex justify-end -mt-8">
                    <button className="underline text-neutral-500 hover:text-primary-500 transition-colors duration-300 ease-in-out" type="button" onClick={forgotPassword}>
                        {t('pages.login.forgot-password')}
                    </button>
                </div>
                <div className="flex justify-center mt-12">
                    <Button type="submit">
                        {t('pages.login.login-button')}
                    </Button>
                </div>
            </form>
        </div>
    )
}
