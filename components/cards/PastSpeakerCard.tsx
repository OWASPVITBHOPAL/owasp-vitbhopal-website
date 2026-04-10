"use client";
import React, { useState } from "react";
import Image from "next/image";
import type { PastSpeaker } from "@/Content/Speakers";

type PastSpeakerCardProps = {
  speaker: PastSpeaker;
};

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

export default function PastSpeakerCard({
  speaker,
}: Readonly<PastSpeakerCardProps>) {
  const cardContent = (
    <>
      <div className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-[calc(var(--radius-3xl)-(--spacing(2)))] shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01),0px_4px_5px_0px_rgba(0,0,0,0.25)]">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="h-full w-full scale-110 rounded-[calc(var(--radius-3xl)-(--spacing(2)))] object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base leading-4 font-semibold text-white md:text-lg">
            {speaker.name}
          </h3>
          <span className="text-sm whitespace-pre-wrap text-gray-300 opacity-80">
            {speaker.role}
          </span>
        </div>
        {speaker.socialLink && (
          <span className="shrink-0 text-white/50 transition-colors group-hover:text-white">
            {arrowIcon}
          </span>
        )}
      </div>
    </>
  );

  if (speaker.socialLink) {
    return (
      <a
        href={speaker.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${speaker.name} profile`}
        className={`${baseClassName} cursor-pointer transition-colors`}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={baseClassName}>{cardContent}</div>;
}
