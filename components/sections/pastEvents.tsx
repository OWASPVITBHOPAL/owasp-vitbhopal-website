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
  onClick?: () => void;
}

const PastEvents: React.FC<PastEventsProps> = ({
  imgUrl,
  title,
  date,
  description,
  venue,
  onClick,
}) => {
  const [imageSrc, setImageSrc] = useState(
    imgUrl || "/members/placeholder.png",
  );

  const handleImageError = () => {
    setImageSrc("/members/placeholder.png");
  };

  const formatDate = (dateStr: string) => {
    return dateStr.replaceAll(/(\d{4})-(\d{2})-(\d{2})/g, "$3-$2-$1");
  };

  return (
    <button
      type="button"
      className="group mx-auto h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#121212] text-left shadow-md transition-colors hover:bg-[#181818]"
      onClick={onClick}
    >
      <div className="flex h-full flex-col">
        {imgUrl && (
          <div className="p-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-[calc(var(--radius-2xl)-(--spacing(2)))] border border-white/10">
              <Image
                src={imageSrc}
                alt={title}
                width={320}
                height={240}
                className="h-full w-full rounded-[calc(var(--radius-2xl)-(--spacing(2)))] object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
        )}

        <div className="relative z-10 flex h-full w-full flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-col gap-3">
            <h3 className="line-clamp-2 pr-2 text-xl font-semibold text-white sm:text-2xl">
              {title}
            </h3>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm text-white/80 sm:text-base">
            <div className="flex items-center gap-2">
              <LocationLogo className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm lg:text-base">
                {venue || "VIT Bhopal University, Bhopal"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm">
              <CalenderLogo />
              <span className="whitespace-nowrap">{formatDate(date)}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PastEvents;
