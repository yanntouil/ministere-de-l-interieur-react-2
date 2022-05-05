import { weekDays } from "../../app/helpers"
import { useTranslation } from "react-i18next"









const ProfileCardHome = ({ profile, }) => {
    const { t } = useTranslation()

    /**
     * Planning range
     */
    const ranges = groupPlanningByRange(profile.planning)

    /**
     * Render
     */
    return (
        <article className="grid grid-cols-1 lg:grid-cols-1 xl:grid-flow-col xl:grid-cols-auto bg-white shadow-md">
            <div className="aspect-video lg:aspect-video xl:aspect-auto">
                <img
                    src={profile.image} 
                    alt={profile.name} 
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="relative w-[48rem] xl:w-[24rem] 2xl:w-[29rem] py-6 xl:py-2 px-8 font-light text-neutral-500">
                <div className="flex flex-col gap-1 mb-4">
                    <h2 className="text-[22px] font-medium text-neutral-800 pr-4">{profile.name}</h2>
                    <p className="font-light">
                        {profile.address}
                    </p>
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
                                        { range.length > 1 ? `${t('ui.' + range[0])} à ${t('ui.' + range[range.length - 1])}` : t('ui.' + range[0]) }&nbsp;:
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
            </div>
        </article>
    )
}
export default ProfileCardHome


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
 