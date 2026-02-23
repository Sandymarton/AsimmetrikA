'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import GlowButton from './GlowButton';
import { usePathname, useRouter } from 'next/navigation';

const Navigation = [
    { name: 'Home', hash: 'home' },
    { name: 'About', hash: 'about' },
    { name: 'Services', hash: 'services' },
    { name: 'Portfolio', hash: 'portfolio' },
    { name: 'Contact', hash: 'contact' },
];

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();

        if (pathname === '/') {
            // Already on the home page — scroll directly without any navigation
            const target = document.getElementById(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
            // On another page — navigate home then scroll after DOM settles
            router.push('/');
            setTimeout(() => {
                const target = document.getElementById(hash);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }, 400);
        }
    };

    return (
        <header className={styles.header}>
            <div className={`${styles.container} max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 pt-6 md:pt-10`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image
                            src="https://images.squarespace-cdn.com/content/v1/67ad5314e31aeb30eaaab99e/de51c0fe-94e2-4c17-b533-cd93960ee19b/Preview.jpg?format=1500w"
                            alt="AsimmetrikA Logo"
                            width={150}
                            height={50}
                            priority
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {Navigation.map((item) => (
                            <li key={item.name} className={styles.navItem}>
                                <a
                                    href={`/#${item.hash}`}
                                    className={styles.navLink}
                                    onClick={(e) => handleNavClick(e, item.hash)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="hidden lg:flex ml-8">
                    <GlowButton className="text-xs px-6 py-2" href="https://calendly.com/fsquaredfrancone/asimmetrika-consultation">
                        BOOK A FREE CONSULTATION
                    </GlowButton>
                </div>
                <div className={styles.mobileMenuBtn}>
                    <span className={styles.burgerLine}></span>
                    <span className={styles.burgerLine}></span>
                    <span className={styles.burgerLine}></span>
                </div>
            </div>
        </header>
    );
}
