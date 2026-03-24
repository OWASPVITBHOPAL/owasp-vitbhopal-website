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
  const [imageUrl, setimageUrl] = useState(imageSrc || "/members/placeholder.png");

  const handleImageError = () => {
    setimageUrl("/members/placeholder.png");
  };
  return (
    <div
      className="w-full rounded-2xl border-2 border-(--border) p-4 md:p-6 mt-6 md:mt-8 transition-all duration-300 ease-in-out hover:border-white/20"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className="w-full h-full flex justify-between items-center text-lg font-medium text-white cursor-pointer"
        aria-expanded={open}
      >
        <span className={`text-lg h-full md:text-2xl transition-all duration-300 ease-in-out ${open ? "font-bold" : "font-light"}`}>
          {title}
        </span>
      </div>
      <div>
        <div className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}>
          <div className="overflow-hidden">
            <div className="flex flex-col mt-4 md:flex-row gap-4 md:gap-6 items-center">
              {imageSrc && (
                <Image
                  src={imageUrl}
                  width={160}
                  height={128}
                  alt={title}
                  className="w-full md:w-40 h-32 md:h-32 object-cover rounded-xl bg-[#111] aspect-square transition-transform duration-300 ease-in-out hover:scale-105"
                  onError={handleImageError}
                />
              )}
              <p className="text-(--muted-text) text-sm md:text-base leading-relaxed">
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
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-stretch mt-6 md:mt-10">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 h-full">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">Our Events</div>
          <div className="w-full h-0.5 bg-white/12" />
          <div className="text-sm md:text-base font-normal text-(--muted-text)">
            Over the years, we&apos;ve transformed the face of cybersecurity, thereby
            achieving a variety of undisputed accomplishments.
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
        <div className="flex flex-col justify-between w-full lg:w-1/2 h-full">
          {pastEvents.slice(0, 3).map((event, idx) => (
            <EventCollapsible
              key={idx}
              title={event.title}
              imageSrc={event.imgUrl}
              description={event.description}
              open={openIndex === idx}
              onHover={() => setOpenIndex(idx)}
              onLeave={() => { }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EventSection;
