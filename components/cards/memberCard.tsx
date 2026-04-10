"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MemberCardProps {
  image: string;
  name: string;
  position?: string;
  alt?: string;
  href?: string;
}

const arrowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const baseClassName =
  "group relative flex w-full flex-col overflow-hidden rounded-3xl shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] bg-[#121212]";

const MemberCard: React.FC<Readonly<MemberCardProps>> = ({
  image,
  name,
  position,
  alt,
  href = "#",
}) => {
  const [imageSrc, setImageSrc] = useState(image || "/members/placeholder.png");

  const handleImageError = () => {
    setImageSrc("/members/placeholder.png");
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${name}'s profile`}
      className={`${baseClassName} cursor-pointer transition-colors`}
    >
      <div className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-[calc(var(--radius-3xl)-(--spacing(2)))] shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01),0px_4px_5px_0px_rgba(0,0,0,0.25)]">
          <Image
            src={imageSrc}
            fill
            alt={alt || name}
            className="h-full w-full scale-110 rounded-[calc(var(--radius-3xl)-(--spacing(2)))] object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base leading-4 font-semibold text-white md:text-lg">
            {name}
          </h3>
          {position && (
            <p className="text-sm whitespace-pre-wrap text-gray-300 opacity-80">
              {position}
            </p>
          )}
        </div>
        <span className="shrink-0 text-white/50 transition-colors group-hover:text-white">
          {arrowIcon}
        </span>
      </div>
    </Link>
  );
};

export default MemberCard;
