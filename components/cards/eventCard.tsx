import React from "react";
import { EventcardSVG } from "../shared/svg";
import { upCommingEvents } from "../../Content/Events";

const eventCard = () => {
  return (
    <div className="flex flex-col gap-8">
      {upCommingEvents.map((event, idx) => (
        <div
          key={event.title + idx}
          className="relative w-[480px] h-[144px] flex flex-col justify-between"
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            <EventcardSVG />
          </div>
          <div className="relative z-10 p-4 flex flex-col justify-between w-full h-full">
            <div>
              <div className="text-[26px] leading-[18px] font-bold  text-white/60 mb-2">
                {event.title}
              </div>
            </div>
            <div className="flex flex-row justify-between items-end w-full h-full">
              <div className="flex flex-col gap-1 mb-2">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-[16px] leading-[18px] font-bold  text-white/60">
                    Date:
                  </span>
                  <span className="text-[16px] leading-[18px] font-normal text-white/60 opacity-60">
                    {event.date}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="text-[16px] leading-[18px] font-bold text-white/60">
                    Time:
                  </span>
                  <span className="text-[16px] leading-[18px] font-normal text-white/60 opacity-60">
                    {event.time}
                  </span>
                </div>
              </div>
              <div className="flex justify-end w-full mb-2">
                <button className="group relative flex items-center justify-center p-0 border-none bg-transparent cursor-pointer outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="124"
                    height="40"
                    viewBox="0 0 124 40"
                    fill="none"
                  >
                    <path
                      d="M30.3857 1.5L1.5 17.3867V38.5H94.1406L122.5 24.0801V1.5H30.3857Z"
                      fill="#FFF"
                      stroke="#FFF"
                      strokeWidth="3"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-black font-figtree font-bold text-[18px] tracking-[0.01em]">
                    Register
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default eventCard;
