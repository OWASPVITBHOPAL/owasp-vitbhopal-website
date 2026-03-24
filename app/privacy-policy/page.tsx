import { Container } from '@/components/ui/container'
import Header from '@/components/layout/header'
import React from 'react'
import { privacyPolicyContent } from '@/Content/PrivacyPolicy'

const page = () => {
    return (
        <Container className="min-h-screen overflow-x-hidden px-4 md:px-6 lg:px-8">
            <Header title={privacyPolicyContent.header.title}>
                {privacyPolicyContent.header.description}
            </Header>

            <div className="max-w-3xl mt-16 space-y-12 pb-20">
                {privacyPolicyContent.sections.map((section) => (
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
                            href={`mailto:${privacyPolicyContent.contactEmail}`}
                            className="text-white/80 hover:text-white transition-colors underline underline-offset-2"
                        >
                            {privacyPolicyContent.contactEmail}
                        </a>
                    </p>
                    <p className="mt-2">Effective date: {privacyPolicyContent.effectiveDate}</p>
                </div>
            </div>
        </Container>
    )
}

export default page
