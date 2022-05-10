import { useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import businessProfiles from "../mock/businessProfiles"
import { useEffect } from "react"
import { disableBodyScroll, enableBodyScroll, clearScrollLocks } from "../app/helpers"
import { useOnClickOutside } from "../app/hooks"
import { 
    PageHeading,
    ProfileCard, ProfileForm, 
    Button, 
    Dialog, DialogBackdrop, DialogClose, DialogPannel
} from "../components/ui"

/**
 * Page Dashboard
 */
const Dashboard = () =>  {
    const { t } = useTranslation()
    
    /**
     * Add
     */
    const [ addForm, setAddForm ]  = useState(false)
    const addProfile = () => {
        setAddForm(true)
    }
    const saveAddProfile = (formData) => {
        setAddForm(false)
        console.log('profile added', formData);
    }
    
    /**
     * Edit
     */
    const [ editForm, setEditForm ]  = useState(false)
    const editProfile = (profile) => {
        setEditForm(profile)
    }
    const saveEditProfile = (formData) => {
        setEditForm(false)
        console.log('Profile update');
    }

    /**
     * Delete
     */
    const [ deleteValidation, setDeleteValidation ]  = useState(false)
    const deleteValidationRef = useRef(null)
    useOnClickOutside(deleteValidationRef, () => setDeleteValidation(false))
    const deleteProfile = (profile) => {
        setDeleteValidation(profile)
    }
    const confirmDelete = () => {
        setDeleteValidation(false)
    }
    
    useEffect(() => {
        if (editForm || addForm || deleteValidation) disableBodyScroll()
        else enableBodyScroll()
        return () => clearScrollLocks()
    }, [ editForm, addForm, deleteValidation ])

    /**
     * Render
     */
    return (
        <>
            <section className="container px-8 sm:px-0 mx-auto py-24">
                <PageHeading title={t('pages.dashboard.page-title')} secondary={t('pages.dashboard.page-secondary')} />
            </section>
            <section className="bg-white">
                <div className="container px-8 sm:px-0 mx-auto">
                    <div className="relative">
                        <Button onClick={() => addProfile()} className="absolute top-0 left-0 -translate-y-1/2">
                            {t('pages.dashboard.button-add')}
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 py-24 gap-12">
                        {businessProfiles.map((profile, index) => (
                            <ProfileCard
                                key={`profile-${profile.id}`}
                                profile={profile} 
                                actions
                                editProfile={editProfile}
                                deleteProfile={deleteProfile}
                            />
                        ))}
                    </div>    
                </div>
            </section>
            <Dialog onClose={() => setAddForm(false)} open={addForm}>
                <DialogBackdrop />
                <DialogPannel>
                    <DialogClose sr={t('ui.profile-form.close')} />
                    <ProfileForm 
                        close={() => setAddForm(false)}
                        save={saveAddProfile}
                    />
                </DialogPannel>
            </Dialog>
            <Dialog onClose={() => setEditForm(false)} open={editForm}>
                <DialogBackdrop />
                <DialogPannel>
                    <DialogClose sr={t('ui.profile-form.close')} />
                    <ProfileForm 
                        close={() => setEditForm(false)}
                        save={saveEditProfile}
                        profile={editForm}
                    />
                </DialogPannel>
            </Dialog>
            <Dialog OnClickOutside={() => setDeleteValidation(false)} open={deleteValidation}>
                <DialogBackdrop />
                <DialogPannel className="max-w-2xl bg-white flex flex-col items-center gap-12 px-12 py-12" center>
                    <div className="text-lg">
                        {t('pages.dashboard.delete-message')}
                    </div>
                    <div className="flex justify-end gap-[20px] sm:gap-[50px]">
                        <Button onClick={() => setDeleteValidation(false)} danger>
                            {t('pages.dashboard.delete-cancel')}
                        </Button>
                        <Button onClick={() => confirmDelete()}>
                            {t('pages.dashboard.delete-valid')}
                        </Button>
                    </div>
                </DialogPannel>
            </Dialog>
        </>
    )
}

export default Dashboard

