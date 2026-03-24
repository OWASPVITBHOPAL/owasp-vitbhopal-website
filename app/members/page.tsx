"use client"
import { Container } from '@/components/ui/container'
import MembersSection from '@/components/sections/membersSection'
import YearToggle from '@/components/ui/yearToggle'
import { facultyCoordinator, boardMembers, designTeam, technicalTeam, eventTeam, financeTeam, prTeam, contentTeam, alumni } from '@/Content/Members'
import React, { useState, useMemo } from 'react'
import Header from '@/components/layout/header'

interface Member {
  image: string;
  name: string;
  position?: string;
  alt?: string;
  href?: string;
  year: number;
}

const CURRENT_YEAR = 2026;

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>('2026');

  const isAlumni = selectedTab === 'alumni';

  const filterCurrent = (members: Member[]) =>
    members.filter(m => m.year === CURRENT_YEAR);

  const filteredFacultyCoordinator = useMemo(() => filterCurrent(facultyCoordinator as Member[]), []);
  const filteredBoardMembers = useMemo(() => filterCurrent(boardMembers as Member[]), []);
  const filteredTechnicalTeam = useMemo(() => filterCurrent(technicalTeam as Member[]), []);
  const filteredDesignTeam = useMemo(() => filterCurrent(designTeam as Member[]), []);
  const filteredContentTeam = useMemo(() => filterCurrent(contentTeam as Member[]), []);
  const filteredEventTeam = useMemo(() => filterCurrent(eventTeam as Member[]), []);
  const filteredFinanceTeam = useMemo(() => filterCurrent(financeTeam as Member[]), []);
  const filteredPrTeam = useMemo(() => filterCurrent(prTeam as Member[]), []);

  return (
    <Container className='min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8'>
      <Header title='Our Members'>
        Meet the dedicated team behind OWASP VIT Bhopal - passionate students committed to making the digital world more secure through innovation and collaboration.
      </Header>

      <YearToggle
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      <div>
        {isAlumni ? (
          alumni.length > 0 && <MembersSection title="Alumni" members={alumni as Member[]} />
        ) : (
          <>
            {filteredFacultyCoordinator.length > 0 && <MembersSection title="Faculty Coordinator" members={filteredFacultyCoordinator} />}
            {filteredBoardMembers.length > 0 && <MembersSection title="Board Members" members={filteredBoardMembers} />}
            {filteredTechnicalTeam.length > 0 && <MembersSection title="Technical Team" members={filteredTechnicalTeam} />}
            {filteredDesignTeam.length > 0 && <MembersSection title="Design Team" members={filteredDesignTeam} />}
            {filteredContentTeam.length > 0 && <MembersSection title="Content Team" members={filteredContentTeam} />}
            {filteredEventTeam.length > 0 && <MembersSection title="Event Team" members={filteredEventTeam} />}
            {filteredFinanceTeam.length > 0 && <MembersSection title="Finance Team" members={filteredFinanceTeam} />}
            {filteredPrTeam.length > 0 && <MembersSection title="PR & Outreach Team" members={filteredPrTeam} />}
          </>
        )}
      </div>
    </Container>
  )
}

export default Page