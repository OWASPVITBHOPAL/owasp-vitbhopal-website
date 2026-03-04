import React from "react";
import PastEvents from "@/components/sections/pastEvents";
import { Container } from "@/components/ui/container";
import { pastEvents } from "@/Content/Events";
import Header from '@/components/layout/header'


const page = () => {
  const sortedEvents = [...pastEvents].sort((a, b) => {
    const dateA = new Date(a.date.substring(0, 10));
    const dateB = new Date(b.date.substring(0, 10));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Container>
      <Header title='Events'>
Explore our workshops, CTF competitions, and training programs designed to build practical cybersecurity skills and foster a culture of security awareness.      </Header>


      <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium'>Past Events</h2>
      <div className='w-full border-2 my-3 sm:my-4 border-dashed border-white/12' />


      {/* <EventCard /> */}

      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-6 sm:gap-7 md:gap-8">
        {sortedEvents.map((event, idx) => (
          <PastEvents key={idx} {...event} />
        ))}
      </div>
    </Container>
  );
};

export default page;
