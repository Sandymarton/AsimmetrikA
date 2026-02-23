"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import GlowButton from './GlowButton';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Elegant 3D Parallax & Rotation of Architectural Wireframes
        if (gridRef.current) {
            const frames = gridRef.current.children;
            gsap.to(frames, {
                rotationZ: "+=30",
                rotationX: "+=15",
                rotationY: "+=20",
                scale: 1.1,
                yPercent: -15,
                duration: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1, // Smooth scrub
                }
            });
        }

        // Premium Fade & Slide Left Text Reveal (da destra verso sinistra)
        const paragraphs = gsap.utils.toArray<HTMLElement>('.about-text-stagger');
        paragraphs.forEach((paragraph) => {
            // Seleziona i figli "block" (se ci sono, come i titoli) per fare uno stagger interno
            const children = gsap.utils.toArray<HTMLElement>(paragraph.querySelectorAll('span.block'));

            if (children.length > 0) {
                // Anima i singoli blocchi del titolo
                gsap.fromTo(children,
                    {
                        x: 150, // Parte da destra
                        opacity: 0,
                        rotateY: -30, // Effetto 3D rotazione
                        filter: "blur(12px)",
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        filter: "blur(0px)",
                        duration: 1.8,
                        stagger: 0.2, // Testo animato in successione!
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: paragraph,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                // Evita di animare pure il contenitore per non sovrapporre
                gsap.set(paragraph, { opacity: 1 });
            } else {
                // Anima i paragrafi normali da destra
                gsap.fromTo(paragraph,
                    {
                        x: 100, // Parte da destra
                        opacity: 0,
                        rotation: 2, // Leggero twist dinamico
                        scale: 0.96,
                        filter: "blur(10px)",
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotation: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 2.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: paragraph,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Left Column Images Reveal (da sinistra a destra)
        const leftImages = gsap.utils.toArray<HTMLElement>('.about-image-left');
        leftImages.forEach((img) => {
            gsap.fromTo(img,
                {
                    x: -150,
                    opacity: 0,
                    rotationY: 15,
                    filter: "blur(10px)",
                    scale: 0.95
                },
                {
                    x: 0,
                    opacity: 1,
                    rotationY: 0,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 1.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Internal Parallax for images
            const imgElement = img.querySelector('img');
            if (imgElement) {
                gsap.fromTo(imgElement,
                    { scale: 1.15 },
                    {
                        scale: 1,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: img,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative z-[2] bg-black text-white py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden"
            data-theme="dark"
        >
            {/* Premium 3D Architectural / Geometric Wireframe Background */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                {/* A glowing subtle gradient blob to illuminate the shapes */}
                <div className="absolute top-[30%] right-[15%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />

                <div
                    ref={gridRef}
                    className="fixed top-1/2 left-[75%] md:left-[80%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] -mt-[300px] md:-mt-[400px] -ml-[300px] md:-ml-[400px] opacity-40"
                    style={{ perspective: "1000px", transformStyle: "preserve-3d", zIndex: -1 }}
                >
                    {/* Frame 1 */}
                    <div className="absolute inset-0 border border-white/50 rotate-[15deg] scale-110" style={{ transformStyle: "preserve-3d" }}></div>
                    {/* Frame 2 - Thick Accent */}
                    <div className="absolute inset-8 border-[2px] border-white/60 rotate-[30deg]" style={{ transformStyle: "preserve-3d", transform: "translateZ(-50px)" }}></div>
                    {/* Frame 3 */}
                    <div className="absolute inset-16 border border-white/30 rotate-[45deg] scale-90" style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}></div>
                    {/* Frame 4 */}
                    <div className="absolute inset-24 border border-zinc-500/50 rotate-[60deg] scale-125" style={{ transformStyle: "preserve-3d", transform: "translateZ(100px)" }}></div>
                    {/* Diagonal cross architectural strut */}
                    <div className="absolute w-[150%] h-[1px] bg-white/40 top-1/2 -left-[25%] rotate-45" style={{ transformStyle: "preserve-3d" }}></div>
                </div>
            </div>


            {/* Content Container */}
            <div className="relative z-10 max-w-[1800px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">

                {/* Left Column Images & Heading */}
                <div className="xl:col-span-5 relative flex flex-col gap-16 xl:gap-24 pt-[15vh] xl:pt-0">
                    <div className="max-w-[600px]">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter uppercase leading-[0.9] about-text-stagger mb-16">
                            <span className="block text-zinc-400 italic font-light mb-2">Introducing</span>
                            <span className="block">AsimmetrikA</span>
                        </h2>

                        {/* First Image */}
                        <div className="about-image-left relative mt-16 w-full aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1475&auto=format&fit=crop"
                                alt="Modern Architectural Villa Exterior"
                                className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]"
                            />
                        </div>
                    </div>

                    {/* Second Image - Trulli */}
                    <div className="about-image-left relative w-full aspect-[4/5] overflow-hidden max-w-[600px] rounded-sm shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/trulli_puglia.png"
                            alt="Renovated Trulli in Alberobello"
                            className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.1]"
                        />
                    </div>

                    {/* Third Image - Masseria */}
                    <div className="about-image-left relative w-full aspect-[4/5] overflow-hidden max-w-[600px] mb-24 rounded-sm shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/masseria_pool.png"
                            alt="Luxurious Masseria with pool"
                            className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.1]"
                        />
                    </div>
                </div>

                {/* Flowing Text Content divided into 3 distinct sections spreading over scroll */}
                <div className="xl:col-span-7 flex flex-col text-xl md:text-3xl lg:text-4xl leading-relaxed font-light text-zinc-300">

                    {/* PART 1 */}
                    <div className="min-h-[50vh] flex flex-col justify-center gap-16 pt-24 xl:pt-[25vh]">
                        <p className="about-text-stagger text-white font-normal block pl-2 py-2">
                            Italian Excellence in Concept, Design &amp; Construction
                        </p>

                        <p className="about-text-stagger block pl-2 py-2">
                            AsimmetrikA represents the pinnacle of Italian design and craftsmanship. We are a collective of visionary architects, creative designers, innovative engineers, and skilled builders dedicated to turning your ideas into timeless works of art.
                        </p>
                    </div>

                    {/* PART 2 */}
                    <div className="min-h-[60vh] flex flex-col justify-center gap-16 mt-32">
                        <p className="about-text-stagger block pl-2 py-2">
                            With our comprehensive 360° service, we guide every project from the initial spark of concept through detailed planning to flawless construction and final execution. Rooted in Italy&apos;s illustrious design heritage, our approach seamlessly fuses modern innovation with time-honored artisanal expertise.
                        </p>

                        <p className="about-text-stagger block pl-2 py-2">
                            We take pride in understanding your unique vision, meticulously curating every detail to transform dreams into reality. Whether you envision a bespoke residence or a state-of-the-art commercial space, our team ensures that every element reflects the sophistication synonymous with Italian excellence.
                        </p>
                    </div>

                    {/* PART 3 */}
                    <div className="min-h-[60vh] flex flex-col justify-center gap-16 mt-32 mb-[20vh]">
                        <p className="about-text-stagger block pl-2 py-2">
                            Our process is built on transparency, collaboration, and an unwavering commitment to quality. We leverage premium materials, cutting-edge technology, and sustainable practices to create spaces that are both functionally superior and aesthetically captivating.
                        </p>

                        <p className="about-text-stagger text-white block pl-2 py-2">
                            Welcome to AsimmetrikA—where tradition meets innovation, and where your imagination is elevated into enduring excellence. Experience the art of living beautifully, <br />
                            <span className="inline-flex items-center flex-wrap gap-6 mt-4 text-base font-bold tracking-widest uppercase align-middle">
                                <span className="inline-flex items-center gap-2">
                                    <span className="text-white text-3xl tracking-normal mr-2">100%</span>
                                    <span className="bg-[#009246] text-white px-2 py-1 rounded-sm shadow-sm">MADE</span>
                                    <span className="bg-[#F1F2F1] text-zinc-900 px-2 py-1 rounded-sm shadow-sm">IN</span>
                                    <span className="bg-[#CE2B37] text-white px-2 py-1 rounded-sm shadow-sm">ITALY</span>
                                </span>
                                <GlowButton className="ml-2 text-xs md:text-sm shadow-[0_0_20px_rgba(255,255,255,0.8)]" href="https://calendly.com/fsquaredfrancone/asimmetrika-consultation">BOOK A FREE CONSULTATION</GlowButton>
                            </span>
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
