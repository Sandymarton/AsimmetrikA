import GlowButton from './GlowButton';

export default function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
    const isDark = theme === "dark";

    return (
        <footer
            id="contact"
            className={`w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 transition-colors duration-700 ${isDark ? 'bg-black text-white' : 'bg-transparent text-black'}`}
            data-theme={isDark ? undefined : "light"}
        >
            <div className={`max-w-[1800px] mx-auto border-t pt-16 md:pt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>

                <div className="flex flex-col gap-6">
                    <div
                        style={{
                            display: 'inline-block',
                            background: '#0d0d0d',
                            borderRadius: '12px',
                            padding: '0.5em 0.75em',
                            boxShadow: `
                                0 0 20px rgba(0, 146, 70, 0.35),
                                0 0 50px rgba(0, 146, 70, 0.15),
                                0 0 20px rgba(206, 43, 55, 0.35),
                                0 0 50px rgba(206, 43, 55, 0.15),
                                inset 0 1px 0 rgba(255,255,255,0.06)
                            `,
                        }}
                    >
                        <h2
                            className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tighter uppercase leading-none"
                            style={{
                                background: 'linear-gradient(to right, #009246 0%, #009246 33%, #ffffff 33%, #ffffff 66%, #CE2B37 66%, #CE2B37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            AsimmetrikA
                        </h2>
                    </div>
                    <a
                        href="mailto:contact@asimmetrika.co.uk"
                        className={`text-lg md:text-xl font-light transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
                    >
                        contact@asimmetrika.co.uk
                    </a>
                    <div className="mt-4">
                        <GlowButton href="https://calendly.com/fsquaredfrancone/asimmetrika-consultation">BOOK A FREE CONSULTATION</GlowButton>
                    </div>
                </div>

                <div className={`flex flex-col justify-end text-sm md:text-base font-light tracking-widest uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    <p>&copy; {new Date().getFullYear()} AsimmetrikA.</p>
                    <p>All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}
