"use client";
import { Container } from "@/components/ui/container";
import Header from "@/components/layout/header";
import React from "react";
import { motion } from "framer-motion";
import { aboutContent } from "@/Content/About";
import { IconWorld, IconBuildingCommunity } from "@tabler/icons-react";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─── section separator ─── */
const Separator = () => (
  <div className="my-6 w-full border-2 border-dashed border-white/12 md:my-8" />
);

/* ─── section heading ─── */
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-medium md:text-3xl lg:text-4xl">{children}</h2>
);

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function AboutPage() {
  const {
    intro,
    stats,
    pillars,
    activities,
    owaspSection,
    standForTitle,
    whatWeDoTitle,
    joinCta,
  } = aboutContent;

  return (
    <Container className="min-h-screen overflow-x-hidden px-4 pb-20 md:px-6 lg:px-8">
      {/* ── Section 1: Hero Header ── */}
      <Header title={intro.title}>{intro.description}</Header>

      {/* ── Section 2: The OWASP Connection ── */}
      <div className="mt-20 md:mt-28">
        <SectionHeading>{owaspSection.title}</SectionHeading>
        <Separator />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* left — narrative */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
          >
            <p className="max-w-xl text-sm leading-relaxed text-(--muted-text) md:text-base">
              {owaspSection.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <IconWorld className="h-4 w-4 text-white/40" />
              <a
                href={owaspSection.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/40 underline underline-offset-4 transition-colors hover:text-white/70"
              >
                {owaspSection.linkText}
              </a>
            </div>
          </motion.div>

          {/* right — stat cards */}
          <div className="flex flex-col gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-3xl bg-[#121212] p-5 shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] md:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i + 1}
              >
                <p className="text-xs font-medium tracking-widest text-white/30 uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 text-3xl font-bold text-white/90 md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-(--muted-text)">{stat.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Mission / Vision / Values ── */}
      <div className="mt-20 md:mt-28">
        <SectionHeading>{standForTitle}</SectionHeading>
        <Separator />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="flex flex-col gap-4 rounded-3xl bg-[#121212] p-6 shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] md:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
              >
                <Icon className="h-7 w-7 text-white/50" />
                <p className="text-xs font-medium tracking-widest text-white/30 uppercase">
                  {pillar.title}
                </p>
                <p className="text-sm leading-relaxed text-(--muted-text) md:text-base">
                  {pillar.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Section 4: What We Do ── */}
      <div className="mt-20 md:mt-28">
        <SectionHeading>{whatWeDoTitle}</SectionHeading>
        <Separator />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {activities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.category}
                className="flex flex-col gap-4 rounded-3xl bg-[#121212] p-6 shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] transition-colors hover:bg-[#181818] md:p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-5 w-5 text-white/70" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 md:text-xl">
                    {activity.category}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-(--muted-text) md:text-base">
                  {activity.items}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Section 5: Join CTA ── */}
      <motion.div
        className="mt-20 rounded-3xl bg-[#121212] p-8 text-center shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] md:mt-28 md:p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
      >
        <IconBuildingCommunity className="mx-auto mb-4 h-10 w-10 text-white/40" />
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">{joinCta.title}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-(--muted-text)">
          {joinCta.description}
        </p>
        <a
          href={joinCta.buttonHref}
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-gray-200"
        >
          {joinCta.buttonText}
        </a>
      </motion.div>
    </Container>
  );
}
