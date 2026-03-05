"use client";
import React, { useState } from "react";
import PastEvents from "@/components/sections/pastEvents";
import { pastEvents } from "@/Content/Events";
import EventModal from "@/components/ui/EventModal";

type EventType = typeof pastEvents[number];

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
      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-6 sm:gap-7 md:gap-8">
        {sortedEvents.map((event, idx) => (
          <PastEvents 
            key={idx} 
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
