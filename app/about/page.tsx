'use client'
import { Container } from '@/components/ui/container'
import Header from '@/components/layout/header'
import React from 'react'
import { motion } from 'framer-motion'
import {
  IconBook,
  IconTrophy,
  IconCode,
  IconUsers,
  IconTarget,
  IconEye,
  IconHeart,
  IconShieldCheck,
  IconWorld,
  IconBuildingCommunity,
} from '@tabler/icons-react'

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

/* ─── data ─── */
const owaspStats = [
  { label: 'Founded', value: '2022', note: 'at VIT Bhopal University' },
  { label: 'OWASP Chapters', value: '300+', note: 'across the globe' },
  { label: 'OWASP Projects', value: '100+', note: 'open-source & community-led' },
]

const pillars = [
  {
    icon: IconTarget,
    title: 'Mission',
    body: 'Make security a core skill — not an elective. We run workshops, write research, and break things so our members graduate knowing what secure software actually looks like.',
  },
  {
    icon: IconEye,
    title: 'Vision',
    body: 'A campus where security gets taken seriously before production — not after an incident. Engineers who ship safe code by default.',
  },
  {
    icon: IconHeart,
    title: 'Values',
    body: 'Openness over gatekeeping. Doing over discussing. If you\'re curious enough to ask how it breaks, you belong here.',
  },
]

const activities = [
  {
    icon: IconBook,
    category: 'Learning',
    items: 'Researching cybersecurity domains, running workshops & hands-on training programmes for the campus.',
  },
  {
    icon: IconTrophy,
    category: 'Competing',
    items: 'Participating & organising CTFs worldwide, bug-bounty hunting, and authoring CVEs.',
  },
  {
    icon: IconCode,
    category: 'Building',
    items: 'Contributing to open-source security tools, designing & testing hardware security modules.',
  },
  {
    icon: IconUsers,
    category: 'Contributing',
    items: 'Collaborating on international cybersecurity research projects and providing consultancy services.',
  },
]

/* ─── section separator ─── */
const Separator = () => (
  <div className='w-full border-2 my-6 md:my-8 border-dashed border-white/12' />
)

/* ─── section heading ─── */
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium'>{children}</h2>
)

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <Container className='min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8 pb-20'>

      {/* ── Section 1: Hero Header ── */}
      <Header title='About Us'>
        Founded in 2022 at VIT Bhopal, we&apos;re a crew of security researchers,
        CTF players, and open-source builders operating under the OWASP
        Foundation &mdash; the world&apos;s most trusted name in application security.
      </Header>

      {/* ── Section 2: The OWASP Connection ── */}
      <div className='mt-20 md:mt-28'>
        <SectionHeading>What is OWASP</SectionHeading>
        <Separator />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* left — narrative */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
          >
            <div className='flex items-center gap-3 mb-4'>
              <IconShieldCheck className='w-6 h-6 text-white/50' />
              <p className='text-xs uppercase tracking-widest text-white/30 font-medium'>
                Official Student Chapter
              </p>
            </div>
            <p className='text-sm md:text-base text-[var(--muted-text)] leading-relaxed max-w-xl'>
              The <span className='text-white font-medium'>Open Worldwide Application Security Project (OWASP)</span> is
              a nonprofit foundation that works to improve the security of software globally.
              As an official student chapter, we operate under their charter — aligning our
              workshops, research, and events with the foundation&apos;s mission to make
              security visible so that organisations and individuals can make informed
              decisions about true software risk.
            </p>
            <div className='flex items-center gap-2 mt-6'>
              <IconWorld className='w-4 h-4 text-white/40' />
              <a
                href='https://owasp.org'
                target='_blank'
                rel='noopener noreferrer'
                className='text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-4'
              >
                owasp.org
              </a>
            </div>
          </motion.div>

          {/* right — stat cards */}
          <div className='flex flex-col gap-4'>
            {owaspStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6'
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i + 1}
              >
                <p className='text-xs uppercase tracking-widest text-white/30 font-medium'>
                  {stat.label}
                </p>
                <p className='text-3xl md:text-4xl font-bold mt-1 text-white/90'>
                  {stat.value}
                </p>
                <p className='text-sm text-[var(--muted-text)] mt-1'>{stat.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Mission / Vision / Values ── */}
      <div className='mt-20 md:mt-28'>
        <SectionHeading>What We Stand For</SectionHeading>
        <Separator />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-4'
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
              >
                <Icon className='w-7 h-7 text-white/50' />
                <p className='text-xs uppercase tracking-widest text-white/30 font-medium'>
                  {pillar.title}
                </p>
                <p className='text-sm md:text-base text-[var(--muted-text)] leading-relaxed'>
                  {pillar.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Section 4: What We Do ── */}
      <div className='mt-20 md:mt-28'>
        <SectionHeading>What We Do</SectionHeading>
        <Separator />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {activities.map((activity, i) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.category}
                className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-4 hover:bg-white/[0.08] transition-colors'
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center'>
                    <Icon className='w-5 h-5 text-white/70' />
                  </div>
                  <h3 className='text-lg md:text-xl font-semibold text-white/90'>
                    {activity.category}
                  </h3>
                </div>
                <p className='text-sm md:text-base text-[var(--muted-text)] leading-relaxed'>
                  {activity.items}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Section 5: Join CTA ── */}
      <motion.div
        className='mt-20 md:mt-28 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
      >
        <IconBuildingCommunity className='w-10 h-10 mx-auto mb-4 text-white/40' />
        <h2 className='mb-4 text-2xl font-bold md:text-3xl'>
          Ready to join the mission?
        </h2>
        <p className='mx-auto max-w-2xl text-[var(--muted-text)] mb-8'>
          No prerequisites. No gatekeeping. If you&apos;re curious about how systems break — and how to stop them — pull up a seat.
        </p>
        <a
          href='#'
          className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-gray-200'
        >
          Join Us
        </a>
      </motion.div>

    </Container>
  )
}
