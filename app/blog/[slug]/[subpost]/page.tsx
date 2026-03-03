import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CornerLeftUp,
  FileText,
  ArrowLeft,
  ArrowRight,
  House,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import PostNavigation from '@/components/RightSidebar';
import PostSidebar from '@/components/LeftSidebar';
import MDXComponents from '@/components/MDXComponents';
import { Container } from '@/components/container';
import {
  getAllBlogPosts,
  getBlogPost,
  getSubPost,
  getPreviousSubPost,
  getNextSubPost,
  getSuggestedPosts,
} from '@/lib/blog';

interface SubpostPageParams {
  slug: string;
  subpost: string;
}

interface SubpostPageProps {
  params: Promise<SubpostPageParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SubpostPageParams>;
}): Promise<Metadata> {
  const { slug, subpost } = await params;

  const mainPost = getBlogPost(slug);
  if (!mainPost) return {};

  const subpostData = getSubPost(slug, subpost);
  if (!subpostData) return {};

  return {
    title: subpostData.title,
    openGraph: {
      images: [
        `/api/og/${slug}/${subpost}?title=${encodeURIComponent(
          subpostData.title
        )}`,
      ],
    },
  };
}

export default async function SubpostPage({ params }: SubpostPageProps) {
  const { slug, subpost } = await params;

  const mainPost = getBlogPost(slug);

  if (!mainPost) {
    notFound();
  }

  const subpostData = getSubPost(slug, subpost);

  if (!subpostData) {
    notFound();
  }

  const suggestedPosts = getSuggestedPosts(slug, 3);
  const previousSubpost = getPreviousSubPost(slug, subpost);
  const nextSubpost = getNextSubPost(slug, subpost);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container className="px-4 md:px-6 lg:px-8 py-10">
      <div className="w-full mx-auto max-w-4xl">
        <div className="flex flex-col gap-y-4 mb-6">
          <div className="mb-4 flex justify-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <House className="size-4" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-4 text-neutral-600" />
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <BookOpen className="size-4" />
                    <span>Blog</span>
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-4 text-neutral-600" />
                </li>
                <li>
                  <Link
                    href={`/blog/${slug}`}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <FileText className="size-4" />
                    <span className="truncate max-w-[150px] md:max-w-xs">{mainPost.title}</span>
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-4 text-neutral-600" />
                </li>
                <li>
                  <span
                    className="flex items-center gap-2 text-white font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10"
                    aria-current="page"
                  >
                    <FileText className="size-3.5" />
                    <span className="truncate max-w-[150px] md:max-w-xs">{subpostData.title}</span>
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight leading-tight">
            {subpostData.title}
          </h1>
          <div className="md:flex hidden text-sm text-white/70 justify-center gap-3">
            <div>{formatDate(subpostData.date || mainPost.date)}</div>
            <div>|</div>
            <div>{subpostData.readTime}</div>
          </div>
          <div className="flex flex-col md:hidden items-center text-sm text-white/70 justify-center gap-1 mt-2">
            <div className="w-full border-1" />
            <div className="w-full flex justify-center items-center gap-2">
              <div className="flex">
                {formatDate(subpostData.date || mainPost.date)}
              </div>
              <div>|</div>
              <div className="flex">{subpostData.readTime}</div>
            </div>
            <div className="w-full border-1" />
          </div>
        </div>
      </div>

      <div className="w-full flex-row mt-6 md:flex gap-8 md:mx-auto justify-center">
        <div className="md:w-80 my-6">
          <PostSidebar content={subpostData.content} />
        </div>

        <div className="md:w-[50vw] w-full">
          <ReactMarkdown components={MDXComponents}>
            {subpostData.content}
          </ReactMarkdown>

          <div className="block md:hidden">
            <PostNavigation
              mainTitle={mainPost.title}
              mainRead={mainPost.readTime}
              subposts={mainPost.subposts || []}
              currentSlug={subpost}
              suggestedPosts={suggestedPosts}
            />
          </div>

          <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 items-stretch gap-4 w-full mb-6">
            {previousSubpost ? (
              <Link
                href={`/blog/${slug}/${previousSubpost.slug}`}
                className="flex items-center h-auto gap-3 w-full text-neutral-400 border border-white/10 p-4 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all group bg-white/[0.02]"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Previous</div>
                  <div className="font-bold text-white text-sm leading-snug">
                    {previousSubpost.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center h-auto gap-3 w-full text-neutral-500 border border-white/10 p-4 rounded-2xl opacity-50 cursor-not-allowed bg-white/[0.02]">
                <ArrowLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[11px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Previous</div>
                  <div className="font-medium text-sm">No previous subpost</div>
                </div>
              </div>
            )}

            <Link
              href={`/blog/${slug}`}
              className="flex items-center justify-center p-4 h-auto gap-3 w-full text-neutral-400 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all group bg-white/[0.02]"
            >
              <div className="flex flex-col items-center gap-1">
                <CornerLeftUp className="w-6 h-6 group-hover:scale-110 transition-transform mb-1" />
                <div className="text-[11px] opacity-60 uppercase tracking-wider font-semibold">Parent Post</div>
                <div className="font-bold text-white text-sm leading-snug text-center line-clamp-2">{mainPost.title}</div>
              </div>
            </Link>

            {nextSubpost ? (
              <Link
                href={`/blog/${slug}/${nextSubpost.slug}`}
                className="flex items-center justify-end h-auto gap-3 w-full text-neutral-400 border border-white/10 p-4 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all group bg-white/[0.02]"
              >
                <div className="text-right">
                  <div className="text-[11px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Next</div>
                  <div className="font-bold text-white text-sm leading-snug">{nextSubpost.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="flex items-center justify-end h-auto gap-3 w-full text-neutral-500 border border-white/10 p-4 rounded-2xl opacity-50 cursor-not-allowed bg-white/[0.02]">
                <div className="text-right">
                  <div className="text-[11px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Next</div>
                  <div className="font-medium text-sm">No next subpost</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        <div className="md:w-80 hidden md:block my-6">
          <PostNavigation
            mainTitle={mainPost.title}
            mainRead={mainPost.readTime}
            subposts={mainPost.subposts || []}
            currentSlug={subpost}
            suggestedPosts={suggestedPosts}
          />
        </div>
      </div>
    </Container>
  );
}

export async function generateStaticParams() {
  const allPosts = getAllBlogPosts();

  const params: SubpostPageParams[] = [];

  for (const post of allPosts) {
    if (post.subposts && post.subposts.length > 0) {
      for (const sub of post.subposts) {
        params.push({
          slug: post.slug,
          subpost: sub.slug,
        });
      }
    }
  }

  return params;
}
