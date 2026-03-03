"use client";
import { Container } from "../ui/container";
import React, { useState } from "react";
import { pastEvents } from "../../Content/Events";
import Image from "next/image";

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
      className="w-full rounded-2xl border-2 border-[var(--border)] p-4 md:p-6 mt-6 md:mt-8 transition-all duration-300 ease-in-out hover:border-white/20"
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
              <p className="text-[var(--muted-text)] text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// interface UpcomingEventProps {
//   events: Array<{
//     title: string;
//     date: string;
//     description: string;
//     link?: string;
//     imgUrl?: string;
//     time?: string;
//     venue?: string;
//   }>;
// }

// const UpcomingEvent: React.FC<UpcomingEventProps> = ({ events }) => {
//   return (
//     <div className="w-full rounded-2xl border-2 border-[var(--border)] mt-8 ">
//       <div className="w-full h-full flex flex-col p-6">
//         <div className="flex justify-between items-center">
//           <div className="text-3xl font-medium">Upcoming Event</div>
//           <div>
//             <a
//               href="/events"
//               className="text-md font-medium transition-transform duration-200 group"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right transition-transform duration-200 group-hover:rotate-0 rotate-45"
//               >
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                 <path d="M17 7l-10 10" />
//                 <path d="M8 7l9 0l0 9" />
//               </svg>
//             </a>
//           </div>
//         </div>
//         <div className="w-full h-[2px] bg-[var(--border)] my-4" />
//         {events.map((event, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col md:flex-row gap-6 items-center mb-6"
//           >
//             {event.imgUrl ? (
//               <Image
//                 src={event.imgUrl}
//                 width={200}
//                 height={200}
//                 alt={event.title}
//                 className="w-full md:w-1/2 h-58 bg-white rounded-2xl aspect-square object-cover"
//               />
//             ) : (
//               <div className="w-full md:w-1/2 h-58 bg-white rounded-2xl aspect-square" />
//             )}
//             <div className="flex flex-col gap-4">
//               <div className="text-2xl font-semibold">{event.title}</div>
//               <div className="text-sm font-normal text-[var(--muted-text)]">
//                 {event.description}
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-[var(--muted-text)]">
//                   Date: {event.date}
//                 </div>
//                 <div className="text-sm font-medium text-[var(--muted-text)]">
//                   Time: {event.time}
//                 </div>
//                 <div className="text-sm font-medium text-[var(--muted-text)]">
//                   Location: {event.venue}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const EventSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(1);
  return (
    <Container className="px-4 md:px-6 lg:px-8">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-start mt-6 md:mt-10">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 h-full">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">Our Events</div>
          <div className="w-full h-[2px] bg-white/12" />
          <div className="text-sm md:text-base font-normal text-[var(--muted-text)]">
            Over the years, we&apos;ve transformed the face of cybersecurity, thereby
            achieving a variety of undisputed accomplishments.
          </div>
          {/* <UpcomingEvent events={upCommingEvents} /> */}
        </div>
        <div className="flex flex-col justify-between w-full lg:w-1/2 h-full">
          {pastEvents.slice(0,3).map((event, idx) => (
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
