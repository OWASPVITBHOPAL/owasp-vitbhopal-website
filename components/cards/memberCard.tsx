"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface MemberCardProps {
    image: string;
    name: string;
    position?: string;
    alt?: string;
    href?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ image, name, position, alt, href = '#' }) => {
    const [imageSrc, setImageSrc] = useState(image || "/members/placeholder.png");

    const handleImageError = () => {
        setImageSrc("/members/placeholder.png");
    };

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name}'s profile`}
        >
            <div className='md:w-63 md:h-74 w-45 h-60 border rounded-2xl border-[var(--border)] relative overflow-hidden group cursor-pointer'>
                {/* Background Image */}
                <Image
                    src={imageSrc}
                    width={252}
                    height={296}
                    alt={alt || name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-50% via-transparent to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="md:text-lg text-md leading-4 font-semibold">{name}</h3>
                            {position && (
                                <p className="text-sm text-gray-300 opacity-80">{position}</p>
                            )}
                        </div>
                        <div className="transform group-hover:translate-x-1 transition-transform duration-200">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MemberCard