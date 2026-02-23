'use client';

import React from 'react';

interface GlowButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function GlowButton({ href, children, className = '' }: GlowButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).Calendly) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).Calendly.initPopupWidget({ url: href });
        } else {
            window.open(href, '_blank');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
                relative inline-flex items-center justify-center 
                px-8 py-3 
                text-sm font-medium tracking-widest uppercase 
                text-white bg-black 
                border border-white/40 
                shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:shadow-[0_0_25px_rgba(255,255,255,1)]
                transition-all duration-300 ease-out
                rounded-sm
                group
                overflow-hidden
                ${className}
            `}
        >
            <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] opacity-50"></span>
            <span className="relative z-10 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-white">
                {children}
            </span>
        </button>
    );
}
