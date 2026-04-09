"use client";
import React, { useState } from "react";
import PastEvents from "@/components/sections/pastEvents";
import { pastEvents } from "@/Content/Events";
import EventModal from "@/components/ui/EventModal";

type EventType = (typeof pastEvents)[number];

const EventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedEvents = [...pastEvents].sort((a, b) => {
    const dateA = new Date(a.date.substring(0, 10));
    const dateB = new Date(b.date.substring(0, 10));
    return dateB.getTime() - dateA.getTime();
  });

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:gap-7 md:mt-12 md:auto-rows-fr md:grid-cols-2 md:gap-8">
        {sortedEvents.map((event) => (
          <PastEvents
            key={`${event.title}-${event.date}`}
            {...event}
            onClick={() => handleEventClick(event)}
          />
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default EventsList;
