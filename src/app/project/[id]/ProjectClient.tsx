"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface Project {
    id: number;
    title: string;
    url: string;
    description: string;
    gallery: string[];
}

export default function ProjectClient({ project }: { project: Project }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate Title
        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
        }

        // Animate Description Text
        if (textRef.current) {
            const elementsToAnimate = Array.from(textRef.current.children);
            if (elementsToAnimate.length > 0) {
                gsap.fromTo(elementsToAnimate,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
                );
            }
        }

        // Elegant Parallax & Reveal Animation for Images
        if (imagesRef.current) {
            const wrappers = gsap.utils.toArray<HTMLElement>('.project-gallery-image');
            wrappers.forEach((wrapper) => {
                const img = wrapper.querySelector('img');

                // Wrapper Entry Reveal
                gsap.fromTo(wrapper,
                    { y: 60, opacity: 0, clipPath: 'inset(10% 0 10% 0)' },
                    {
                        y: 0,
                        opacity: 1,
                        clipPath: 'inset(0% 0 0% 0)',
                        duration: 1.5,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: wrapper,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // Image Inner Parallax on Scroll
                if (img) {
                    gsap.fromTo(img,
                        { yPercent: -5 }, // Removed scale: 1.15 to stop the images from being cropped/stretched
                        {
                            yPercent: 5,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: wrapper,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        }
                    );
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // If there is no description, don't show the grid area at all to avoid empty spaces
    const hasDescription = Boolean(project.description);

    return (
        <div ref={containerRef}>
            <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-[7rem] font-medium tracking-tighter uppercase leading-[0.9] mb-12">
                {project.title}
            </h1>

            {hasDescription && (
                <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
                    <div className="lg:col-span-4 project-text-stagger">
                        <h3 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-2">Location</h3>
                        <p className="mb-8">Architecture & Design</p>

                        <h3 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-2">Scope</h3>
                        <p>Full Build</p>
                    </div>
                    <div className="lg:col-span-8 text-lg md:text-xl font-light leading-relaxed text-zinc-800 project-text-stagger">
                        <p className="mb-6 whitespace-pre-wrap">{project.description}</p>
                    </div>
                </div>
            )}

            {/* Image Gallery */}
            <div ref={imagesRef} className={`flex flex-col gap-8 md:gap-16 w-full ${!hasDescription ? 'mt-12' : ''}`}>
                {project.gallery.map((imgSrc: string, index: number) => (
                    <div key={index} className="w-full relative overflow-hidden bg-zinc-100 project-gallery-image rounded-sm shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imgSrc}
                            alt={`${project.title} gallery image ${index + 1}`}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
