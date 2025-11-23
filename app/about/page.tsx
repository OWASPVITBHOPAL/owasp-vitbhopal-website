import { Container } from '@/components/container'
import Header from '@/components/header'
import React from 'react'

const page = () => {
  return (
    <Container className='min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8'>
      <Header title='About Us'>
        The OWASP VIT Bhopal University Student Chapter is dedicated to advancing web application security through education, research, and hands-on practice in the field of cybersecurity.
      </Header>

      <div className='mt-20 w-fit'>
        <h2 className='text-2xl md:text-3xl font-medium'>How we function</h2>
        <div className='border-b border-dashed border-white/12 my-4 '></div>
        <p className='text-sm md:text-base text-[var(--muted-text)] max-w-3xl'>
          The team functions as a family, and uses a mentor mentee model wherein senior students train and pass on experience &amp; skills they gained to their junior mentees. This happens throughout their years at the community, and is facilitated through various activities the club organizes &amp; events and contests it participates as a team.
        </p>
      </div>

      <div className='mt-12 w-fit'>
        <h2 className='text-2xl md:text-3xl font-medium'>What do we do?</h2>
        <div className='border-b border-dashed border-white/12 my-4 '></div>
        <div>
          <ul className='list-decimal pl-6 space-y-1 text-sm md:text-base text-[var(--muted-text)] max-w-3xl'>
            <li>Learning &amp; Researching on various Cyber Security fields</li>
            <li>Participating &amp; organizing CTFs across the world</li>
            <li>Organizing workshops &amp; training programmes</li>
            <li>Contributing to open-source security tools</li>
            <li>Designing and testing hardware security modules</li>
            <li>Collaborating in international cyber-security research projects</li>
            <li>Penetration testing, bug-bounty hunting &amp; submitting CVEs</li>
            <li>Providing Cyber Security Consultancy Services</li>
          </ul>
        </div>
      </div>

    </Container>
  )
}

export default page

