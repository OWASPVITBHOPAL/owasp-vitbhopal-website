"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoader } from "@/components/Loader";

interface AnimatedHeroTextProps {
  titlePrefix: string;
  titleSuffix: string;
  subtitle: string;
}

const GLYPHS = "01#_/-[]{}*+<>";

function useScramble(
  targetText: string,
  active: boolean,
  durationMs = 600,
  delayMs = 0,
) {
  const getScrambled = () =>
    targetText.replace(
      /[^\s]/g,
      () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    );

  const [displayText, setDisplayText] = useState<string>(getScrambled);

  useEffect(() => {
    if (!active) {
      setDisplayText(getScrambled());
      return;
    }

    let frameId: number;
    const delayTimer = setTimeout(() => {
      const startTime = performance.now();
      const length = targetText.length;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Progressively lock characters in from left to right
        const resolvedCount = Math.floor(progress * length);

        let result = "";
        for (let i = 0; i < length; i++) {
          if (targetText[i] === " ") {
            result += " ";
          } else if (i < resolvedCount) {
            result += targetText[i];
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(update);
        } else {
          setDisplayText(targetText);
        }
      };

      frameId = requestAnimationFrame(update);
    }, delayMs);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(frameId);
    };
  }, [active, targetText, durationMs, delayMs]);

  return displayText;
}

export const AnimatedHeroText: React.FC<AnimatedHeroTextProps> = ({
  titlePrefix,
  titleSuffix,
  subtitle,
}) => {
  const { isLoaderComplete } = useLoader();
  const [triggered, setTriggered] = useState(false);

  // Trigger ONLY after the loading animation has completely finished and dissolved
  useEffect(() => {
    if (isLoaderComplete) {
      const timer = setTimeout(() => {
        setTriggered(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaderComplete]);

  // Cyber Decrypt scrambled strings
  const scrambledPrefix = useScramble(titlePrefix, triggered, 550, 0);
  const scrambledSuffix = useScramble(titleSuffix, triggered, 700, 100);
  const scrambledSubtitle = useScramble(subtitle, triggered, 500, 300);

  return (
    <>
      {/* Mobile Layout */}
      <div className="pointer-events-none absolute inset-0 z-10 flex h-full items-center justify-center px-2 md:hidden">
        <div className="flex w-full shrink-0 flex-col items-center select-none">
          <div className="mb-2 flex flex-col items-center justify-center text-center">
            {/* Title Prefix (OWASP) */}
            <div className="overflow-hidden pb-1">
              <div
                className="text-[100px] leading-17 font-bold tracking-[-2px] text-[#ABABAB] not-italic transition-opacity duration-200 sm:text-[40px]"
                style={{ opacity: triggered ? 1 : 0 }}
              >
                {scrambledPrefix}
              </div>
            </div>

            {/* Title Suffix (VIT Bhopal) */}
            <div className="overflow-hidden pb-1">
              <div
                className="text-[70px] leading-tight font-normal text-[#ABABAB] not-italic transition-opacity duration-200 sm:text-[40px]"
                style={{ opacity: triggered ? 1 : 0 }}
              >
                {scrambledSuffix}
              </div>
            </div>

            {/* Subtitle ("Student Chapter") */}
            <motion.div
              className="mt-1 text-[25px] leading-tight font-semibold tracking-wide text-[#ABABAB] not-italic sm:text-[12px]"
              initial={{ opacity: 0, y: 12 }}
              animate={triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {scrambledSubtitle}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden flex-col items-center justify-center px-2 md:flex">
        <div className="flex w-full shrink-0 flex-col select-none">
          {/* Main Title Row */}
          <div className="flex flex-row items-center justify-center">
            {/* Title Prefix (OWASP) */}
            <div className="overflow-hidden pb-1">
              <span
                className="inline-block text-[80px] leading-tight font-bold text-[#ABABAB] not-italic transition-opacity duration-200 md:text-[150px]"
                style={{ opacity: triggered ? 1 : 0 }}
              >
                {scrambledPrefix}
              </span>
            </div>

            {/* Title Suffix (VIT Bhopal) */}
            <div className="ml-8 overflow-hidden pb-1">
              <span
                className="inline-block text-[80px] leading-tight font-normal text-[#ABABAB] not-italic transition-opacity duration-200 md:text-[140px]"
                style={{ opacity: triggered ? 1 : 0 }}
              >
                {scrambledSuffix}
              </span>
            </div>
          </div>

          {/* Subtitle & Line Row */}
          <div className="mt-2 flex w-full flex-row items-center justify-end pr-8 md:pr-16">
            {/* Divider Line */}
            <motion.div
              className="mr-4 w-32 border-[3px] border-[#ABABAB] lg:w-40 lg:border-4"
              style={{ originX: 0 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                triggered
                  ? { scaleX: 1, opacity: 1 }
                  : { scaleX: 0, opacity: 0 }
              }
              transition={{
                duration: 0.7,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Subtitle ("Student Chapter") */}
            <motion.span
              className="text-[20px] leading-tight font-semibold text-[#ABABAB] not-italic lg:text-[28px] xl:text-[32px]"
              initial={{ opacity: 0, x: -16 }}
              animate={
                triggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }
              }
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {scrambledSubtitle}
            </motion.span>
          </div>
        </div>
      </div>
    </>
  );
};
