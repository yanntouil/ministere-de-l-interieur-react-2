import { weekDays } from "../../app/helpers"
import { useTranslation } from "react-i18next"
import { Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem } from "./Dropdown"

/**
 * ProfileCard
 */
const ProfileCard = ({ profile, editProfile, deleteProfile }) => {
    const { t } = useTranslation()
    const ranges = groupPlanningByRange(profile.planning)

    /**
     * Render
     */
    return (
        <article className="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row shadow-md bg-white">
            <div className="flex items-stretch aspect-video overflow-y-hidden w-full shrink-0 sm:aspect-auto sm:w-72 lg:aspect-video lg:w-full 2xl:aspect-auto 2xl:w-72">
                <img
                    src={profile.image} 
                    alt={profile.name} 
                    className="object-cover grow"
                />
            </div>
            <div className="relative grow pt-8 pb-6 px-8 font-light text-neutral-500">
                <div className="flex flex-col gap-1 mb-4">
                    <h2 className="text-[22px] font-medium text-neutral-800 pr-4">{profile.name}</h2>
                    <p className="font-light">{profile.address}</p>
                </div>
                <ul className="flex flex-col gap-2">
                    <li>
                        <span className="font-medium text-neutral-800 pr-3">{t('ui.profile-card.email')}&nbsp;:</span>
                        <a href={`mailto:${profile.email}`} className="inline-block">{profile.email}</a></li>
                    <li>
                        <span className="font-medium text-neutral-800 pr-3">{t('ui.profile-card.phone')}&nbsp;:</span>
                        <span className="inline-block">{profile.phone}</span>
                    </li>
                    <li className="flex flex-col gap-2">
                        <h3 className="font-medium text-neutral-800">{t('ui.profile-card.planning')}&nbsp;:</h3>
                        <ul className="flex flex-col gap-1">
                            {ranges.map((range, index) => (
                                <li key={`profile-${profile.id}-planning-${index}`}>
                                    <span className="pr-3">
                                        { range.length > 1 ? `${t('ui.' + range[0])} ${t('ui.profile-card.to')} ${t('ui.' + range[range.length - 1])}` : t('ui.' + range[0]) }&nbsp;:
                                    </span>
                                    <span className="inline-block">
                                        {shiftIsNull(range[0], profile, 'morning') ? '' : `${profile.planning[range[0]].morningFrom} - ${profile.planning[range[0]].morningTo}`}
                                        {!shiftIsNull(range[0], profile, 'morning') && !shiftIsNull(range[0], profile, 'evening') ? ` ${t('ui.profile-card.and')} ` : ''}
                                        {shiftIsNull(range[0], profile, 'evening') ? '' : `${profile.planning[range[0]].eveningFrom} - ${profile.planning[range[0]].eveningTo}`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <Dropdown className="absolute top-7 right-2">
                    <DropdownButton>
                        <svg className="w-6 h-6 fill-current rotate-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="fill-current" d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" fill="#292D32"/><path className="fill-current" d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" fill="#292D32"/><path className="fill-current" d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#292D32"/></svg>
                        <span className="sr-only">{t('ui.profile-card.more')}</span>
                    </DropdownButton>
                    <DropdownMenu>
                        <DropdownMenuItem onClick={() => editProfile(profile)} className="flex gap-4 text-[#ACACAC]">
                            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z" stroke="#ACACAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="#ACACAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M3 22H21" stroke="#ACACAC" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {t('ui.profile-card.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteProfile(profile)} className="flex gap-4 text-secondary-500">
                            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="stroke-current" d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#EE7326" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#EE7326" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="stroke-current" d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="#EE7326" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {t('ui.profile-card.delete')}
                        </DropdownMenuItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </article>
    )
}
export default ProfileCard


/**
 * Component Helpers
 */
const shiftIsNull = (day, profile, shift) => (
    profile.planning[day][shift + 'From'] === profile.planning[day][shift + 'To'] && 
    profile.planning[day][shift + 'From'] === '00:00'
)
const groupPlanningByRange = (planning) => {
    const ranges = []
    let tempRange = []
    weekDays.forEach(day => {
        if (planning[day].active) {
            if (tempRange.length > 0) {
                if ( JSON.stringify(planning[tempRange[0]]) === JSON.stringify(planning[day]) ) {
                    tempRange.push(day)
                } else {
                    ranges.push(tempRange)
                    tempRange = [ day ]
                }
            } else {
                tempRange.push(day)
            }
        }
    })
    ranges.push(tempRange)
    return ranges
}
 