"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const TeamMembers = [
    {
        name: 'Fabrizio Francone',
        role: 'Co Founder - Marketing, Innovation, Logistics',
        description: 'Fabrizio champions innovation across all facets of our operations. With a strategic focus on excellence and streamlined logistics, he seamlessly integrates creative insights with practical execution. His forward-thinking approach not only elevates our brand but also ensures that every project is delivered with precision and ingenuity.',
        image: 'https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/e4861073-08ff-4fba-81dc-ee1fb574db87/IMG_2037.jpeg'
    },
    {
        name: 'Simone Pinducciu',
        role: 'Co Founder - Architect and Design Director',
        description: 'Simone brings over a decade of experience in high-value projects, deeply rooted in a familial tradition of Italian construction. With a rigorous seven-year education that honed skills from quantity surveying to architecture, his transition from Italy to the UK has enriched his expertise in managing upscale residential developments. Simone combines industry insight with hands-on experience to navigate complex construction challenges with strategic foresight and finesse.',
        image: 'https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/6529e069-92af-435a-9fd3-fe9d90321025/Screenshot+2025-03-07+at+14.40.48.png'
    },
    {
        name: 'Claudio Boccasile',
        role: 'Co Founder - Lead Engineer',
        description: 'With over two decades of engineering experience, Claudio is highly regarded both nationally and internationally. Known for his innovative approach and meticulous attention to detail, he ensures every project meets the highest standards of quality and efficiency.',
        image: '/images/team/claudio.jpg'
    }
];

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

export default function TeamSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const photoRefs = useRef<HTMLDivElement[]>([]);
    const textRefs = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // Animate Team Photos
        const photos = photoRefs.current.filter(Boolean);
        if (photos.length > 0) {
            gsap.fromTo(photos,
                {
                    opacity: 0,
                    scale: 0.9,
                    y: 60,
                    filter: "blur(10px)"
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Animate Team Text Blocks with Magnetic Assemble Effect
        const textBlocks = textRefs.current.filter(Boolean);
        textBlocks.forEach((block, index) => {
            const words = block.querySelectorAll('.magnetic-word');
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
                    delay: 0.2 + (index * 0.3), // Delay relative to column
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full bg-transparent text-black py-24 md:py-32 px-6 md:px-12 lg:px-24"
            data-theme="light-zinc"
        >
            <div className="max-w-[1800px] mx-auto">
                <div className="mb-16 md:mb-24 flex justify-between items-end">
                    <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-medium tracking-tighter uppercase leading-[0.9]">
                        <span className="block italic font-light text-zinc-400">Meet</span>
                        <span className="block ml-12 md:ml-32">The Team</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {TeamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col group">

                            {/* Photo Container */}
                            <div
                                className="relative w-full aspect-[3/4] mb-8 overflow-hidden bg-zinc-200"
                                ref={(el) => {
                                    if (el) photoRefs.current[index] = el;
                                }}
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Text Container */}
                            <div
                                className="flex flex-col"
                                ref={(el) => {
                                    if (el) textRefs.current[index] = el;
                                }}
                                style={{ perspective: "1000px" }}
                            >
                                <h3
                                    className="text-2xl md:text-3xl font-medium tracking-tight mb-2 uppercase drop-shadow-xl"
                                    style={{ textShadow: '0px 0px 25px rgba(0,0,0,0.6), 0px 4px 15px rgba(0,0,0,0.3)' }}
                                >
                                    <MagneticText text={member.name} />
                                </h3>
                                <p className="text-sm tracking-widest uppercase mb-6 text-zinc-500 font-medium">
                                    <MagneticText text={member.role} />
                                </p>
                                <p className="text-sm md:text-base font-light leading-relaxed opacity-80">
                                    <MagneticText text={member.description} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
