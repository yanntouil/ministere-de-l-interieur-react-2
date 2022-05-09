

/*
    height: var(--form-height);
    flex-shrink: 0;
    padding: 0 var(--button-padding);
    font-weight: 600;
    transition: background-color 200ms ease-in-out;
    &-danger {
        background-color: $secondary-500;
        color: $white;
        &:hover {
            background-color: darken($secondary-500, 10%);
        }
    }
    &-primary {
        background-color: $primary-500;
        color: $white;
        &:hover {
            background-color: $primary-600;
        }
    }
    &-icon {
        justify-content: center; align-items: center;
        width: var(--form-height);
        padding: 0;
    }




*/


const Button = ({ children, onClick, type = 'button', danger = false, className = '' }) => {
    return (
        <button 
            className={`flex items-center h-16 sm:h-18 xl:h-20 shrink-0 px-8 sm:px-10 xl:px-12 font-semibold transition-colors duration-300 ease-in-out ${
                danger ? 'bg-secondary-500 hover:bg-secondary-600 text-white' :
                'bg-primary-500 hover:bg-primary-600 text-white'
            } ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )

}
const ButtonIcon = ({ children, onClick, danger = false, className = '' }) => {
    return (
        <button 
            className={`flex justify-center items-center h-16 sm:h-18 xl:h-20 aspect-square shrink-0  transition-colors duration-300 ease-in-out ${
                danger ? 'bg-secondary-500 hover:bg-secondary-600 text-white' :
                'bg-primary-500 hover:bg-primary-600 text-white'
            } ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )

}

export { Button, ButtonIcon }