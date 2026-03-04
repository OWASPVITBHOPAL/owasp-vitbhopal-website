import { Container } from '@/components/ui/container'
import Header from '@/components/layout/header'
import React from 'react'

const sections = [
    {
        title: 'Information We Collect',
        content: [
            'Contact form submissions (name, email address, and message content) when you reach out to us.',
            'Publicly available information you choose to share via linked profiles (LinkedIn, GitHub, etc.) on our members page.',
            'Standard server logs (IP address, browser type, pages visited) for security and diagnostic purposes.',
        ],
    },
    {
        title: 'How We Use Your Information',
        content: [
            'To respond to inquiries submitted through our contact form.',
            'To maintain and improve the website experience.',
            'To ensure the security and integrity of our systems.',
            'We do not sell, rent, or share your personal data with third parties for marketing purposes.',
        ],
    },
    {
        title: 'Data Retention',
        content: [
            'Contact form submissions are retained only as long as necessary to respond to your inquiry.',
            'Server logs are automatically purged on a rolling basis.',
            'Member profile information is removed upon request or when a member leaves the chapter.',
        ],
    },
    {
        title: 'Third-Party Services',
        content: [
            'This site may link to external platforms (GitHub, LinkedIn, YouTube, Discord, Instagram, X/Twitter). We are not responsible for the privacy practices of those services.',
            'We do not employ third-party advertising or tracking scripts.',
        ],
    },
    {
        title: 'Your Rights',
        content: [
            'You may request access to, correction of, or deletion of any personal data we hold about you.',
            'To exercise these rights, contact us at owaspclub@vitbhopal.ac.in.',
        ],
    },
    {
        title: 'Changes to This Policy',
        content: [
            'We may update this policy periodically. The effective date at the bottom of this page reflects the most recent revision. Continued use of the site following any changes constitutes acceptance of the updated policy.',
        ],
    },
]

const page = () => {
    return (
        <Container className="min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8">
            <Header title="Privacy Policy">
                This policy explains what information OWASP VIT Bhopal collects, how it is used, and how it is protected. We are committed to handling your data with transparency and respect.
            </Header>

            <div className="max-w-3xl mt-16 space-y-12 pb-20">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="text-xl md:text-2xl font-medium mb-3">{section.title}</h2>
                        <div className="border-b border-dashed border-white/12 mb-4" />
                        <ul className="space-y-2">
                            {section.content.map((line, i) => (
                                <li key={i} className="text-sm md:text-base text-[var(--muted-text)] leading-relaxed flex gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="border-t border-dashed border-white/12 pt-6 text-sm text-[var(--muted-text)]">
                    <p>
                        For any privacy-related concerns, contact us at{' '}
                        <a
                            href="mailto:owaspclub@vitbhopal.ac.in"
                            className="text-white/80 hover:text-white transition-colors underline underline-offset-2"
                        >
                            owaspclub@vitbhopal.ac.in
                        </a>
                    </p>
                    <p className="mt-2">Effective date: March 2026</p>
                </div>
            </div>
        </Container>
    )
}

export default page
