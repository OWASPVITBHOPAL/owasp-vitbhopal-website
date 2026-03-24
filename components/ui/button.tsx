import React from 'react'
import Link from 'next/link'


type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({ children, href, onClick, className = '', type = 'button' }: ButtonProps) => {
  const baseClassName = 'inline-flex h-10 w-auto px-7 justify-center items-center rounded-2xl bg-white font-bold text-[var(--text-colour)] text-sm transition-colors hover:bg-white/90';
  const mergedClassName = `${baseClassName} ${className}`.trim();
  
  if (href) {
    return (
      <Link href={href} className={mergedClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={mergedClassName} onClick={onClick} type={type}>
      {children}
    </button>
  );
}