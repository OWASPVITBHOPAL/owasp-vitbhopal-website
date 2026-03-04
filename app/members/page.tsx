"use client"
import { Container } from '@/components/ui/container'
import MembersSection from '@/components/sections/membersSection'
import YearToggle from '@/components/ui/yearToggle'
import { boardMembers, designTeam, technicalTeam, eventTeam, financeTeam, prTeam, contentTeam, alumni } from '@/Content/Members'
import React, { useState, useMemo, useCallback } from 'react'
import Header from '@/components/layout/header'

interface Member {
  image: string;
  name: string;
  position?: string;
  alt?: string;
  href?: string;
  year: number;
}

const Page = () => {
  const allMembers = useMemo(() => [
    ...boardMembers,
    ...designTeam,
    ...technicalTeam,
    ...eventTeam,
    ...financeTeam,
    ...prTeam,
    ...contentTeam,
    ...alumni
  ] as Member[], []);

  const availableYears = useMemo(() => {
    const years = [...new Set(allMembers.map(member => member.year))];
    return years.sort((a, b) => b - a);
  }, [allMembers]);

  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] || 2025);

  const filterMembersByYear = useCallback((members: Member[]) => {
    return members.filter(member => member.year === selectedYear);
  }, [selectedYear]);

  const filteredBoardMembers = useMemo(() => filterMembersByYear(boardMembers as Member[]), [filterMembersByYear]);
  const filteredTechnicalTeam = useMemo(() => filterMembersByYear(technicalTeam as Member[]), [filterMembersByYear]);
  const filteredDesignTeam = useMemo(() => filterMembersByYear(designTeam as Member[]), [filterMembersByYear]);
  const filteredContentTeam = useMemo(() => filterMembersByYear(contentTeam as Member[]), [filterMembersByYear]);
  const filteredEventTeam = useMemo(() => filterMembersByYear(eventTeam as Member[]), [filterMembersByYear]);
  const filteredFinanceTeam = useMemo(() => filterMembersByYear(financeTeam as Member[]), [filterMembersByYear]);
  const filteredPrTeam = useMemo(() => filterMembersByYear(prTeam as Member[]), [filterMembersByYear]);
  const filteredAlumni = useMemo(() => filterMembersByYear(alumni as Member[]), [filterMembersByYear]);

  return (
    <Container className='min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8'>
      <Header title='Our Members'>
        Meet the dedicated team behind OWASP VIT Bhopal - passionate students committed to making the digital world more secure through innovation and collaboration.
      </Header>
      <YearToggle
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <div>
        {filteredBoardMembers.length > 0 && <MembersSection title="Board Members" members={filteredBoardMembers} />}
        {filteredTechnicalTeam.length > 0 && <MembersSection title="Technical Team" members={filteredTechnicalTeam} />}
        {filteredDesignTeam.length > 0 && <MembersSection title="Design Team" members={filteredDesignTeam} />}
        {filteredContentTeam.length > 0 && <MembersSection title="Content Team" members={filteredContentTeam} />}
        {filteredEventTeam.length > 0 && <MembersSection title="Event Team" members={filteredEventTeam} />}
        {filteredFinanceTeam.length > 0 && <MembersSection title="Finance Team" members={filteredFinanceTeam} />}
        {filteredPrTeam.length > 0 && <MembersSection title="Pr & Outreach Team" members={filteredPrTeam} />}
        {filteredAlumni.length > 0 && <MembersSection title="Alumni" members={filteredAlumni} />}
      </div>
    </Container>
  )
}

export default Page