"use client"
import React from 'react'

interface YearToggleProps {
    selectedYear: number;
    onYearChange: (year: number) => void;
}

const YearToggle: React.FC<YearToggleProps> = ({ selectedYear, onYearChange }) => {
    const years = [2025, 2024, 2023];

    return (
        <div className='w-full my-12'>
            <div className='w-full border-2 border-dashed border-white/12' />
            <div className='flex items-center justify-start gap-6 mt-8 mb-4'>
                {years.map((year) => {
                    const isDisabled = year === 2024 || year === 2023;
                    const isActive = selectedYear === year;

                    return (
                        <button
                            key={year}
                            onClick={() => !isDisabled && onYearChange(year)}
                            disabled={isDisabled}
                            className={`
                                text-2xl md:text-3xl font-medium
                                transition-all duration-300 ease-out
                                relative pb-1
                                ${isActive
                                    ? 'text-white'
                                    : isDisabled
                                    ? 'text-white/20 cursor-not-allowed'
                                    : 'text-white/40 hover:text-white/70'
                                }
                            `}
                            aria-label={`Filter members by year ${year}`}
                            aria-pressed={isActive}
                            aria-disabled={isDisabled}
                        >
                            {year}
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
