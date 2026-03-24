import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import Header from '@/components/layout/header'
import EventsList from "@/components/sections/EventsList";
import UpcomingEventCard from "@/components/cards/UpcomingEventCard";
import { upCommingEvents } from "@/Content/Events";

export const metadata: Metadata = {
  title: 'Events',
  description: 'Explore OWASP VIT Bhopal events — CTF competitions, workshops, bug-bounty sessions, and training programs designed to sharpen real-world cybersecurity skills.',
}

const page = () => {
  const upcomingEvent = upCommingEvents[0];

  return (
    <Container>
      <Header title='Events'>
        Explore our workshops, CTF competitions, and training programs designed to build practical cybersecurity skills and foster a culture of security awareness.      </Header>

      {upcomingEvent && (
        <>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium'>Upcoming Event</h2>
          <div className='w-full border-2 my-3 sm:my-4 border-dashed border-white/12' />

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

          <div className='my-6 sm:my-8 border-b border-dashed border-white/12' />
        </>
      )}

      <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium'>Past Events</h2>
      <div className='w-full border-2 my-3 sm:my-4 border-dashed border-white/12' />


      {/* <EventCard /> */}

      <EventsList />
    </Container>
  );
};

export default page;
