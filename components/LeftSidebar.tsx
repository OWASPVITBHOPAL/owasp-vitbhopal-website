"use client";
import { useEffect, useState } from 'react';

interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

interface PostSidebarProps {
  content: string;
  suggestedPosts?: unknown;
}

export default function PostSidebar({ content }: PostSidebarProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!content) return;

    const existingHeadings = document.querySelectorAll<HTMLHeadingElement>(
      'h2'
    );

    if (existingHeadings.length > 0) {
      const headingData: HeadingItem[] = Array.from(existingHeadings)
        .map((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1), 10);
          const text = heading.textContent || '';
          let id = heading.id;

          if (!id) {
            id = `heading-${index}-${text
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')}`;
            heading.id = id;
          }

          return { level, text, id };
        })
        .filter((heading) => heading.text !== 'Suggested Posts' && heading.text !== 'Table of Contents');

      setHeadings(headingData);
    } else {
      // Fallback for string content parsing if needed, though unreliable for IDs
      // Skipping complicated fallback refinement for now as direct DOM query is preferred
    }
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0% 0% -60% 0%',
        threshold: 0,
      }
    );

    const timeoutId = window.setTimeout(() => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full hidden md:block sticky top-6">
      {headings.length > 0 && (
        <nav className="text-neutral-100 w-full border border-white/10 rounded-2xl p-4 bg-white/[0.02]">
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 px-2">Table of Contents</h3>
          <div className="space-y-2">
            {headings.map((heading) => (
              <div
                key={heading.id}
                className={`cursor-pointer transition-colors duration-150 block truncate rounded-lg px-2 py-1 ${
                  activeId === heading.id
                    ? 'text-white font-bold bg-white/10'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                }`}
                style={{ marginLeft: heading.level > 2 ? `${(heading.level - 2) * 8}px` : undefined }}
                onClick={() => scrollToHeading(heading.id)}
              >
                <span className="text-sm">{heading.text}</span>
              </div>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
