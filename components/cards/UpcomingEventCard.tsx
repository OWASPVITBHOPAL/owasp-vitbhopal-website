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
            <div className="group relative w-full mt-6 md:mt-8 rounded-2xl border border-(--border) bg-white/3 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                    {imgUrl && (
                        <div className="relative w-full h-64 md:h-full min-h-64 overflow-hidden bg-[#111]">
                            <Image
                                src={imgUrl}
                                alt={title}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 55vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-black/30" />
                        </div>
                    )}

                    <div className="p-5 md:p-7 flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/70" />
                                </span>
                                {status}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/10 bg-white/3 text-[10px] font-medium uppercase tracking-wider text-(--muted-text)">
                                {mode}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/10 bg-white/3 text-[10px] font-medium uppercase tracking-wider text-(--muted-text)">
                                Registrations Open
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight">
                            {title}
                        </h3>

                        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-(--muted-text)">
                            <CalenderLogo className="w-4 h-4 opacity-80" />
                            <span className="text-sm font-medium">{date}</span>
                        </div>

                        <p className="text-sm md:text-base text-(--muted-text) leading-relaxed">
                            {description}
                        </p>

                        <div className="mt-auto flex items-center gap-2">
                            <Button href={detailsHref} className="h-9 rounded-full px-4 text-xs">
                                {detailsLabel}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" relative w-full mt-6 md:mt-8 rounded-2xl border border-(--border) overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
            {/* Banner image — full, no trim */}
            {imgUrl && (
                <div className="relative w-full overflow-hidden bg-[#111]">
                    <Image
                        src={imgUrl}
                        alt={title}
                        width={800}
                        height={300}
                        className="w-full h-auto object-contain transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
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
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-medium uppercase tracking-wider text-(--muted-text)">
                            {mode}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-medium uppercase tracking-wider text-(--muted-text)">
                            Open
                        </span>
                    </div>
                    <Button href="/events/hackzero" className="h-8 rounded-lg px-3.5 text-xs">
                        Register
                    </Button>
                </div>

                {/* Title + Date row */}
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-(--muted-text) shrink-0">
                        <CalenderLogo className="w-3.5 h-3.5 opacity-70" />
                        <span className="text-xs font-medium whitespace-nowrap">{date}</span>
                    </div>
                </div>

                {/* Description — single line */}
                <p className="text-xs text-(--muted-text) leading-relaxed">
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
