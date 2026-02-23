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

export default function EthosSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // Animate the large text block (like About section)
        const paragraphs = gsap.utils.toArray<HTMLElement>('.ethos-text-stagger');
        paragraphs.forEach((paragraph) => {
            const children = gsap.utils.toArray<HTMLElement>(paragraph.querySelectorAll('span.block'));
            if (children.length > 0) {
                gsap.fromTo(children,
                    {
                        x: 150,
                        opacity: 0,
                        rotateY: -30,
                        filter: "blur(12px)",
                    },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        filter: "blur(0px)",
                        duration: 1.8,
                        stagger: 0.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: paragraph,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                gsap.set(paragraph, { opacity: 1 });
            }
        });

        // Animate the smaller paragraphs (like Team section)
        const magneticContainers = gsap.utils.toArray<HTMLElement>('.magnetic-container');
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
                    delay: 0.2 + (index * 0.3), // Stagger the paragraphs a little
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white text-black py-24 md:py-48 px-6 md:px-12 lg:px-24 flex items-center justify-center min-h-[70vh] overflow-hidden"
            data-theme="light"
        >
            <div className="max-w-4xl mx-auto text-center md:text-left w-full">

                {/* Large Text with Staggered Block Reveal */}
                <h2 className="ethos-text-stagger text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tighter leading-[1.05] mb-16 md:mb-24 flex flex-col items-center md:items-start w-full">
                    <span className="block text-black">Excellence is</span>
                    <span className="block text-black">not an act,</span>
                    <span className="block italic font-light text-zinc-500">but a habit.</span>
                </h2>

                {/* Smaller Text with Magnetic Reveal */}
                <div className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-tight max-w-[800px] md:mx-0">
                    <p className="mb-12 magnetic-container" style={{ perspective: "1000px" }}>
                        <MagneticText text="We are passionate about design & build, and our commitment to outstanding results drives us in everything we do. Through careful planning, efficient processes, and a dedication to detail, we help shape our clients' visions into reality." />
                    </p>
                    <p className="magnetic-container" style={{ perspective: "1000px" }}>
                        <MagneticText text="We aim for seamless project delivery and to be a trusted partner in achieving your strategic goals, ensuring peace of mind throughout the construction journey. We are here to bring it to life with precision and care." />
                    </p>
                </div>

            </div>
        </section>
    );
}
