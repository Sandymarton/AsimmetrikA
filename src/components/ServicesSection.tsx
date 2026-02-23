"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './ServicesSection.module.css';

const servicesData = [
    {
        category: "Conceptualization and Planning",
        items: [
            { title: "Advise and lead the client", desc: "Our journey begins by understanding your vision. We advise, lead and collaborate with you to refine your ideas and goals." },
            { title: "Feasibility and Concept Study", desc: "Our in-depth analysis ensures your concept aligns with reality and is tailored to your needs." },
            { title: "Pre-Application Services", desc: "We navigate the complexities of pre-application processes to streamline your project's development." },
            { title: "Planning Application", desc: "We handle all aspects of the planning application process, ensuring your project aligns with local regulations and standards." },
            { title: "Conservation Area and Listed Building Expertise", desc: "We specialize in preserving the integrity of historic and listed structures within conservation areas." },
            { title: "Thames Water Compliance", desc: "We ensure that your project complies with Thames Water regulations for water and wastewater services." }
        ]
    },
    {
        category: "Design Excellence",
        items: [
            { title: "Exterior Design", desc: "We craft the exterior of your project to harmonize with its surroundings, enhancing curb appeal and functionality." },
            { title: "Structural and M&E Systems Design", desc: "Our structural and mechanical & electrical systems design experts ensure the safety, efficiency, and sustainability of your project." },
            { title: "Retrofit Design", desc: "We modernize existing structures with energy-efficient solutions, breathing new life into older buildings." },
            { title: "Landscape Design", desc: "Our landscape architects transform outdoor spaces into lush, inviting environments that complement the project's aesthetic." },
            { title: "Biophilic Design", desc: "We incorporate natural elements into your project, connecting occupants with nature to enhance well-being and productivity." },
            { title: "Sustainable Design", desc: "Sustainability is at the core of our philosophy. We integrate eco-friendly solutions to create green, energy-efficient spaces." },
            { title: "Furniture Design", desc: "Our furniture designers craft bespoke pieces that harmonize with the overall design and enhance your living or working space." }
        ]
    },
    {
        category: "Construction and Visualization",
        items: [
            { title: "Construction Site Management", desc: "Relax, we handle the entire construction process. Our dedicated team of builders brings the project to life, while our experts at Asimmetrika oversee every detail, ensuring flawless execution and the highest standards of quality." },
            { title: "Digital Drawings and 3D Visualization", desc: "We employ cutting-edge technology to provide digital drawings and 3D visualizations, allowing you to see your project come to life before construction begins." },
            { title: "Video Rendering", desc: "We offer video rendering services to give you a dynamic, immersive preview of your project." }
        ]
    }
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // Select all text elements that should materialize
        const elements = sectionRef.current.querySelectorAll(`.${styles.materializeText}`);

        elements.forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Trigger when element is 85% into the viewport
                    toggleActions: "play none none reverse",
                }
            });
        });

        // Stagger list items inside each category
        const categories = sectionRef.current.querySelectorAll('.service-category');
        categories.forEach((category) => {
            const items = category.querySelectorAll('.service-item');
            gsap.to(items, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: category,
                    start: "top 75%",
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full pt-24 pb-[20vh] md:pt-32 md:pb-[30vh] bg-transparent text-zinc-950 overflow-hidden relative"
            id="services"
            data-theme="light"
        >
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">

                {/* Header Title */}
                <div className="mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-medium tracking-tighter uppercase leading-[0.9]">
                        <span className={`block italic font-light ml-0 md:ml-12 text-zinc-400 ${styles.materializeText}`}>Our</span>
                        <span className={`block ml-12 md:ml-32 ${styles.materializeText}`}>Services</span>
                    </h2>
                    <p className={`mt-8 md:mt-12 text-lg md:text-2xl max-w-2xl font-light text-zinc-600 leading-relaxed ${styles.materializeText}`}>
                        We take pride in our comprehensive range of services, designed to guide our clients through every stage of their projects, from inception to completion.
                    </p>
                </div>

                {/* Services Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 xl:gap-16">
                    {servicesData.map((category, catIndex) => (
                        <div key={catIndex} className="service-category">
                            {/* Category Title */}
                            <h3 className={`text-2xl md:text-3xl lg:text-4xl uppercase font-medium tracking-tight mb-8 pb-4 border-b border-zinc-200 ${styles.materializeText}`}>
                                {category.category}
                            </h3>

                            {/* Category Items */}
                            <ul className="flex flex-col">
                                {category.items.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className={`service-item py-6 ${styles.serviceLine} ${styles.materializeText}`}
                                    >
                                        <h4 className="text-xl md:text-2xl font-medium tracking-tight mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-zinc-500 font-light leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
