"use client"
import React from 'react'

interface YearToggleProps {
    selectedTab: string;
    onTabChange: (tab: string) => void;
}

const tabs: { label: string; key: string; disabled: boolean }[] = [
    { label: '2026', key: '2026', disabled: false },
    { label: 'Alumni', key: 'alumni', disabled: true },
];

const YearToggle: React.FC<YearToggleProps> = ({ selectedTab, onTabChange }) => {
    return (
        <div className='w-full my-12'>
            <div className='w-full border-2 border-dashed border-white/12' />
            <div className='flex items-center justify-start gap-6 mt-8 mb-4'>
                {tabs.map(({ label, key, disabled }) => {
                    const isActive = selectedTab === key;

                    return (
                        <button
                            key={key}
                            onClick={() => !disabled && onTabChange(key)}
                            disabled={disabled}
                            className={`
                                text-2xl md:text-3xl font-medium
                                transition-all duration-300 ease-out
                                relative pb-1
                                ${isActive
                                    ? 'text-white'
                                    : disabled
                                        ? 'text-white/20 cursor-not-allowed'
                                        : 'text-white/40 hover:text-white/70'
                                }
                            `}
                            aria-label={`Filter members: ${label}`}
                            aria-pressed={isActive}
                            aria-disabled={disabled}
                        >
                            {label}
                            {isActive && (
                                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-white' />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default YearToggle
