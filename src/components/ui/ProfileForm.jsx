import { useState } from 'react'
import validator from 'validator'
import { useMedia } from '../../app/hooks'
import { weekDays } from "../../app/helpers"
import { FormCheckbox, FormText, FormToggle, FormValidate, FormAddressAutocomplete } from './'
import { useTranslation } from 'react-i18next'
import PageHeading from './PageHeading'
import FormHeading from './FormHeading'
import FormTime from './FormTime'
import { Button } from './Button'




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
    const updatePlanning = (day, data, disable = false) => {
        const newFormData = { ...formData }
        if (planningAll && !disable) weekDays.forEach(weekday => newFormData.planning[weekday] = { ...newFormData.planning[weekday], ...data})
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
        <>
            <section className="bg-background py-20 sm:py-24 px-8 sm:px-12">
                <PageHeading title={(
                    <>
                        {t('ui.profile-form.title-1')} <span className="page-header-highlight">{t('ui.profile-form.title-2')}</span><br />
                        {t('ui.profile-form.title-3')}
                    </>
                )} secondary={t('ui.profile-form.secondary')} />
            </section>
            <section className="bg-white px-8 sm:px-12">
                <form className="relative flex flex-col pt-20 sm:pt-24 pb-8 sm:pb-12 gap-10 sm:gap-12" onSubmit={onSubmit}>
                    <span className="absolute top-0 left-0 -translate-y-1/2 flex justify-center items-center h-16 sm:h-18 xl:h-20 aspect-square shrink-0 bg-primary-500 text-white" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><g transform="translate(213 -620) rotate(90)"><g transform="translate(620 188)"><path className="stroke-current" d="M0,0,6.323,6.323,0,12.646" transform="translate(15.031 6.177)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/><path className="stroke-current" d="M0,0H17.531" transform="translate(3.646 12.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/><path className="stroke-current" d="M0,0H25V25H0Z" transform="translate(25 25) rotate(180)" fill="none" opacity="0"/></g></g></svg>
                    </span>
                    <FormHeading>{t('ui.profile-form.business-title')}</FormHeading>
                    <FormValidate isValid={formValidator.name()} validate={validate} message={t('ui.profile-form.business-name-validation')}>
                        <FormText 
                            placeholder={t('ui.profile-form.business-name') + '*'}
                            value={formData.name}
                            setValue={(value) => setFormData({ ...formData, name: value })}
                        />
                    </FormValidate>
                    <FormValidate isValid={formValidator.address()} validate={validate} message={t('ui.profile-form.business-address-validation')}>
                        <FormAddressAutocomplete 
                            placeholder={t('ui.profile-form.business-address') + '*'}
                            value={formData.address}
                            setValue={(address, coordinates) => setFormData({ ...formData, address, coordinates })}
                        />
                    </FormValidate>
                    <FormHeading className="pt-8 sm:pt-12">{t('ui.profile-form.contact-title')}</FormHeading>
                    <FormValidate isValid={formValidator.email()} validate={validate} message={t('ui.profile-form.contact-email-validation')}>
                        <FormText 
                            placeholder={t('ui.profile-form.contact-email') + '*'}
                            value={formData.email}
                            setValue={(value) => setFormData({ ...formData, email: value })}
                        />
                    </FormValidate>
                    <FormValidate isValid={formValidator.phone()} validate={validate} message={t('ui.profile-form.contact-phone-validation')}>
                        <FormText 
                            placeholder={t('ui.profile-form.contact-phone') + '*'}
                            value={formData.phone}
                            setValue={(value) => setFormData({ ...formData, phone: value })}
                        />
                    </FormValidate>
                    <FormValidate isValid={formValidator.website()} validate={validate} message={t('ui.profile-form.contact-website-validation')}>
                        <FormText 
                            placeholder={t('ui.profile-form.contact-website')}
                            value={formData.website}
                            setValue={(value) => setFormData({ ...formData, website: value })}
                        />
                    </FormValidate>
                    <FormHeading className="pt-6 sm:pt-12">{t('ui.profile-form.planning-title')}</FormHeading>
                    <FormToggle 
                        label={t('ui.profile-form.planning-same-time')}
                        value={planningAll}
                        onChange={() => setPlanningAll(!planningAll)}
                    />
                    <div className="flex flex-col gap-12 sm:px-10">
                        {weekDays.map((day, index) => (
                            <div className="flex justify-end flex-wrap gap-x-12 gap-y-6" key={`planning-${index}`}>
                                <label className="flex items-center min-w-[200px] grow gap-5">
                                    <FormCheckbox 
                                        value={formData.planning[day].active}
                                        disabled={formData.planningDisabled}
                                        onChange={() => updatePlanning(day, { active: !formData.planning[day].active}, true)}
                                    />
                                    {t('ui.' + day)}
                                </label>
                                <div className={`flex items-center gap-8 font-light ${planningIsDisable(day) ? ' text-neutral-400' : ''}`}>
                                    <FormTime 
                                        disabled={planningIsDisable(day)}
                                        value={formData.planning[day].morningFrom}
                                        onChange={(value) => updatePlanning(day, { morningFrom: value })}
                                    />
                                    {t('ui.profile-form.planning-to')}
                                    <FormTime 
                                        disabled={planningIsDisable(day)}
                                        value={formData.planning[day].morningTo}
                                        onChange={(value) => updatePlanning(day, { morningTo: value })}
                                    />
                                </div>
                                <div className={`flex items-center gap-8 font-light ${planningIsDisable(day) ? ' text-neutral-400' : ''}`}>
                                    <FormTime 
                                        disabled={planningIsDisable(day)}
                                        value={formData.planning[day].eveningFrom}
                                        onChange={(value) => updatePlanning(day, { eveningFrom: value })}
                                    />
                                    {t('ui.profile-form.planning-to')}
                                    <FormTime 
                                        disabled={planningIsDisable(day)}
                                        value={formData.planning[day].eveningTo}
                                        onChange={(value) => updatePlanning(day, { eveningTo: value })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="form-submit sm:justify-end mt-12">
                        <Button type="submit">{t('ui.profile-form.valid')}</Button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ProfileForm