import Image from "next/image";
import type { PastSpeaker } from "@/Content/Speakers";

type PastSpeakerCardProps = {
  speaker: PastSpeaker;
};

const arrowIcon = (
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
);

const baseClassName =
  "group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-md";

export default function PastSpeakerCard({
  speaker,
}: Readonly<PastSpeakerCardProps>) {
  const cardContent = (
    <>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          className="h-full w-full rounded-2xl object-cover"
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
            {arrowIcon}
          </span>
        )}
      </div>
    </>
  );

  if (speaker.socialLink) {
    return (
      <a
        href={speaker.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${speaker.name} profile`}
        className={`${baseClassName} cursor-pointer transition-colors hover:bg-[#181818] focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none`}
      >
        {cardContent}
      </a>
    );
  }

  return <article className={baseClassName}>{cardContent}</article>;
}
