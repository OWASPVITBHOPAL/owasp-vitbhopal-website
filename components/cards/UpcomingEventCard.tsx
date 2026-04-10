"use client";
import React from "react";
import Image from "next/image";
import { CalenderLogo } from "../shared/svg";
import { Button } from "../ui/button";

interface UpcomingEventCardProps {
  title: string;
  date: string;
  description: string;
  imgUrl?: string;
  mode?: string;
  status?: string;
  layout?: "compact" | "detailed";
  detailsHref?: string;
  detailsLabel?: string;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  title,
  date,
  description,
  imgUrl,
  mode = "Online",
  status = "Upcoming",
  layout = "compact",
  detailsHref = "/events/hackzero",
  detailsLabel = "View Details",
}) => {
  if (layout === "detailed") {
    return (
      <div className="group relative mt-6 w-full overflow-hidden rounded-3xl bg-[#121212] shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] transition-colors hover:bg-[#181818] md:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {imgUrl && (
            <div className="p-2">
              <div className="relative h-64 min-h-64 w-full overflow-hidden rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-[#111] md:h-full">
                <Image
                  src={imgUrl}
                  alt={title}
                  fill
                  className="rounded-[calc(var(--radius-2xl)-(--spacing(2)))] object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-black/30" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 p-5 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/80 uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
                </span>
                {status}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/3 px-2.5 py-1 text-[10px] font-medium tracking-wider text-(--muted-text) uppercase">
                {mode}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/3 px-2.5 py-1 text-[10px] font-medium tracking-wider text-(--muted-text) uppercase">
                Registrations Open
              </span>
            </div>

            <h3 className="text-2xl leading-tight font-semibold tracking-tight text-white md:text-3xl">
              {title}
            </h3>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-(--muted-text)">
              <CalenderLogo className="h-4 w-4 opacity-80" />
              <span className="text-sm font-medium">{date}</span>
            </div>

            <p className="text-sm leading-relaxed text-(--muted-text) md:text-base">
              {description}
            </p>

            <div className="mt-auto flex items-center gap-2">
              <Button
                href={detailsHref}
                className="h-9 rounded-full px-4 text-xs"
              >
                {detailsLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mt-6 w-full overflow-hidden rounded-3xl bg-[#121212] shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] transition-colors hover:bg-[#181818] md:mt-8">
      {/* Banner image — full, no trim */}
      {imgUrl && (
        <div className="p-2">
          <div className="relative w-full overflow-hidden rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-[#111]">
            <Image
              src={imgUrl}
              alt={title}
              width={800}
              height={300}
              className="h-auto w-full rounded-[calc(var(--radius-2xl)-(--spacing(2)))] object-contain transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      )}

      {/* Card content — tight */}
      <div className="flex flex-col gap-2.5 px-4 py-3">
        {/* Top row: badges left, Stay Tuned right */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white/80 uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
              </span>
              {status}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/3 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-(--muted-text) uppercase">
              {mode}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/3 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-(--muted-text) uppercase">
              Open
            </span>
          </div>
          <Button
            href="/events/hackzero"
            className="h-8 rounded-lg px-3.5 text-xs"
          >
            Register
          </Button>
        </div>

        {/* Title + Date row */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg leading-snug font-bold tracking-tight text-white md:text-xl">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1.5 text-(--muted-text)">
            <CalenderLogo className="h-3.5 w-3.5 opacity-70" />
            <span className="text-xs font-medium whitespace-nowrap">
              {date}
            </span>
          </div>
        </div>

        {/* Description — single line */}
        <p className="text-xs leading-relaxed text-(--muted-text)">
          {description}
        </p>

        <div className="pt-1">
          <Button href={detailsHref} className="h-8 rounded-lg px-3.5 text-xs">
            {detailsLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
