import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import Header from '@/components/layout/header'
import EventsList from "@/components/sections/EventsList";

export const metadata: Metadata = {
  title: 'Events',
  description: 'Explore OWASP VIT Bhopal events — CTF competitions, workshops, bug-bounty sessions, and training programs designed to sharpen real-world cybersecurity skills.',
}

const page = () => {
  return (
    <Container>
      <Header title='Events'>
        Explore our workshops, CTF competitions, and training programs designed to build practical cybersecurity skills and foster a culture of security awareness.      </Header>


      <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium'>Past Events</h2>
      <div className='w-full border-2 my-3 sm:my-4 border-dashed border-white/12' />


      {/* <EventCard /> */}

      <EventsList />
    </Container>
  );
};

export default page;
