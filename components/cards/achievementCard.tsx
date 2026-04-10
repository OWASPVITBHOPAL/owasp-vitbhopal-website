"use client";
import React from "react";
import Image from "next/image";

interface AchievementCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export default function AchievementCard({
  image,
  title,
  subtitle,
  description,
}: AchievementCardProps) {
  return (
    <div className="group relative flex w-full flex-col items-start gap-4 overflow-visible rounded-3xl bg-white/5 p-3 shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] backdrop-blur-[75px] sm:flex-row sm:gap-6 sm:p-4 md:p-6">
      {/* Photo Container */}
      <div className="relative z-30 -mt-8 h-[180px] w-full flex-shrink-0 overflow-hidden rounded-[18px] border-[3px] border-[#E18C50] bg-gradient-to-b from-transparent to-black shadow-2xl sm:-mt-10 sm:h-[160px] sm:w-[180px] md:-mt-12 md:h-[180px] md:w-[240px] lg:h-[200px] lg:w-[280px]">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-[15px] object-cover object-top"
          priority
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/70" />

        {/* Subtitle */}
        {subtitle && (
          <div className="absolute bottom-2 left-2 z-20 text-xs font-extrabold text-white sm:bottom-3 sm:left-3 sm:text-sm">
            {subtitle}
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="relative z-10 w-full flex-1 sm:w-auto">
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-white/90 sm:text-xl md:text-2xl">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
