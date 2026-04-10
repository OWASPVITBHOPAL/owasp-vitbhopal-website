import React from "react";
import { EventcardSVG } from "../shared/svg";
import { upCommingEvents } from "../../Content/Events";

const eventCard = () => {
  return (
    <div className="flex flex-col gap-8">
      {upCommingEvents.map((event, idx) => (
        <div
          key={event.title + idx}
          className="relative flex h-[144px] w-[480px] flex-col justify-between overflow-hidden rounded-3xl shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)]"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <EventcardSVG />
          </div>
          <div className="relative z-10 flex h-full w-full flex-col justify-between p-4">
            <div>
              <div className="mb-2 text-[26px] leading-[18px] font-bold text-white/60">
                {event.title}
              </div>
            </div>
            <div className="flex h-full w-full flex-row items-end justify-between">
              <div className="mb-2 flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-[16px] leading-[18px] font-bold text-white/60">
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
              <div className="mb-2 flex w-full justify-end">
                <button className="group relative flex cursor-pointer items-center justify-center border-none bg-transparent p-0 outline-none">
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
                  <span className="font-figtree absolute inset-0 flex items-center justify-center text-[18px] font-bold tracking-[0.01em] text-black">
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
