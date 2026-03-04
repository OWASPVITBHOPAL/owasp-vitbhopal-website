"use client";
import React from "react";
import Image from "next/image";
import { CalenderLogo } from "../shared/svg";

interface UpcomingEventCardProps {
    title: string;
    date: string;
    description: string;
    imgUrl?: string;
    mode?: string;
    status?: string;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
    title,
    date,
    description,
    imgUrl,
    mode = "Online",
    status = "Upcoming",
}) => {
    return (
        <div className="group relative w-full mt-6 md:mt-8 rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
            {/* Gradient accent bar at top */}
            <div className="h-[2px] w-full bg-gradient-to-r from-white/60 via-white/30 to-white/10" />

            {/* Banner image — compact */}
            {imgUrl && (
                <div className="relative w-full h-28 sm:h-32 overflow-hidden">
                    <Image
                        src={imgUrl}
                        alt={title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
                </div>
            )}

            {/* Card content — tight */}
            <div className="px-4 py-3 flex flex-col gap-2.5">
                {/* Top row: badges left, Stay Tuned right */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/70" />
                            </span>
                            {status}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-medium uppercase tracking-wider text-[var(--muted-text)]">
                            {mode}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-medium uppercase tracking-wider text-[var(--muted-text)]">
                            Open
                        </span>
                    </div>
                    <div className="px-3.5 py-1 rounded-lg border border-white/15 bg-white/5 text-xs font-semibold text-white/80 tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/25 cursor-default select-none">
                        Stay Tuned
                    </div>
                </div>

                {/* Title + Date row */}
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[var(--muted-text)] shrink-0">
                        <CalenderLogo className="w-3.5 h-3.5 opacity-70" />
                        <span className="text-xs font-medium whitespace-nowrap">{date}</span>
                    </div>
                </div>

                {/* Description — single line */}
                <p className="text-xs text-[var(--muted-text)] leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default UpcomingEventCard;
