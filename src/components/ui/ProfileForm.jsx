import { useState } from 'react'
import validator from 'validator'
import { useMedia } from '../../app/hooks'
import { weekDays } from "../../app/helpers"
import { FormCheckbox, FormText, FormToggle, FormValidate, FormAddressAutocomplete } from './'
import { useTranslation } from 'react-i18next'




const initialProfilePlanning = {
    active: true,
    morningFrom: '00:00',
    morningTo: '00:00',
    eveningFrom: '00:00',
    eveningTo: '00:00',
}

const initialProfile = {
    name: '',
    address: '',
    coordinates: [],
    email: '',
    phone: '',
    website: '',
    planning: {
        monday: { ...initialProfilePlanning },
        tuesday: { ...initialProfilePlanning },
        wednesday: { ...initialProfilePlanning },
        thursday: { ...initialProfilePlanning },
        friday: { ...initialProfilePlanning },
        saturday: { ...initialProfilePlanning, active: false },
        sunday: { ...initialProfilePlanning, active: false },
    }
}


/**
 * Profil form
 */
const ProfileForm = ({ profile = initialProfile, close, save }) => {
    const { t } = useTranslation()
    const media = useMedia()


    /**
     * Initial state
     */
    const [ validate, setValidate ] = useState(false)
    const [ planningAll, setPlanningAll ] = useState(false)
    const [ formData, setFormData ] = useState(profile)
     
    /**
     * Planning
     */
    const updatePlanning = (day, data) => {
        const newFormData = { ...formData }
        if (planningAll) weekDays.forEach(weekday => newFormData.planning[weekday] = { ...newFormData.planning[weekday], ...data})
        else newFormData.planning[day] = { ...newFormData.planning[day], ...data}
        setFormData(newFormData)
    }
    const planningIsDisable = (day) => !formData.planning[day].active

    /**
     * Validator
     */
    const formValidator = {
        name: () => formData.name.length > 3,
        address: () => formData.address && formData.coordinates.length === 2,
        website: () => !formData.website || validator.isURL(formData.website, {
            protocols: ['http', 'https'],
            require_protocol: true,
        }),
        email: () => validator.isEmail(formData.email),
        phone: () => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(formData.phone)
    }

    /**
     * Form submit
     */
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)// <-- Remove log
        setValidate(true)
        if (!(
            formValidator.name() &&
            formValidator.address() &&
            formValidator.website() &&
            formValidator.email() &&
            formValidator.phone()
        )) return
        save(formData)
    }

    /**
     * Render
     */
    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/60" />
            <div className="absolute inset-0 overflow-y-auto flex justify-center items-start">
                <div className="w-full max-w-screen-2xl mx-auto px-0 sm:px-[40px] xl:px-[50px] 2xl:px-0 py-0 sm:py-[50px]">
                    <div className="relative bg-background py-[20px] sm:py-[50px] px-[20px] sm:px-[50px]">
                        <button 
                            className="absolute top-[20px] sm:top-[50px] right-[20px] sm:right-[50px] btn btn-primary btn-icon"
                            onClick={close}
                        >
                            <svg aria-hidden="true" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M315.31 411.31C309.056 417.563 298.936 417.563 292.682 411.31L160 278.627L27.318 411.31C21.064 417.563 10.944 417.563 4.69 411.31C-1.563 405.056 -1.563 394.936 4.69 388.682L137.373 256L4.69 123.318C-1.563 117.064 -1.563 106.944 4.69 100.69C10.944 94.437 21.064 94.437 27.318 100.69L160 233.373L292.682 100.69C298.936 94.437 309.056 94.437 315.31 100.69C321.563 106.944 321.563 117.064 315.31 123.318L182.627 256L315.31 388.682C321.563 394.936 321.563 405.056 315.31 411.31Z"/></svg>                        
                            <span className="sr-only">{t('ui.profile-form.close')}</span>
                        </button>
                        <div className="page-header">
                            <h1 className="page-header-title">
                                {t('ui.profile-form.title-1')} <span className="page-header-highlight">{t('ui.profile-form.title-2')}</span><br />
                                {t('ui.profile-form.title-3')}
                            </h1>
                            <p className="page-header-secondary">
                                {t('ui.profile-form.secondary')}
                            </p>
                        </div>
                    </div>
                    <div className="relative bg-white px-[20px] sm:px-[100px]">
                        <div className="page-action relative" aria-hidden="true">
                            <span className="btn btn-primary btn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                                    <g transform="translate(213 -620) rotate(90)">
                                        <g transform="translate(620 188)">
                                            <path d="M0,0,6.323,6.323,0,12.646" transform="translate(15.031 6.177)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path d="M0,0H17.531" transform="translate(3.646 12.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path d="M0,0H25V25H0Z" transform="translate(25 25) rotate(180)" fill="none" opacity="0"/>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </div>
                        <form className="relative flex flex-col gap-[20px] sm:gap-[50px]" onSubmit={onSubmit}>
                            <div className="form-heading pt-[50px] sm:pt-[100px]">
                                {t('ui.profile-form.business-title')}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-[20px] sm:gap-[50px]">
                                <div className="col-span-6">
                                    <FormValidate 
                                        isValid={formValidator.name()}
                                        validate={validate}
                                        message={t('ui.profile-form.business-name-validation')}
                                    >
                                        <FormText 
                                            placeholder={t('ui.profile-form.business-name') + '*'}
                                            autoComplete="do-not-autofill"
                                            value={formData.name}
                                            onChange={({ target }) => setFormData({ ...formData, name: target.value })}
                                        />
                                    </FormValidate>
                                </div>
                                <div className="col-span-6 col-start-1">
                                    <FormValidate 
                                        isValid={formValidator.address()}
                                        validate={validate}
                                        message={t('ui.profile-form.business-address-validation')}
                                    >
                                        <FormAddressAutocomplete 
                                            placeholder={t('ui.profile-form.business-address') + '*'}
                                            value={formData.address}
                                            setValue={(address, coordinates) => setFormData({ ...formData, address, coordinates })}
                                        />
                                    </FormValidate>
                                </div>
                            </div>
                            <div className="form-heading pt-[25px] sm:pt-[50px]">
                                {t('ui.profile-form.contact-title')}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-[25px] sm:gap-[50px]">
                                <div className="col-start-1">
                                    <FormValidate 
                                        isValid={formValidator.email()}
                                        validate={validate}
                                        message={t('ui.profile-form.contact-email-validation')}
                                    >
                                        <FormText 
                                            placeholder={t('ui.profile-form.contact-email') + '*'}
                                            value={formData.email}
                                            onChange={({ target }) => setFormData({ ...formData, email: target.value })}
                                        />
                                    </FormValidate>
                                </div>
                                <div className="col-start-1">
                                    <FormValidate 
                                        isValid={formValidator.phone()}
                                        validate={validate}
                                        message={t('ui.profile-form.contact-phone-validation')}
                                    >
                                        <FormText 
                                            placeholder={t('ui.profile-form.contact-phone') + '*'}
                                            value={formData.phone}
                                            onChange={({ target }) => setFormData({ ...formData, phone: target.value })}
                                        />
                                    </FormValidate>
                                </div>
                                <div className="col-start-1">
                                    <FormValidate 
                                        isValid={formValidator.website()}
                                        validate={validate}
                                        message={t('ui.profile-form.contact-website-validation')}
                                    >
                                        <FormText 
                                            placeholder={t('ui.profile-form.contact-website')}
                                            value={formData.website}
                                            onChange={({ target }) => setFormData({ ...formData, website: target.value })}
                                        />
                                    </FormValidate>
                                </div>
                            </div>
                            <div className="form-heading pt-[25px] sm:pt-[50px]">
                                {t('ui.profile-form.planning-title')}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-[25px] sm:gap-[50px]">
                                <div className="col-start-1">
                                    <FormToggle 
                                        label={t('ui.profile-form.planning-same-time')}
                                        value={planningAll}
                                        onChange={() => setPlanningAll(!planningAll)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-[50px]">
                                <div className="flex flex-col gap-[30px] sm:px-[40px]">
                                    {weekDays.map((day, index) => (
                                        <div
                                            key={`form-planning-${index}`} 
                                            className="flex flex-wrap justify-end gap-x-[75px] gap-y-[15px]" style={{gridTemplateColumns: media.min('lg') ? '1fr auto auto auto auto auto auto auto' : '1fr auto auto auto'}}
                                        >
                                            <div 
                                                className={`flex-grow min-w-[150px] flex items-center gap-5${planningIsDisable(day) ? ' text-disabled' : ''}`} 
                                                onClick={() => !formData.planningDisabled && updatePlanning(day, { active: !formData.planning[day].active})}
                                            >
                                                <FormCheckbox 
                                                    value={formData.planning[day].active}
                                                    disabled={formData.planningDisabled}
                                                    onChange={() => updatePlanning(day, { active: !formData.planning[day].active})}
                                                />
                                                {t('ui.' + day)}
                                            </div>
                                            <div className="flex gap-[30px]">
                                                <input 
                                                    type="time" 
                                                    className="form-time"
                                                    disabled={planningIsDisable(day)}
                                                    value={formData.planning[day].morningFrom}
                                                    onChange={({ target }) => updatePlanning(day, { morningFrom: target.value })}
                                                />
                                                <div className={`flex justify-center items-center font-light${planningIsDisable(day) ? ' text-disabled' : ''}`}>
                                                {t('ui.profile-form.planning-to')}
                                                </div>
                                                <input 
                                                    type="time" 
                                                    className="form-time"
                                                    disabled={planningIsDisable(day)}
                                                    value={formData.planning[day].morningTo}
                                                    onChange={({ target }) => updatePlanning(day, { morningTo: target.value })}
                                                />
                                            </div>
                                            <div className="flex gap-[30px]">
                                                <input 
                                                    type="time" 
                                                    className="form-time"
                                                    disabled={planningIsDisable(day)}
                                                    value={formData.planning[day].eveningFrom}
                                                    onChange={({ target }) => updatePlanning(day, { eveningFrom: target.value })}
                                                />
                                                <div className={`flex justify-center items-center font-light${planningIsDisable(day) ? ' text-disabled' : ''}`}>
                                                    {t('ui.profile-form.planning-to')}
                                                </div>
                                                <input 
                                                    type="time" 
                                                    className="form-time"
                                                    disabled={planningIsDisable(day)}
                                                    value={formData.planning[day].eveningTo}
                                                    onChange={({ target }) => updatePlanning(day, { eveningTo: target.value })}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-submit sm:justify-end my-[50px]">
                                <button type="submit" className="btn btn-primary">{t('ui.profile-form.valid')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm