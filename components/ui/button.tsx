import React from 'react'


type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export const Button = ({ children, href, onClick }: ButtonProps) => {
  const className = 'flex h-10 w-auto px-7 justify-center items-center rounded-2xl bg-white font-bold text-[var(--text-colour)] text-sm ';
  
  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}