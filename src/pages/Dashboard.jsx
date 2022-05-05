import { useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import businessProfiles from "../mock/businessProfiles"
import { ProfileCard,  ProfileForm} from "../components/ui"
import { useEffect } from "react"
import { disableBodyScroll, enableBodyScroll, clearScrollLocks } from "../app/helpers"
import { useOnClickOutside } from "../app/hooks"


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
        <div className="page-dashboard">
            <div className="container-2xl">
                <div className="page-header">
                    <h1 className="page-header-title">
                        {t('pages.dashboard.page-title')}
                    </h1>
                    <p className="page-header-secondary">
                        {t('pages.dashboard.page-secondary')}
                    </p>
                </div>
            </div>
            <div className="bg-white">
                <div className="container-2xl relative">
                    <div className="page-action">
                        <button 
                            className="btn btn-primary"
                            onClick={() => addProfile()}
                        >
                            {t('pages.dashboard.button-add')}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 py-[100px] gap-[50px]">
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
            </div>
            {addForm && (
                <ProfileForm 
                    close={() => setAddForm(false)}
                    save={saveAddProfile}
                />
            )}
            {editForm && (
                <ProfileForm 
                    close={() => setEditForm(false)}
                    save={saveEditProfile}
                    profile={editForm}
                />
            )}
            {deleteValidation && (
                <>
                    <div className="fixed inset-0 bg-black/60" />
                    <div className="fixed inset-0 flex justify-center items-center">
                        <div 
                            className="flex flex-col max-w-2xl bg-white shadow m-[20px] sm:m-[50px] p-[20px] sm:p-[50px] gap-[20px] sm:gap-[50px]"
                            ref={deleteValidationRef}   
                        >
                            <div className="text-lg">
                                {t('pages.dashboard.delete-message')}
                            </div>
                            <div className="flex justify-end gap-[20px] sm:gap-[50px]">
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => setDeleteValidation(false)}
                                >
                                    {t('pages.dashboard.delete-cancel')}
                                </button>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => confirmDelete()}
                                >
                                    {t('pages.dashboard.delete-valid')}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard

