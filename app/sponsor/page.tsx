import React from "react";
import { Container } from "@/components/ui/container";
import Header from "@/components/layout/header";
import { sponsors } from "@/Content/Sponsors";
import SponsorCard from "@/components/cards/sponsorCard";

export default function SponsorsPage() {
  const platinumSponsors = sponsors.filter((s) => s.tier === "Platinum");
  const goldSponsors = sponsors.filter((s) => s.tier === "Gold");
  const silverSponsors = sponsors.filter((s) => s.tier === "Silver");
  const bronzeSponsors = sponsors.filter((s) => s.tier === "Bronze");
  
  // Group logic could be dynamic, but this is simple for now.
  // If we want a generic grid, we can just map all sponsors if no distinct sections needed.
  // But usually sponsors are grouped by tier.

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

  return (
    <Container className="min-h-screen pb-20">
      <Header title="Our Sponsors">
        We are proud to be supported by industry leaders who share our vision for a 
        secure digital future. Their partnership enables us to deliver high-quality 
        events and training.
      </Header>

      <div className="mt-12">
        {platinumSponsors.length > 0 && renderSection("Platinum Sponsors", platinumSponsors)}
        {goldSponsors.length > 0 && renderSection("Gold Sponsors", goldSponsors)}
        {silverSponsors.length > 0 && renderSection("Silver Sponsors", silverSponsors)}
        {bronzeSponsors.length > 0 && renderSection("Bronze Sponsors", bronzeSponsors)}
        
        {/* Fallback if no tiers match or just general list */}
        {platinumSponsors.length === 0 && goldSponsors.length === 0 && silverSponsors.length === 0 && bronzeSponsors.length === 0 && (
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {sponsors.map((sponsor, idx) => (
                <div key={idx} className="flex justify-center">
                  <SponsorCard {...sponsor} />
                </div>
             ))}
           </div>
        )}
      </div>

      <div className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">Become a Sponsor</h2>
        <p className="mx-auto max-w-2xl text-[var(--muted-text)] mb-8">
          Partner with OWASP VIT Bhopal to reach passionate cybersecurity enthusiasts 
          and future industry leaders.
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
