"use client";
import { Toaster } from "sonner";

export function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: '2px solid var(--border)',
          borderRadius: '16px',
          color: 'white',
          padding: '16px',
        },
        classNames: {
          toast: 'group',
          title: 'text-white font-semibold',
          description: 'text-white/70',
          actionButton: 'bg-white text-black hover:bg-white/90',
          cancelButton: 'bg-white/10 text-white hover:bg-white/20',
          closeButton: 'bg-white/10 text-white hover:bg-white/20',
        },
      }}
      icons={{
        success: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#22c55e"/>
            <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        error: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#ef4444"/>
            <path d="M7 7L13 13M7 13L13 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        info: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#3b82f6"/>
            <path d="M10 10V14M10 6V7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        warning: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#f59e0b"/>
            <path d="M10 6V10M10 14V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      }}
    />
  );
}
