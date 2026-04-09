import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import Header from "@/components/layout/header";
import EventsList from "@/components/sections/EventsList";
import UpcomingEventCard from "@/components/cards/UpcomingEventCard";
import { pastSpeakers, upCommingEvents } from "@/Content/Events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore OWASP VIT Bhopal events — CTF competitions, workshops, bug-bounty sessions, and training programs designed to sharpen real-world cybersecurity skills.",
};

const page = () => {
  const upcomingEvent = upCommingEvents[0];

  return (
    <Container>
      <Header title="Events">
        Explore our workshops, CTF competitions, and training programs designed
        to build practical cybersecurity skills and foster a culture of security
        awareness.{" "}
      </Header>

      {upcomingEvent && (
        <>
          <h2 className="text-2xl font-medium sm:text-3xl md:text-4xl">
            Upcoming Event
          </h2>
          <div className="my-3 w-full border-2 border-dashed border-white/12 sm:my-4" />

          <UpcomingEventCard
            title={upcomingEvent.title}
            date={upcomingEvent.date}
            description={upcomingEvent.description}
            imgUrl={upcomingEvent.headerSmallImg}
            mode={upcomingEvent.mode}
            status={upcomingEvent.status}
            layout="detailed"
            detailsHref={`/events/${upcomingEvent.slug}`}
            detailsLabel="View Full Details"
          />

          <div className="my-6 border-b border-dashed border-white/12 sm:my-8" />
        </>
      )}

      <section className="mb-10 sm:mb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium sm:text-3xl md:text-4xl">
              Past Speakers
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-(--muted-text) sm:text-base">
              A spotlight on the speakers who have shaped our past events and
              shared their expertise.
            </p>
          </div>
        </div>

        <div className="my-3 w-full border-2 border-dashed border-white/12 sm:my-4" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {pastSpeakers.map((speaker) => {
            const cardContent = (
              <>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
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
                    </span>
                  )}
                </div>
              </>
            );

            if (speaker.socialLink) {
              return (
                <a
                  key={speaker.name}
                  href={speaker.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${speaker.name} profile`}
                  className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[14px] bg-[#121212] shadow-md transition-colors hover:bg-[#181818] focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <article
                key={speaker.name}
                className="group relative flex w-full flex-col overflow-hidden rounded-[14px] bg-[#121212] shadow-md"
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      </section>

      <h2 className="text-2xl font-medium sm:text-3xl md:text-4xl">
        Past Events
      </h2>
      <div className="my-3 w-full border-2 border-dashed border-white/12 sm:my-4" />

      {/* <EventCard /> */}

      <EventsList />
    </Container>
  );
};

export default page;
