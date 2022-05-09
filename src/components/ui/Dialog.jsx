import { createContext, useContext, useRef } from "react"
import { useOnClickOutside } from "../../app/hooks"
import { ButtonIcon } from "./Button"


/**
 * Context
 */
const DialogContext = createContext()

/**
 * Dialog wrapper
 */
const Dialog = ({ children, onClose = () => false, open, OnClickOutside = () => false }) => {
    return open ? (
        <DialogContext.Provider value={{ open, onClose, OnClickOutside }}>
            <div className={`fixed inset-0 z-50`}>
                {children}
            </div>
        </DialogContext.Provider>
    ) : <></>
}

/**
 * Dialog backdrop
 */
const DialogBackdrop = () => {
    return (
        <div className="fixed inset-0 bg-black/60" />
    )
}

/**
 * Dialog close button
 */
const DialogClose = ({ sr }) => {
    const { onClose } = useContext(DialogContext)
    return (
        <div className="relative">
            <ButtonIcon className="absolute top-12 right-12" onClick={onClose}>
                <svg aria-hidden="true" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M315.31 411.31C309.056 417.563 298.936 417.563 292.682 411.31L160 278.627L27.318 411.31C21.064 417.563 10.944 417.563 4.69 411.31C-1.563 405.056 -1.563 394.936 4.69 388.682L137.373 256L4.69 123.318C-1.563 117.064 -1.563 106.944 4.69 100.69C10.944 94.437 21.064 94.437 27.318 100.69L160 233.373L292.682 100.69C298.936 94.437 309.056 94.437 315.31 100.69C321.563 106.944 321.563 117.064 315.31 123.318L182.627 256L315.31 388.682C321.563 394.936 321.563 405.056 315.31 411.31Z"/></svg>                        
                {sr && (<span className="sr-only">{sr}</span>)}
            </ButtonIcon>
        </div>
    )
}

/**
 * Dialog pannel
 */
const DialogPannel = ({ children, className, center = false }) => {

    const { OnClickOutside } = useContext(DialogContext)
    const pannelRef = useRef(null)
    useOnClickOutside(pannelRef, OnClickOutside)

    return (
        <div className={`absolute inset-0 overflow-y-auto flex justify-center ${center ? 'items-center' : 'items-start'}`}>
            <div ref={pannelRef}
                className={`relative w-full mx-auto px-0 sm:px-10 xl:px-12 2xl:px-0 py-0 sm:py-12 ${className ? className : 'container'}`}
            >
                {children}
            </div>
        </div>
    )
}



export { Dialog, DialogBackdrop, DialogClose, DialogPannel }




