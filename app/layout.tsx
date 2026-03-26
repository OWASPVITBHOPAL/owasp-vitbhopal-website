import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Loader from "@/components/Loader";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import { Suspense } from "react";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OWASP VIT Bhopal Student Chapter",
  url: "https://www.owaspvitb.in",
  logo: "https://www.owaspvitb.in/logo.svg",
  sameAs: [
    "https://www.instagram.com/owaspvitbhopal/",
    "https://www.linkedin.com/company/owaspvitbhopal/",
    "https://github.com/owaspvitbhopal",
    "https://x.com/OwaspVitBhopal",
    "https://www.youtube.com/@owaspvitbhopal",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.owaspvitb.in"),
  title: {
    default: "OWASP VIT Bhopal — Student Chapter",
    template: "%s — OWASP VIT Bhopal",
  },
  description:
    "VIT Bhopal's premier cybersecurity community — CTFs, workshops, open-source security research, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "OWASP VIT Bhopal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OWASP VIT Bhopal Student Chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@OwaspVitBhopal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${figtree.variable} antialiased`}
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 14px)",
        }}
      >
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <Loader>
            <LayoutWrapper>
            <SpeedInsights/>
            <Analytics/>
              {children}
            </LayoutWrapper>
          </Loader>
        </PostHogProvider>
      </body>
    </html>
  );
}
