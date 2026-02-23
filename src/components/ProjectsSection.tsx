"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const projects = [
    {
        id: 1,
        title: "Project Zero",
        location: "Architecture & Design", // Fallback location since live site doesn't have it on the card
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741717189205-QNGFHQQNK58BBPRLHK5L/Screenshot+2025-03-11+at+18.11.27.png"
    },
    {
        id: 2,
        title: "Project One",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741702246350-ETQEM97UXT8S27I90B8Q/Screenshot+2025-03-10+at+19.06.07.png"
    },
    {
        id: 3,
        title: "Project Two",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741703620821-L7VJQ2JJ1QR7NG73WDHD/Screenshot+2025-03-11+at+14.31.49.png"
    },
    {
        id: 4,
        title: "Project Three",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741715263337-QERU34ESZF5HKJ17B3KR/Screenshot+2025-03-11+at+17.30.46.jpg"
    },
    {
        id: 5,
        title: "Project Four",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741715152094-5305GO1JG7986UIK985J/Screenshot+2025-03-11+at+14.17.35.png"
    },
    {
        id: 6,
        title: "Project Five",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741702292567-FZFDRR3HH5227YULW9KA/Screenshot+2025-03-10+at+19.06.28.png"
    },
    {
        id: 7,
        title: "Project Six",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741702331871-BFUHFUT77TWXPJBIA44P/Screenshot+2025-03-10+at+19.06.00.png"
    },
    {
        id: 8,
        title: "Project Seven",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741702361368-FSSI0A1MM9FIDP9VRSU9/Screenshot+2025-03-10+at+19.06.14.png"
    },
    {
        id: 9,
        title: "Project Eight",
        location: "Architecture & Design",
        image: "https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/1741702391540-YBI8Q8TM45N489AO94XC/Screenshot+2025-03-10+at+19.06.24.png"
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        // Desktop: High-end overlapping pinned horizontal stack effect
        mm.add("(min-width: 768px)", () => {
            const cards = cardsRef.current.filter(Boolean);
            if (!cards.length || !sectionRef.current) return;

            const tl = gsap.timeline();

            // Animate each card after the first one to slide in from the right and overlap
            cards.slice(1).forEach((card, i) => {
                tl.to(card, {
                    xPercent: -100,
                    ease: "none",
                });
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${cards.length * window.innerHeight * 0.8}`,
                pin: true,
                animation: tl,
                scrub: 1,
            });
        });

        // Mobile: Vertical scroll reveal
        mm.add("(max-width: 767px)", () => {
            const cards = cardsRef.current.filter(Boolean);
            cards.forEach((card) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                });
            });
        });

        // Header Text Reveal Animation (Desktop & Mobile)
        if (sectionRef.current) {
            const headerText = sectionRef.current.querySelectorAll('.project-header span');
            if (headerText.length > 0) {
                gsap.fromTo(headerText,
                    {
                        opacity: 0,
                        y: 40,
                        filter: "blur(10px)",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".project-header",
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="min-h-screen bg-transparent text-white py-24 md:py-12 flex flex-col pt-[15vh] md:pt-[10vh]"
            data-theme="dark"
        >
            <div className="px-6 md:px-12 lg:px-24 mb-12 shrink-0">
                <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-medium tracking-tighter uppercase leading-[0.9] project-header">
                    <span className="block italic font-light ml-0 md:ml-24 text-zinc-400">Selected</span>
                    <span className="block ml-12 md:ml-48">Works</span>
                </h2>
            </div>

            {/* Cards Wrapper */}
            <div
                className="relative flex-grow w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 mt-8 md:mt-16 flex flex-col md:block h-full min-h-[50vh]"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el) => {
                            if (el) cardsRef.current[index] = el;
                        }}
                        className={`relative md:absolute top-0 w-full md:w-[calc(100%-3rem)] lg:w-[calc(100%-6rem)] h-[60vh] md:h-full mb-16 md:mb-0 transform-gpu overflow-hidden bg-zinc-900 group ${index === 0 ? 'md:left-0' : 'md:left-full'
                            }`}
                        style={{
                            zIndex: index + 10,
                            transformBox: "fill-box",
                        }}
                    >
                        <Link href={`/project/${project.id}`} className="block w-full h-full relative group">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover opacity-80 mix-blend-luminosity md:mix-blend-normal transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 85vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                                <p className="text-sm md:text-lg font-light tracking-widest uppercase mb-2 text-zinc-300">
                                    {String(index + 1).padStart(2, '0')} / {project.location}
                                </p>
                                <h3 className="text-4xl md:text-6xl font-medium uppercase tracking-tight text-white mb-4">
                                    {project.title}
                                </h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
