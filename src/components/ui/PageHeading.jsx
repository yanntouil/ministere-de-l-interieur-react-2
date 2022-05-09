




const PageHeading = ({ title, secondary, center = false }) => {
    return (
        <>
            <h1 className={`mb-6 font-black text-[35px] sm:text-[45px] lg:text-[55px] leading-[40px] sm:leading-[50px] lg:leading-[60px] text-secondary-500  ${center ? 'text-center' : ''}`}>
                {title}
            </h1>
            <p className={`text-stone-500 font-light sm:text-lg ${center ? 'text-center' : 'lg:max-w-[500px]'}`}>
                {secondary}
            </p>
        </>
    )
}
export default PageHeading