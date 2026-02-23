"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalColorTransition() {
    const pathname = usePathname();
    // Track ONLY the triggers we create — never kill triggers from other components
    const myTriggers = useRef<ScrollTrigger[]>([]);

    useEffect(() => {
        // Kill ONLY our own previously created triggers
        myTriggers.current.forEach(t => t.kill());
        myTriggers.current = [];

        const timer = setTimeout(() => {
            gsap.set(document.body, { backgroundColor: "#ffffff" });

            const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");
            const created: ScrollTrigger[] = [];

            sections.forEach((section, index) => {
                const theme = section.getAttribute("data-theme");
                const bgColor = theme === "dark" ? "#000000" : theme === "light-zinc" ? "#f4f4f5" : "#ffffff";

                if (index > 0) {
                    const prevTheme = sections[index - 1].getAttribute("data-theme");
                    const prevBgColor = prevTheme === "dark" ? "#000000" : prevTheme === "light-zinc" ? "#f4f4f5" : "#ffffff";

                    // Use a longer scroll range for dark→light transitions so the fade is gradual
                    const isDarkToLight = prevTheme === "dark" && theme !== "dark";
                    const tween = gsap.fromTo(document.body,
                        { backgroundColor: prevBgColor },
                        {
                            backgroundColor: bgColor,
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: section,
                                start: isDarkToLight ? "top 100%" : "top 95%",
                                end: isDarkToLight ? "top -30%" : "top 25%",
                                scrub: true,
                                refreshPriority: -1,
                            }
                        }
                    );

                    if (tween.scrollTrigger) created.push(tween.scrollTrigger);
                } else {
                    gsap.set(document.body, { backgroundColor: bgColor });
                }
            });

            myTriggers.current = created;

            // Refresh only to recalculate positions — does NOT reset scroll or kill others
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(timer);
            myTriggers.current.forEach(t => t.kill());
            myTriggers.current = [];
        };
    }, [pathname]);

    return null;
}
