import {useRef, useState} from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = ({target: {name, value}}) => {
        setForm({...form, [name]: value})
    }

    // service_njv1d7t

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
           await emailjs.send('service_njv1d7t',
                'template_h82zn3v',
                {
                    from_name: form.name,
                    to_name: 'Inayath',
                    from_email: form.email,
                    to_email: 'itsmemohammed@gmail.com',
                    message: form.message
                },
               '2FpKSWlNQKbKzF0yk'
            )
            setLoading(false)
            alert("your Message has been sent successfully")

        }
        catch (error) {
            setLoading(false);
            console.log(error);
            alert("Something went wrong")
        }



    }


    return (
        <section id = "contact" className="c-space my-20">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen"/>
<br/>
                <div className="contact-container">
                    <br />
                    <h3 className="head-text">Let's talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Whether you're looking to build a new website,improve your existing platform, or bring a unique
                        project to Life, I'm here to help.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">
                                Full Name
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder={"John Doe"}
                            />
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">
                                Email
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder={"johndoe@gmail.com"}
                            />
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">
                                Your Message
                            </span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder={"Hi ,I'm interested in..."}
                            />
                        </label>
                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'sending...' : 'send Message'}
                            <img src="/assets/arrow-up.png" alt={"arrow-up"} className="field-btn_arrow"/>
                        </button>

                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
