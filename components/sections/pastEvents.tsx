"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CalenderLogo, LocationLogo } from "../shared/svg";

interface PastEventsProps {
  imgUrl?: string;
  title: string;
  date: string;
  description: string;
  venue?: string;
}

const PastEvents: React.FC<PastEventsProps> = ({ imgUrl, title, date, description, venue }) => {
  const [imageSrc, setImageSrc] = useState(imgUrl || "/members/placeholder.png");

  const handleImageError = () => {
    setImageSrc("/members/placeholder.png");
  };

  const formatDate = (dateStr: string) => {
    return dateStr.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$3-$2-$1');
  };

  return (
    <div className="flex flex-col max-w-6xl md:flex-row items-start h-auto md:h-60 w-full mx-auto gap-4 md:gap-6">
      {/* Image - only visible on desktop */}
      <div className="hidden md:flex rounded-2xl w-[280px] lg:w-[320px] md:flex-shrink-0 h-full items-center justify-center overflow-hidden">
        {imgUrl ? (
          <Image
            src={imageSrc}
            alt={title}
            width={320}
            height={240}
            className="rounded-[10px] h-full w-full object-cover"
            onError={handleImageError}
          />
        ) : null}
      </div>

      <div className="relative border-2 border-[var(--border)] rounded-2xl flex-1 h-auto md:h-full w-full">
        <div className="relative z-10 flex flex-col h-full justify-between p-4 sm:p-6 lg:p-8 w-full">
          {/* Image - only visible on mobile, inside border */}
          {imgUrl && (
            <div className="md:hidden rounded-2xl w-full h-48 mb-4 overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                width={200}
                height={200}
                className="rounded-[10px] h-full w-full object-cover"
                onError={handleImageError}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <div className="text-white text-xl sm:text-2xl font-bold mb-2">
              {title}
            </div>
            <div className="flex flex-row items-center w-fit text-xs sm:text-sm gap-2 bg-white/10 rounded-full px-3 py-1.5 h-fit">
              <CalenderLogo />
              <span className="whitespace-nowrap">Date: {formatDate(date)}</span>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80">
            {description}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm sm:text-base mt-3 sm:mt-4">
            <LocationLogo className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm lg:text-base">{venue || "VIT Bhopal University, Bhopal"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
