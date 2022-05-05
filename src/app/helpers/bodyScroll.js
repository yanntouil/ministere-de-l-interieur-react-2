import { disableBodyScroll as disableScroll, enableBodyScroll as enableScroll, clearAllBodyScrollLocks as clearLocks } from 'body-scroll-lock'
import { isServer } from './serverSideRendering'







const disableBodyScroll = () => {
    if (isServer()) return
    document.body.style.width = document.body.clientWidth + 'px'
    disableScroll(document.body)
}



const enableBodyScroll = () => {
    if (isServer()) return
    document.body.style.width = ''
    enableScroll(document.body)
}



const clearScrollLocks = () => {
    if (isServer()) return
    document.body.style.width = ''
    clearLocks()
}



export { disableBodyScroll, enableBodyScroll, clearScrollLocks }