"use client";
import { Container } from "../ui/container";
import React, { useState } from "react";
import { pastEvents, upCommingEvents } from "../../Content/Events";
import Image from "next/image";
import UpcomingEventCard from "../cards/UpcomingEventCard";

interface AccordionProps {
  title: string;
  imageSrc?: string;
  description: string;
  open: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const EventCollapsible: React.FC<AccordionProps> = ({
  title,
  imageSrc,
  description,
  open,
  onHover,
  onLeave,
}) => {
  const [imageUrl, setimageUrl] = useState(
    imageSrc || "/members/placeholder.png",
  );

  const handleImageError = () => {
    setimageUrl("/members/placeholder.png");
  };
  return (
    <div
      className="mt-6 w-full rounded-3xl bg-[#121212] p-4 shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] transition-all duration-300 ease-in-out md:mt-8 md:p-6"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className="flex h-full w-full cursor-pointer items-center justify-between text-lg font-medium text-white"
        aria-expanded={open}
      >
        <span
          className={`h-full text-lg transition-all duration-300 ease-in-out md:text-2xl ${open ? "font-bold" : "font-light"}`}
        >
          {title}
        </span>
      </div>
      <div>
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:gap-6">
              {imageSrc && (
                <Image
                  src={imageUrl}
                  width={160}
                  height={128}
                  alt={title}
                  className="aspect-square h-32 w-full rounded-xl bg-[#111] object-cover transition-transform duration-300 ease-in-out hover:scale-105 md:h-32 md:w-40"
                  onError={handleImageError}
                />
              )}
              <p className="text-sm leading-relaxed text-(--muted-text) md:text-base">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);
  const upcomingEvent = upCommingEvents[0];

  return (
    <Container className="px-4 md:px-6 lg:px-8">
      <div className="mt-6 flex w-full flex-col items-stretch justify-between gap-8 md:mt-10 lg:flex-row lg:gap-20">
        <div className="flex h-full w-full flex-col gap-4 lg:w-1/2">
          <div className="text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
            Our Events
          </div>
          <div className="h-0.5 w-full bg-white/12" />
          <div className="text-sm font-normal text-(--muted-text) md:text-base">
            Over the years, we&apos;ve transformed the face of cybersecurity,
            thereby achieving a variety of undisputed accomplishments.
          </div>

          {/* Upcoming Event Card */}
          {upcomingEvent && (
            <UpcomingEventCard
              title={upcomingEvent.title}
              date={upcomingEvent.date}
              description={upcomingEvent.description}
              imgUrl={upcomingEvent.imgUrl}
              mode={upcomingEvent.mode}
              status={upcomingEvent.status}
            />
          )}
        </div>
        <div className="flex h-full w-full flex-col justify-between lg:w-1/2">
          {pastEvents.slice(0, 3).map((event, idx) => (
            <EventCollapsible
              key={idx}
              title={event.title}
              imageSrc={event.imgUrl}
              description={event.description}
              open={openIndex === idx}
              onHover={() => setOpenIndex(idx)}
              onLeave={() => {}}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EventSection;
