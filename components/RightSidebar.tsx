'use client';

import Link from 'next/link';
import { BookOpen, FileText, File, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { BlogPost, Subpost } from '@/lib/blog';

interface PostNavigationProps {
  mainTitle: string;
  mainRead?: string;
  totalRead?: string;
  subposts: Subpost[];
  currentSlug?: string;
  suggestedPosts?: BlogPost[];
}

export default function PostNavigation({
  mainTitle,
  mainRead,
  subposts,
  currentSlug,
  suggestedPosts = [],
}: PostNavigationProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const hasSubposts = subposts && subposts.length > 0;
  const hasSuggestedPosts = suggestedPosts && suggestedPosts.length > 0;

  if (!hasSubposts && !hasSuggestedPosts) {
    return null;
  }

  const totalReadingTime = (() => {
    if (!hasSubposts) return mainRead || '';

    const extractMinutes = (readTime?: string) => {
      if (!readTime) return 0;
      const match = readTime.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const parentMinutes = extractMinutes(mainRead);
    const subpostMinutes = subposts.reduce(
      (sum, sub) => sum + extractMinutes(sub.readTime),
      0
    );
    const total = parentMinutes + subpostMinutes;
    return `${total} min read`;
  })();

  return (
    <>
      <nav className="text-neutral-100 hidden md:block w-full sticky top-6 border border-white/10 rounded-2xl p-4 bg-white/[0.02]">
        <div className="flex flex-col gap-4">
          {hasSubposts && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm">
                <BookOpen className="w-5 h-5 text-neutral-400" />
                <div>
                  <div className="font-bold text-white text-sm leading-tight line-clamp-2">{mainTitle}</div>
                  <div className="text-[11px] text-neutral-500 mt-1">
                    {mainRead ? `${parseInt(mainRead)} min` : ''} 
                    <span className="opacity-60 mx-1">•</span> 
                    {totalReadingTime}
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                {subposts.map((subpost) => {
                  const isActive = currentSlug === subpost.slug;
                  const IconComponent = isActive ? FileText : File;

                  return (
                    <Link
                      key={subpost.slug}
                      href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
                      className={`flex w-full items-start gap-3 p-2 rounded-lg transition-all duration-200 group ${
                        isActive 
                          ? 'bg-white/10 text-white font-medium border border-white/5 shadow-inner' 
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs leading-snug">{subpost.title}</span>
                        <span className="text-[10px] opacity-60 font-medium">{subpost.readTime}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {hasSuggestedPosts && (
            <div
              className={`${hasSubposts ? 'pt-4 border-t border-white/5' : ''}`}
            >
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 px-1">
                Suggested Posts
              </h3>
              <div className="space-y-3">
                {suggestedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group border border-white/5 hover:border-white/20 p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-white/90 mb-1.5 line-clamp-2 leading-snug">
                      {post.title}
                    </div>
                    {post.description && (
                      <div className="text-[11px] text-neutral-400 mb-2 line-clamp-2 leading-relaxed opacity-80">
                        {post.description}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium mt-auto">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">{post.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="block md:hidden w-full mb-6 text-sm">
        {hasSubposts && (
          <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden mb-4">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-neutral-400" />
                <span className="font-bold">Subposts ({subposts.length})</span>
              </div>
              {isAccordionOpen ? (
                <ChevronUp className="w-5 h-5 text-neutral-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>

            {isAccordionOpen && (
              <div className="border-t border-white/10 bg-black/20">
                {subposts.map((subpost) => {
                  const isActive = currentSlug === subpost.slug;
                  const IconComponent = isActive ? FileText : File;

                  return (
                    <div
                      key={subpost.slug}
                      className={`border-b border-white/5 last:border-b-0 ${
                        isActive ? 'bg-white/10' : ''
                      }`}
                    >
                      <Link
                        href={`/blog/${subpost.parentSlug}/${subpost.slug}`}
                        className="flex items-center gap-3 p-4 w-full transition-colors duration-150 hover:bg-white/5"
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-neutral-500'
                          }`}
                        />
                        <div className="flex-1">
                          <div
                            className={`${
                              isActive
                                ? 'text-white font-bold'
                                : 'text-neutral-300 font-medium'
                            }`}
                          >
                            {subpost.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1">
                            {subpost.readTime}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {hasSuggestedPosts && (
          <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest">
                Suggested Posts
              </h3>
            </div>
            <div className="p-3 space-y-3">
              {suggestedPosts.map((post) => (
                <div
                  key={post.slug}
                  className="border border-white/5 p-3 rounded-xl bg-white/5 hover:border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block"
                  >
                    <div className="text-sm font-bold text-white group-hover:text-white/90 mb-1.5 line-clamp-2 leading-snug">
                      {post.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 mb-2 line-clamp-2 leading-relaxed">
                      {post.description || 'No description available'}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-medium">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="px-1.5 py-0.5 rounded bg-white/5">{post.readTime}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
