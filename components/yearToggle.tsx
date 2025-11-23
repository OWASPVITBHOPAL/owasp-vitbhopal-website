"use client"
import React from 'react'

interface YearToggleProps {
    selectedYear: number;
    onYearChange: (year: number) => void;
}

const YearToggle: React.FC<YearToggleProps> = ({ selectedYear, onYearChange }) => {
    const years = [2025, 2024, 2023];

    return (
        <div className='flex items-center justify-center gap-3 my-8'>
            <span className='text-sm md:text-base text-[var(--muted-text)] mr-2'>Filter by Year:</span>
            <div className='flex gap-2'>
                {years.map((year) => {
                    const isComingSoon = year === 2024 || year === 2023;

                    return (
                        <button
                            key={year}
                            onClick={() => !isComingSoon && onYearChange(year)}
                            disabled={isComingSoon}
                            className={`
                                px-4 py-2 rounded-lg text-sm md:text-base font-medium
                                transition-all duration-200 ease-in-out relative
                                ${selectedYear === year
                                    ? 'bg-white text-black shadow-lg scale-105'
                                    : isComingSoon
                                    ? 'bg-transparent text-white/30 border border-white/10 cursor-not-allowed'
                                    : 'bg-transparent text-white/70 border border-white/20 hover:border-white/40 hover:text-white/90'
                                }
                            `}
                            aria-label={isComingSoon ? `Year ${year} coming soon` : `Filter members by year ${year}`}
                            aria-pressed={selectedYear === year}
                        >
                            {year}
                            {isComingSoon && (
                                <span className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/50 whitespace-nowrap'>
                                    Coming Soon
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default YearToggle
