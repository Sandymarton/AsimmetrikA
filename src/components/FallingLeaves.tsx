"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Leaf } from "lucide-react";

// Italian flag colors + optional variations
const LEAF_COLORS = ["#009246", "#FFFFFF", "#CE2B37"];
const LEAF_COUNT = 30; // Amount of leaves

export default function FallingLeaves() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;
        const leaves = gsap.utils.toArray<HTMLElement>(".falling-leaf");

        leaves.forEach((leaf, i) => {
            // Setup initial random states
            const startX = gsap.utils.random(0, 100); // 0 to 100vw
            // Start them above the screen but spread out vertically so they don't fall all at once
            const startY = gsap.utils.random(-20, -80);
            const scale = gsap.utils.random(0.6, 1.8);

            const startRotX = gsap.utils.random(0, 360);
            const startRotY = gsap.utils.random(0, 360);
            const startRotZ = gsap.utils.random(0, 360);

            gsap.set(leaf, {
                x: `${startX}vw`,
                y: `${startY}vh`,
                rotationX: startRotX,
                rotationY: startRotY,
                rotationZ: startRotZ,
                scale: scale,
                opacity: gsap.utils.random(0.7, 1),
            });

            // Animate falling down while scrubbing the overlap transition
            gsap.to(leaf, {
                y: `${gsap.utils.random(100, 150)}vh`, // Fall below the bottom of the screen
                x: `${startX + gsap.utils.random(-20, 20)}vw`, // Drift along X axis like a real leaf
                rotationX: startRotX + gsap.utils.random(360, 720),
                rotationY: startRotY + gsap.utils.random(360, 720),
                rotationZ: startRotZ + gsap.utils.random(180, 360),
                ease: "none",
                scrollTrigger: {
                    trigger: document.getElementById("about") || document.body, // Activate when About Us section passes through
                    start: "top bottom", // About top hits viewport bottom
                    end: "top top", // About top hits viewport top (Hero is fully covered)
                    scrub: 1, // Smooth scrub
                },
            });
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
            style={{ perspective: "1000px" }}
        >
            {[...Array(LEAF_COUNT)].map((_, i) => {
                const color = LEAF_COLORS[i % LEAF_COLORS.length];
                return (
                    <div
                        key={i}
                        className="falling-leaf absolute top-0 left-0"
                        style={{ willChange: "transform" }}
                    >
                        {/* The leaf element. White leaves get a slight grey stroke to stand out on bright backgrounds if any */}
                        <Leaf
                            width={48}
                            height={48}
                            fill={color}
                            stroke={color === "#FFFFFF" ? "#E5E7EB" : color}
                            strokeWidth={1}
                            style={{ filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.5))" }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
