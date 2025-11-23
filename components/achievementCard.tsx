"use client";
import React from "react";
import Image from "next/image";

interface AchievementCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  gradientClass?: string;
}

export default function AchievementCard({
  image,
  title,
  subtitle,
  description,
  gradientClass,
}: AchievementCardProps) {
  return (
    <div className="group relative w-full rounded-2xl border border-gray-600/40 p-4 flex items-start gap-6 overflow-visible bg-white/5 backdrop-blur-[75px]">
      
      {/* Photo Container */}
      <div className="relative w-[280px] h-[200px] overflow-hidden flex-shrink-0 rounded-[18px] border-[3px] border-[#E18C50] bg-gradient-to-b from-transparent to-black -mt-12 z-30 shadow-2xl">
        
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
          <div className="absolute left-3 bottom-3 text-white text-sm font-extrabold z-20">
            {subtitle}
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="relative z-10 flex-1">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-white/90">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-white/60 text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
