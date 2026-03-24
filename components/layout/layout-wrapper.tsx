'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';
import React from 'react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer on event detail pages
  const isEventDetailPage = /^\/events\/[^/]+$/.test(pathname) && pathname !== '/events';

  return (
    <>
      {!isEventDetailPage && <Navbar />}
      {children}
      {!isEventDetailPage && <Footer />}
    </>
  );
}
