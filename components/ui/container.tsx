import React, { ReactNode } from 'react';

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`mx-auto max-w-360 px-2 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};
