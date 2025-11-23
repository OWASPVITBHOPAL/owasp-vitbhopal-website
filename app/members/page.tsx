import { Container } from '@/components/container'
import MembersSection from '@/components/membersSection'
import { boardMembers, designTeam, technicalTeam, eventTeam, financeTeam, prTeam, contentTeam, ecaMembers } from '@/Content/Members'
import React from 'react'
import Header from '@/components/header'



const page = () => {
  return (
    <Container className='min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8'>
      <Header title='Our Members'>
Meet the dedicated team behind OWASP VIT Bhopal - passionate students committed to making the digital world more secure through innovation and collaboration.      </Header>

      <div>
        <MembersSection title="Board Members" members={boardMembers} />
        <MembersSection title="Technical Team" members={technicalTeam} />
        <MembersSection title="Design Team" members={designTeam} />
        <MembersSection title="Content Team" members={contentTeam} />
        <MembersSection title="Event Team" members={eventTeam} />
        <MembersSection title="Finance Team" members={financeTeam} />
        <MembersSection title="Pr & Outreach Team" members={prTeam} />
        <MembersSection title="ECA Members" members={ecaMembers} />
      </div>
    </Container>
  )
}

export default page