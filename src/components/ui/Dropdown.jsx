import { createContext, useContext, useRef, useState } from "react";
import { useOnClickOutside } from "../../app/hooks";





/**
 * Context
 */
const DropdownContext = createContext();

/**
 * Dropdown
 */
const Dropdown = ({ children, className }) => {
    const [ open, setOpen ] = useState(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    return (
        <DropdownContext.Provider value={{ open, onClose, onOpen }}>
            <div className={`${className ? className : 'relative'}`}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

/**
 * Dropdown menu
 */
 const DropdownButton = ({ children, className }) => {
    const { open, onOpen, onClose } = useContext(DropdownContext)
    return (
        <button className={className} onClick={() => open ? onClose() : onOpen()}>
            {children}
        </button>
    )
}


/**
 * Dropdown menu
 */
const DropdownMenu = ({ children, className }) => {
    const { open, onClose } = useContext(DropdownContext)
    const dropdownMenuRef = useRef(null)
    useOnClickOutside(dropdownMenuRef, onClose)
    return open ? (
        <ul ref={dropdownMenuRef} className={`absolute top-0 right-0 flex flex-col gap-4 p-4 bg-white shadow-md ${className}`}>
            {children}
        </ul>
    ) : <></>
}

/**
 * Dropdown item
 */
const DropdownMenuItem = ({ children, onClick, className }) => {
    const { onClose } = useContext(DropdownContext)
    const handleClick = () => {
        onClose()
        onClick()
    }
    return (
        <li>
            <button onClick={handleClick} className={`flex gap-4 text-secondary-500 ${className}`}>
                {children}
            </button>
        </li>
    )
}

export { Dropdown, DropdownMenu, DropdownMenuItem, DropdownButton }