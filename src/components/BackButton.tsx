'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        // Use browser history to go back — this restores scroll position natively
        // Falls back to the portfolio anchor if there's no history to go back to
        if (window.history.length > 1) {
            router.back();
        } else {
            window.location.href = '/#portfolio';
        }
    };

    return (
        <button
            onClick={handleBack}
            className="inline-flex items-center text-sm uppercase tracking-widest font-medium text-zinc-500 hover:text-black transition-colors mb-24 z-10 relative cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
            >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
            </svg>
            Back to Projects
        </button>
    );
}
