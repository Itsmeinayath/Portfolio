const Footer = () => {
    return (
        <section
            className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-600 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>
            <div className="social-icon">
                <a href="https://github.com/Itsmeinayath" rel="noopener noreferrer" target="_blank">
                    <img src="/assets/github.svg" alt="github" />
                </a>
            </div>
            <div className="social-icon">
                <a href="https://www.linkedin.com/in/its-me-mohammed-inayath" rel="noopener noreferrer" target="_blank">
                    <img src="/assets/linkedin.svg" alt="linkedin" />
                </a>
            </div>


            <p className="text-white-600">© 2024 Inayath.All right reserved</p>
        </section>
    )
}
export default Footer
