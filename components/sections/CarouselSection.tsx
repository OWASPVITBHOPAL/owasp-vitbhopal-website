"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useAnimationFrame
} from "motion/react";
import { Container } from "../ui/container";
import Image from "next/image";

// Duplicating images to ensure smooth looping
const images = [
  "/events/cyberconclave.JPG",
  "/testimg1.png",
  "/events/cyberconclave.JPG",
  "/testimg1.png",
  "/events/cyberconclave.JPG",
  "/testimg1.png",
  "/events/cyberconclave.JPG",
  "/testimg1.png",
];

export default function CarouselSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);

    useEffect(() => {
        const calculateWidth = () => {
            if (containerRef.current) {
                // Approximate width of ONE set (half of total scrollable width)
                setContentWidth(containerRef.current.scrollWidth / 2);
            }
        };

        const timeout = setTimeout(calculateWidth, 100);
        window.addEventListener("resize", calculateWidth);
        return () => {
            window.removeEventListener("resize", calculateWidth);
            clearTimeout(timeout);
        };
    }, []);

    useAnimationFrame((t, delta) => {
        if (!isDragging && contentWidth > 0) {
            const moveBy = 0.5 * (delta / 16); 
            let newX = x.get() - moveBy;
            
            if (newX <= -contentWidth) {
                newX = 0;
            }
            x.set(newX);
        }
    });

    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
             if (contentWidth > 0) {
                 if (latest <= -contentWidth) {
                     x.set(latest + contentWidth);
                 } else if (latest > 0) {
                     x.set(latest - contentWidth);
                 }
             }
        });
        return unsubscribe;
    }, [contentWidth, x]);

    return (
        <section className="overflow-hidden relative">
            <Container className="px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-4 mt-6 md:mt-10 mb-8">
                    <h1 className="text-white font-figtree text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-medium leading-tight lg:leading-[81px] not-italic">
                        Gallery
                    </h1>
                    <div className="w-full h-[2px] bg-white/12" />
                    <div className="text-sm md:text-base font-normal text-[var(--muted-text)]">
                        Explore moments from our past events, workshops, and community gatherings.
                    </div>
                </div>
            </Container>
            
            <div 
                className="w-full overflow-hidden cursor-grab active:cursor-grabbing z-10 relative pb-10 pointer-events-auto"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                <motion.div 
                    ref={containerRef}
                    className="flex w-max"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 10000 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {/* First component set */}
                    {images.map((src, i) => (
                        <Card key={`orig-${i}`} src={src} />
                    ))}
                    {/* Duplicate component set for loop */}
                    {images.map((src, i) => (
                        <Card key={`dup-${i}`} src={src} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ src }: { src: string }) => (
    <div className="relative w-[300px] h-[200px] md:h-[300px] shrink-0 mx-4 rounded-2xl border-2 border-[var(--border)] overflow-hidden pointer-events-none select-none bg-zinc-800/50 group">
        <Image 
            src={src} 
            alt="Gallery Image" 
            fill 
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
    </div>
);
