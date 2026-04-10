"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { Container } from "../ui/container";
import Image from "next/image";
import { homeContent } from "@/Content/Home";

// Duplicating images to ensure smooth looping
const images = homeContent.carouselImages;

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
    <section className="relative overflow-hidden">
      <Container className="px-4 md:px-6 lg:px-8">
        <div className="mt-6 mb-8 flex flex-col gap-4 md:mt-10">
          <h1 className="font-figtree text-4xl leading-tight font-medium text-white not-italic sm:text-5xl md:text-6xl lg:text-[70px] lg:leading-[81px]">
            Gallery
          </h1>
          <div className="h-[2px] w-full bg-white/12" />
          <div className="text-sm font-normal text-(--muted-text) md:text-base">
            Explore moments from our past events, workshops, and community
            gatherings.
          </div>
        </div>
      </Container>

      <div
        className="pointer-events-auto relative z-10 w-full cursor-grab overflow-hidden pb-10 active:cursor-grabbing"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
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
}

const Card = ({ src }: { src: string }) => (
  <div className="group pointer-events-none relative mx-4 h-[200px] w-[300px] shrink-0 overflow-hidden rounded-3xl bg-[#121212] shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] select-none md:h-[300px]">
    <Image
      src={src}
      alt="Gallery Image"
      fill
      className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
    />
    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
  </div>
);
