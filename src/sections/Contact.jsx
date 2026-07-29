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
            setForm({name: '', email: '', message: ''}) // Reset form
            alert("Your message has been sent successfully. I will get back to you soon!")
        }
        catch (error) {
            setLoading(false);
            console.log(error);
            alert("Something went wrong with the system network. Please try again.")
        }
    }

    return (
        <section id="contact" className="c-space my-20">
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-mono text-emerald-400 text-sm tracking-widest uppercase">~/portfolio/contact</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter">Establish Connection</h2>
            </div>

            <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
                {/* Glassmorphism Background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

                {/* OS Window Header */}
                <div className="h-12 bg-[#050505] border-b border-white/10 flex items-center px-4 gap-2 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <p className="ml-2 font-mono text-xs text-zinc-500">bash - establish_connection.sh</p>
                </div>

                {/* Form Container */}
                <div className="p-6 sm:p-12 relative z-10">
                    <div className="mb-10">
                        <p className="font-mono text-sm text-zinc-400 mb-2">
                            <span className="text-emerald-500">root@system</span>:<span className="text-blue-400">~/contact</span>$ ./initiate_handshake
                        </p>
                        <p className="text-zinc-300 font-mono text-sm leading-relaxed">
                            System ready. Whether you're looking to build a new architecture, improve an existing platform, or bring a unique project to life, I'm here to help. Open a secure channel below.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-3">
                                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Client.Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-[#050505] border border-white/10 rounded-lg font-mono text-zinc-300 px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    placeholder="Enter your name..."
                                />
                            </label>
                            
                            <label className="flex flex-col gap-3">
                                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Client.Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="bg-[#050505] border border-white/10 rounded-lg font-mono text-zinc-300 px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    placeholder="Enter your email..."
                                />
                            </label>
                        </div>

                        <label className="flex flex-col gap-3">
                            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Payload.Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="bg-[#050505] border border-white/10 rounded-lg font-mono text-zinc-300 px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                                placeholder="Initialize transmission..."
                            />
                        </label>

                        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-6">
                            <p className="font-mono text-xs text-zinc-600 hidden sm:block">
                                ENCRYPTION: <span className="text-emerald-500/50">ACTIVE</span> | STATUS: {loading ? <span className="text-yellow-500 animate-pulse">TRANSMITTING...</span> : <span className="text-zinc-500">AWAITING INPUT</span>}
                            </p>
                            
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-8 py-3 rounded-lg font-mono text-sm hover:bg-emerald-500/20 transition-colors disabled:opacity-50 w-full sm:w-auto justify-center"
                            >
                                {loading ? 'Sending...' : '[ Transmit Message ]'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
