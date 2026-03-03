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
    <div className="group relative w-full rounded-2xl border border-gray-600/40 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 overflow-visible bg-white/5 backdrop-blur-[75px]">
      
      {/* Photo Container */}
      <div className="relative w-full sm:w-[180px] md:w-[240px] lg:w-[280px] h-[180px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden flex-shrink-0 rounded-[18px] border-[3px] border-[#E18C50] bg-gradient-to-b from-transparent to-black -mt-8 sm:-mt-10 md:-mt-12 z-30 shadow-2xl">
        
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top rounded-[15px]"
          priority
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />

        {/* Subtitle */}
        {subtitle && (
          <div className="absolute left-2 sm:left-3 bottom-2 sm:bottom-3 text-white text-xs sm:text-sm font-extrabold z-20">
            {subtitle}
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="relative z-10 flex-1 w-full sm:w-auto">
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white/90">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
