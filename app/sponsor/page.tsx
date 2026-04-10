import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import Header from "@/components/layout/header";
import { sponsors } from "@/Content/Sponsors";
import SponsorCard from "@/components/cards/sponsorCard";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Support OWASP VIT Bhopal — our sponsors help us run CTFs, workshops, and open-source security projects. Become a partner and invest in the next generation of cybersecurity engineers.",
};

export default function SponsorsPage() {
  const platinumSponsors = sponsors.filter((s) => s.tier === "Platinum");
  const goldSponsors = sponsors.filter((s) => s.tier === "Gold");
  const silverSponsors = sponsors.filter((s) => s.tier === "Silver");
  const bronzeSponsors = sponsors.filter((s) => s.tier === "Bronze");

  const renderSection = (title: string, items: typeof sponsors) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-white/90 md:text-3xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((sponsor, idx) => (
            <div key={idx} className="flex justify-center">
              <SponsorCard {...sponsor} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const hasSponsors =
    platinumSponsors.length > 0 ||
    goldSponsors.length > 0 ||
    silverSponsors.length > 0 ||
    bronzeSponsors.length > 0;

  return (
    <Container className="min-h-screen px-4 pb-20 md:px-6 lg:px-8">
      <Header title="Our Sponsors">
        We are proud to be supported by industry leaders who share our vision
        for a secure digital future. Their partnership enables us to deliver
        high-quality events and training.
      </Header>

      <div className="mt-12">
        {hasSponsors ? (
          <>
            {renderSection("Platinum Sponsors", platinumSponsors)}
            {renderSection("Gold Sponsors", goldSponsors)}
            {renderSection("Silver Sponsors", silverSponsors)}
            {renderSection("Bronze Sponsors", bronzeSponsors)}
          </>
        ) : (
          <div className="my-16">
            <div className="mb-12 w-full border-2 border-dashed border-white/12" />
            <div className="flex flex-col items-start gap-3">
              <p className="text-xs font-medium tracking-widest text-white/30 uppercase">
                Status
              </p>
              <h2 className="text-4xl font-medium text-white/90 md:text-5xl">
                Coming Soon.
              </h2>
              <p className="mt-2 max-w-lg text-sm text-(--muted-text) md:text-base">
                Our sponsors list is being updated. Partnerships and
                sponsorships for the current cycle will be announced here
                shortly.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-20 rounded-3xl bg-[#121212] p-8 text-center shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] md:p-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">
          Become a Sponsor
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-(--muted-text)">
          Partner with OWASP VIT Bhopal to reach passionate cybersecurity
          enthusiasts and future industry leaders.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-gray-200"
        >
          Contact Us
        </a>
      </div>
    </Container>
  );
}
