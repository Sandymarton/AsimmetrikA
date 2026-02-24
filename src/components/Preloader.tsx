"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const name = "AsimmetrikA";

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;
        const bg = bgRef.current;
        const canvas = canvasRef.current;
        if (!container || !text || !bg || !canvas) return;

        // ── Should we skip the preloader? ────────────────────────────────────
        // Skip only when navigating back from within our own site.
        // Always show on: fresh open, F5 reload, bookmark, external link.
        const hasPlayed = !!sessionStorage.getItem('preloaderPlayed');
        const fromInternal = !!document.referrer && document.referrer.includes(window.location.host);
        const isReload = performance.getEntriesByType('navigation')[0]
            ? (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'reload'
            : false;

        if (hasPlayed && fromInternal && !isReload) {
            // Internal back-navigation → skip animation, restore page immediately
            container.style.display = 'none';
            document.body.style.overflow = '';

            const t = setTimeout(() => {
                (window as Window & { __preloaderDone?: boolean }).__preloaderDone = true;
                document.dispatchEvent(new CustomEvent('preloaderComplete'));

                // Scroll to URL hash (e.g. /#portfolio from project back button)
                const hash = window.location.hash;
                if (hash) {
                    const target = document.querySelector(hash);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 150);
            return () => clearTimeout(t);
        }

        // On F5 reload, reset the flag so the full preloader plays again
        if (isReload) sessionStorage.removeItem('preloaderPlayed');


        // ── Canvas setup ──────────────────────────────────────────────────────
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener('resize', setSize);

        const ctx = canvas.getContext('2d')!;

        // Animated state — GSAP tweens these values
        const S = {
            grid: 0,       // 0→1 blueprint grid grows outward
            compass: 0,    // 0→1 outer circle draws (compass sweep)
            inner: 0,      // 0→1 inner golden-ratio circle
            shapes: 0,     // 0→1 hexagon + triangles assemble
            decor: 0,      // 0→1 ticks & small circles appear
            spinAngle: 0,  // continuous slow rotation of outer ring ornaments
            globalAlpha: 1,
        };

        const DARK = (a: number) => `rgba(255,255,255,${a * 0.85})`;
        const LIGHT = (a: number) => `rgba(255,255,255,${a * 0.45})`;

        function drawFrame() {
            if (!canvas) return;
            const W = canvas.width, H = canvas.height;
            const cx = W / 2, cy = H / 2;
            const R = Math.min(cx, cy) * 0.72;

            ctx.clearRect(0, 0, W, H);
            if (S.globalAlpha <= 0) return;

            ctx.save();
            ctx.globalAlpha = S.globalAlpha;

            // ── 1. Blueprint grid ─────────────────────────────────────────────
            if (S.grid > 0) {
                const g = S.grid;
                const sp = 38;
                ctx.lineWidth = 0.4;

                // Horizontal lines
                for (let y = 0; y <= H; y += sp) {
                    const hw = (W / 2) * g;
                    ctx.strokeStyle = DARK(0.09 * g);
                    ctx.beginPath(); ctx.moveTo(cx - hw, y); ctx.lineTo(cx + hw, y); ctx.stroke();
                }
                // Vertical lines
                for (let x = 0; x <= W; x += sp) {
                    const hh = (H / 2) * g;
                    ctx.strokeStyle = DARK(0.09 * g);
                    ctx.beginPath(); ctx.moveTo(x, cy - hh); ctx.lineTo(x, cy + hh); ctx.stroke();
                }

                // Fine diagonal grid at 45° (lighter)
                ctx.strokeStyle = DARK(0.04 * g);
                ctx.lineWidth = 0.3;
                for (let i = -W; i < W + H; i += sp * 2) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(i, H); ctx.lineTo(i + H, 0); ctx.stroke();
                }
            }

            // ── 2. Outer compass circle (draws like an arc being swept) ───────
            if (S.compass > 0) {
                const c = S.compass;
                ctx.strokeStyle = DARK(0.55 * Math.min(c * 2, 1));
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + c * Math.PI * 2);
                ctx.stroke();

                // Construction lines radiating from center to circle edge
                if (c > 0.15) {
                    const lp = Math.min((c - 0.15) / 0.85, 1);
                    ctx.setLineDash([3, 8]);
                    ctx.strokeStyle = DARK(0.18 * lp);
                    ctx.lineWidth = 0.6;
                    for (let i = 0; i < 8; i++) {
                        const a = (i / 8) * Math.PI * 2 + S.spinAngle * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(cx, cy);
                        ctx.lineTo(cx + R * Math.cos(a) * lp, cy + R * Math.sin(a) * lp);
                        ctx.stroke();
                    }
                    ctx.setLineDash([]);
                }

                // Center dot
                ctx.fillStyle = DARK(0.65 * Math.min(c * 3, 1));
                ctx.beginPath();
                ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
                ctx.fill();

                // Outer ring marker ticks (like a protractor)
                if (c > 0.5) {
                    const tp = Math.min((c - 0.5) * 2, 1);
                    ctx.strokeStyle = DARK(0.4 * tp);
                    for (let i = 0; i < 36; i++) {
                        const a = (i / 36) * Math.PI * 2;
                        const inner = i % 3 === 0 ? R - 12 : R - 6;
                        ctx.lineWidth = i % 3 === 0 ? 1 : 0.5;
                        ctx.beginPath();
                        ctx.moveTo(cx + inner * Math.cos(a), cy + inner * Math.sin(a));
                        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
                        ctx.stroke();
                    }
                }
            }

            // ── 3. Inner golden-ratio circle ──────────────────────────────────
            if (S.inner > 0) {
                const i = S.inner;
                ctx.strokeStyle = DARK(0.3 * i);
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.arc(cx, cy, R * 0.618, -Math.PI / 2, -Math.PI / 2 + i * Math.PI * 2);
                ctx.stroke();

                // Second inner ring
                ctx.strokeStyle = LIGHT(0.25 * i);
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.arc(cx, cy, R * 0.382, 0, Math.PI * 2);
                ctx.stroke();
            }

            // ── 4. Assembling geometric shapes ────────────────────────────────
            if (S.shapes > 0) {
                const s = S.shapes;

                // Hexagon on outer circle
                ctx.strokeStyle = DARK(0.45 * s);
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                for (let i = 0; i <= 6; i++) {
                    const a = (i / 6) * Math.PI * 2 * Math.min(s / 0.85, 1) - Math.PI / 2 + S.spinAngle * 0.1;
                    const px = cx + R * Math.cos(a);
                    const py = cy + R * Math.sin(a);
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();

                // Upward triangle inscribed in golden circle
                if (s > 0.25) {
                    const tp = Math.min((s - 0.25) / 0.75, 1);
                    ctx.strokeStyle = LIGHT(0.4 * tp);
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    for (let i = 0; i < 3; i++) {
                        const a = (i / 3) * Math.PI * 2 - Math.PI / 2 + S.spinAngle * 0.15;
                        const px = cx + R * 0.618 * Math.cos(a);
                        const py = cy + R * 0.618 * Math.sin(a);
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();

                    // Downward triangle (Star of David / Seal of Solomon geometry)
                    ctx.beginPath();
                    for (let i = 0; i < 3; i++) {
                        const a = (i / 3) * Math.PI * 2 + Math.PI / 2 - S.spinAngle * 0.15;
                        const px = cx + R * 0.618 * Math.cos(a);
                        const py = cy + R * 0.618 * Math.sin(a);
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }

                // Square on inner ring at 45° rotation
                if (s > 0.5) {
                    const qp = Math.min((s - 0.5) / 0.5, 1);
                    ctx.strokeStyle = DARK(0.25 * qp);
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    for (let i = 0; i < 4; i++) {
                        const a = (i / 4) * Math.PI * 2 + Math.PI / 4 + S.spinAngle * 0.2;
                        const px = cx + R * 0.382 * Math.cos(a);
                        const py = cy + R * 0.382 * Math.sin(a);
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // ── 5. Decorative compass tip circles & cross marks ───────────────
            if (S.decor > 0) {
                const d = S.decor;

                // Small circles at hexagon vertices (compass pin holes)
                ctx.strokeStyle = DARK(0.5 * d);
                ctx.lineWidth = 0.8;
                for (let i = 0; i < 6; i++) {
                    const a = (i / 6) * Math.PI * 2 - Math.PI / 2 + S.spinAngle * 0.1;
                    const px = cx + R * Math.cos(a);
                    const py = cy + R * Math.sin(a);
                    ctx.beginPath();
                    ctx.arc(px, py, 4 * d, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Cardinal cross marks (compass N/S/E/W)
                ctx.strokeStyle = DARK(0.45 * d);
                ctx.lineWidth = 1.2;
                const crossLen = 10;
                [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(a => {
                    const px = cx + R * Math.cos(a);
                    const py = cy + R * Math.sin(a);
                    const nx = Math.cos(a + Math.PI / 2);
                    const ny = Math.sin(a + Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(px - nx * crossLen * d, py - ny * crossLen * d);
                    ctx.lineTo(px + nx * crossLen * d, py + ny * crossLen * d);
                    ctx.stroke();
                });

                // Outer ring dots (like decorative rivets) that slowly orbit
                ctx.fillStyle = DARK(0.35 * d);
                for (let i = 0; i < 12; i++) {
                    const a = (i / 12) * Math.PI * 2 + S.spinAngle;
                    const orbitR = R + 18;
                    const px = cx + orbitR * Math.cos(a);
                    const py = cy + orbitR * Math.sin(a);
                    ctx.beginPath();
                    ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        // Continuous render loop
        let rafId: number;
        const loop = () => { drawFrame(); rafId = requestAnimationFrame(loop); };
        loop();

        // ── Letter setup ──────────────────────────────────────────────────────
        const letterEls = Array.from(container.querySelectorAll<HTMLElement>('.prel-letter'));
        const vw = window.innerWidth;

        document.body.style.overflow = 'hidden';

        let playInterval: NodeJS.Timeout;
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.defaultMuted = true;
            videoRef.current.playsInline = true;
            videoRef.current.setAttribute("muted", "true");
            videoRef.current.setAttribute("playsinline", "true");

            playInterval = setInterval(() => {
                if (videoRef.current) {
                    videoRef.current.play().then(() => {
                        clearInterval(playInterval);
                    }).catch(() => { });
                }
            }, 500);
        }

        letterEls.forEach((el, i) => {
            gsap.set(el, { x: i % 2 === 0 ? -vw * 1.6 : vw * 1.6, opacity: 0 });
        });

        // ── Master timeline ───────────────────────────────────────────────────
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                sessionStorage.setItem('preloaderPlayed', 'true');
                (window as Window & { __preloaderDone?: boolean }).__preloaderDone = true;
                document.dispatchEvent(new CustomEvent('preloaderComplete'));
            }
        });

        // All geometry assembles SIMULTANEOUSLY in 1s — everything at position 0
        tl.to(S, { grid: 1, duration: 1, ease: 'power2.out' }, 0);
        tl.to(S, { compass: 1, duration: 1, ease: 'power2.inOut' }, 0);
        tl.to(S, { inner: 1, duration: 0.8, ease: 'power2.out' }, 0);
        tl.to(S, { shapes: 1, duration: 0.9, ease: 'power2.inOut' }, 0.1);
        tl.to(S, { decor: 1, duration: 0.6, ease: 'power2.out' }, 0.4);

        // Spin runs independently — does NOT affect timeline duration
        gsap.to(S, { spinAngle: Math.PI * 2, duration: 18, ease: 'none', repeat: -1 });

        // Letters fly in at exactly 1s (geometry is fully assembled by then)
        tl.addLabel('lettersIn', 1);
        tl.fromTo(letterEls,
            { x: (i: number) => i % 2 === 0 ? -vw * 1.6 : vw * 1.6, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.6, stagger: { each: 0.1, from: 'start' }, ease: 'expo.out' },
            'lettersIn'
        );

        // Hold after all letters landed (last letter starts at 1+1=2s, finishes at 3.6s → hold at 3.6s)
        tl.to({}, { duration: 0.8 });

        // Text scales up to watermark
        tl.to(text, {
            scale: vw < 768 ? 10 : 24,
            color: '#E0D0C6',
            opacity: 0.1,
            duration: 2.2,
            ease: 'expo.inOut',
        }, 'explode');

        // Geometry + background fade out
        tl.to(S, { globalAlpha: 0, duration: 1.2, ease: 'power2.inOut' }, 'explode+=0.6');
        tl.to(canvasRef.current, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 'explode+=0.6');
        tl.to(bg, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 'explode+=0.8');

        tl.set(canvasRef.current, { display: 'none' });
        tl.set(bg, { display: 'none' });

        tl.add(() => {
            document.body.style.overflow = '';
            cancelAnimationFrame(rafId);
            if (container) {
                container.style.opacity = '0';
                container.style.pointerEvents = 'none';
                setTimeout(() => {
                    container.style.display = 'none';
                }, 100);
            }
        });

        // Start animation only when video has at least enough data to show a frame
        const startAnimation = () => {
            if (tl.paused()) {
                tl.play();
            }
        };

        const vid = videoRef.current;
        if (vid) {
            if (vid.readyState >= 3) {
                startAnimation();
            } else {
                vid.addEventListener('canplay', startAnimation);
                vid.addEventListener('playing', startAnimation);
                // Also fallback to a timeout just in case it takes too long
                setTimeout(startAnimation, 2000);
            }
        } else {
            startAnimation();
        }

        return () => {
            if (playInterval) clearInterval(playInterval);
            if (vid) {
                vid.removeEventListener('canplay', startAnimation);
                vid.removeEventListener('playing', startAnimation);
            }
            tl.kill();
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', setSize);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
        >
            {/* Video background wrapper with solid black so it doesn't flash grey before load */}
            <div ref={bgRef} className="absolute inset-0 pointer-events-auto bg-black">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src="/Video/AsimmetrikA_vid.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
                {/* Dark overlay so geometry and text pop over the video */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Geometric canvas layer */}
            <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

            {/* Giant magnetic letters */}
            <div
                ref={textRef}
                className="relative z-10 flex font-light text-white uppercase"
                style={{
                    fontSize: 'clamp(2.5rem, 12vw, 11rem)',
                    letterSpacing: '-0.01em',
                    transformOrigin: 'center center',
                    willChange: 'transform, color, opacity',
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                }}
            >
                {name.split('').map((char, i) => (
                    <span
                        key={i}
                        className="prel-letter inline-block"
                        style={{ willChange: 'transform, opacity', opacity: 0 }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
}
