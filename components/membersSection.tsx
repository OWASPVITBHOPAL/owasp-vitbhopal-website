import React from 'react'
import MemberCard from './memberCard'

interface Member {
    image: string;
    name: string;
    position?: string;
    alt?: string;
    href?: string;
}

interface MembersSectionProps {
    title: string;
    members: Member[];
}

const MembersSection: React.FC<MembersSectionProps> = ({ title, members }) => {
    return (
        <div className='mt-16 w-full max-w-full'>
            <h2 className='md:text-4xl text-3xl font-medium'>{title}</h2>
            <div className='w-full border-2 my-4 border-dashed border-white/12' />
            
            <div className="w-full overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 mt-8 justify-items-center mx-auto max-w-full">
                    {members.map((member, index) => (
                        <MemberCard
                            key={index}
                            image={member.image}
                            name={member.name}
                            position={member.position}
                            alt={member.alt}
                            href={member.href}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MembersSection