import {
    IconBook,
    IconTrophy,
    IconCode,
    IconUsers,
    IconTarget,
    IconEye,
    IconHeart,
} from '@tabler/icons-react'

export const aboutContent = {
    intro: {
        title: "About Us",
        description: "Founded in 2022 at VIT Bhopal, we're a crew of security researchers, CTF players, and open-source builders operating under the OWASP Foundation — the world's most trusted name in application security."
    },
    stats: [
        { label: 'Founded', value: '2022', note: 'at VIT Bhopal University' },
        { label: 'OWASP Chapters', value: '300+', note: 'across the globe' },
        { label: 'OWASP Projects', value: '100+', note: 'open-source & community-led' },
    ],
    pillars: [
        {
            icon: IconTarget,
            title: 'Mission',
            body: 'Our members build CTF challenges, run conferences, host workshops and dig into real vulnerabilities.',
        },
        {
            icon: IconEye,
            title: 'Vision',
            body: 'We want security to be design first approach for engineers during development, not something they try to fix after a breach.',
        },
        {
            icon: IconHeart,
            title: 'Values',
            body: 'We don\'t care what year you\'re in or what branch you picked. Show up, ask questions, try things. That\'s the whole requirement.',
        },
    ],
    activities: [
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
}
