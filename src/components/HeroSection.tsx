"use client";

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const MagneticText = ({ text }: { text: string }) => {
    return (
        <span className="inline-flex flex-wrap">
            {text.split(' ').map((word, i) => (
                <span key={i} className="inline-block relative" style={{ marginRight: '0.25em', marginBottom: '0.1em' }}>
                    <span
                        className="inline-block magnetic-word will-change-transform"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Function to run the hero animations
        const initHeroAnimations = () => {
            // --- 1. Hero Title (About Us style staggered 3D blur from right) ---
            const titleLines = gsap.utils.toArray<HTMLElement>('.hero-title-line span.block');
            gsap.fromTo(titleLines,
                {
                    x: 150,
                    opacity: 0,
                    rotateY: -30,
                    filter: "blur(12px)"
                },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    filter: "blur(0px)",
                    duration: 1.8,
                    stagger: 0.2,
                    ease: "power4.out",
                    delay: 0.2
                }
            );

            // --- 2. Hero Paragraphs (Team section magnetic assemble style) ---
            const magneticContainers = gsap.utils.toArray<HTMLElement>('.hero-desc .magnetic-container');
            magneticContainers.forEach((container, index) => {
                const words = container.querySelectorAll('.magnetic-word');
                gsap.fromTo(words,
                    {
                        opacity: 0,
                        x: () => gsap.utils.random(-100, 100),
                        y: () => gsap.utils.random(-100, 100),
                        z: () => gsap.utils.random(-200, 200),
                        rotation: () => gsap.utils.random(-30, 30),
                        rotationX: () => gsap.utils.random(-40, 40),
                        rotationY: () => gsap.utils.random(-40, 40),
                        filter: "blur(15px)",
                        scale: () => gsap.utils.random(0.4, 1.6)
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        z: 0,
                        rotation: 0,
                        rotationX: 0,
                        rotationY: 0,
                        filter: "blur(0px)",
                        scale: 1,
                        duration: 2.5,
                        stagger: {
                            amount: 1.5,
                            from: "random"
                        },
                        ease: "expo.out",
                        delay: 0.6 + (index * 0.3)
                    }
                );
            });

            // --- 3. Hero Image Fade in ---
            gsap.fromTo(".hero-image-wrapper", {
                scale: 1.05,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.8
            });
        };

        // Set all hero elements invisible immediately only if preloader is running
        // (skip if preloader already completed — e.g. back navigation)
        const preloaderAlreadyDone = (window as Window & { __preloaderDone?: boolean }).__preloaderDone;
        if (!preloaderAlreadyDone) {
            gsap.set('.hero-title-line span.block', { opacity: 0 });
            gsap.set('.hero-desc .magnetic-word', { opacity: 0 });
            gsap.set('.hero-image-wrapper', { opacity: 0 });
        }

        let fired = false;

        const onPreloaderComplete = () => {
            if (!fired) {
                fired = true;
                initHeroAnimations();
            }
        };

        document.addEventListener('preloaderComplete', onPreloaderComplete);

        // Race-condition safety: if preloader already fired before this listener was added
        if (preloaderAlreadyDone) {
            onPreloaderComplete();
        }

        // Cleanup
        return () => {
            document.removeEventListener('preloaderComplete', onPreloaderComplete);
        };

    }, { scope: containerRef });

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax on the image relative to scroll
        gsap.to(".hero-image", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Overlap effect: text translates up and fades out, overlay darkens
        gsap.to(".hero-text-container", {
            y: -150,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=80%",
                scrub: true
            }
        });

        gsap.to(".hero-overlay", {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="home"
            className="sticky top-0 z-[1] h-screen flex flex-col overflow-hidden"
            data-theme="light"
        >
            {/* Fullscreen video background */}
            <div className="hero-image-wrapper absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="hero-image absolute inset-0 w-full h-full object-cover"
                    src="/Video/Video_Pronto_Link_Fornito.mp4"
                />
                {/* Gradient: clear top → heavy dark bottom so text pops */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />
                {/* Additional darkening overlay for scrolling down */}
                <div className="hero-overlay absolute inset-0 bg-black opacity-0" />
            </div>

            {/* All text content — starts just below the header/logo */}
            <div className="hero-text-container absolute top-[185px] left-0 right-0 z-10 px-6 md:px-12 lg:px-24 pb-10">
                <div className="max-w-[1800px] mx-auto">

                    <h1 className="hero-text-glow text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-medium leading-[1.05] tracking-tight mb-6 text-white" style={{ perspective: "1000px" }}>
                        <div className="hero-title-line pb-1" style={{ transformStyle: 'preserve-3d' }}>
                            <span className="block will-change-transform">Excellence is</span>
                        </div>
                        <div className="hero-title-line pb-1" style={{ transformStyle: 'preserve-3d' }}>
                            <span className="block will-change-transform">not an act,</span>
                        </div>
                        <div className="hero-title-line pb-1 italic font-light text-white/60" style={{ transformStyle: 'preserve-3d' }}>
                            <span className="block will-change-transform">but a habit.</span>
                        </div>
                    </h1>

                    <div className="hero-desc hero-desc-glow max-w-lg text-base md:text-lg text-white/80 font-light leading-relaxed space-y-3">
                        <p className="magnetic-container" style={{ perspective: "1000px" }}>
                            <MagneticText text="We are passionate about design & build, and our commitment to outstanding results drives us in everything we do. Through careful planning, efficient processes, and a dedication to detail, we help shape our clients' visions into reality." />
                        </p>
                        <p className="magnetic-container" style={{ perspective: "1000px" }}>
                            <MagneticText text="We aim for seamless project delivery and to be a trusted partner in achieving your strategic goals, ensuring peace of mind throughout the construction journey. We are here to bring it to life with precision and care." />
                        </p>
                    </div>

                </div>
            </div>

            {/* Subtle grain overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </section>
    );
}
