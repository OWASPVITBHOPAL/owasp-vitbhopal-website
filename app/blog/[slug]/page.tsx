import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileText,
  Hash,
  ArrowLeft,
  ArrowRight,
  House,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import {
  getBlogPost,
  getAllBlogPosts,
  getPreviousPost,
  getNextPost,
  getSuggestedPosts,
} from '@/lib/blog';
import PostNavigation from '@/components/layout/RightSidebar';
import PostSidebar from '@/components/layout/LeftSidebar';
import MDXComponents from '@/components/shared/MDXComponents';
import { Container } from '@/components/ui/container';

interface BlogPageParams {
  slug: string;
}

interface BlogPageProps {
  params: Promise<BlogPageParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    openGraph: {
      images: [`/api/og/${slug}?title=${encodeURIComponent(post.title)}`],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<BlogPageParams> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const suggestedPosts = getSuggestedPosts(slug, 3);

  if (!post) {
    notFound();
  }

  const previousPost = getPreviousPost(slug);
  const nextPost = getNextPost(slug);

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
                  <span
                    className="flex items-center gap-2 text-white font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10"
                    aria-current="page"
                  >
                    <FileText className="size-3.5" />
                    <span className="truncate max-w-[150px] md:max-w-xs">{post.title}</span>
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          {post.coverImage && (
            <Image
              alt={post.title}
              className="object-cover object-center w-full mb-6 h-[220px] md:h-[400px] rounded-2xl border border-white/10 shadow-2xl"
              width={800}
              height={300}
              src={post.coverImage}
            />
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="md:flex hidden text-sm text-white/70 justify-center gap-3">
            <div>{formatDate(post.date)}</div>
            <div>|</div>
            <div>{post.readTime}</div>
            <div>|</div>
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {post.subposts.length} subpost
              {post.subposts.length > 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex flex-col md:hidden items-center text-sm text-white/70 justify-center gap-1 mt-2">
            <div className="w-full border-1" />
            <div className="w-full flex justify-center items-center gap-2">
              <div className="flex">{formatDate(post.date)}</div>
              <div>|</div>
              <div className="flex">{post.readTime}</div>
            </div>
            <div className="w-full border-1" />
          </div>
        </div>

        <div className="flex justify-center mt-2">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mx-auto justify-center">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs uppercase tracking-wide text-white/70 bg-[#1a1815] border border-white/10 rounded-full"
                >
                  <Hash className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex-row mt-6 md:flex gap-8 md:mx-auto justify-center">
        <div className="md:w-80 my-6">
          <PostSidebar content={post.content} />
        </div>

        <div className="md:w-[50vw] w-full">
          <ReactMarkdown components={MDXComponents}>{post.content}</ReactMarkdown>
          <div className="block md:hidden">
            <PostNavigation
              mainTitle={post.title}
              mainRead={post.readTime}
              subposts={post.subposts || []}
              suggestedPosts={suggestedPosts}
            />
          </div>

          <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 items-stretch gap-4 w-full">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="flex items-center h-auto gap-4 w-full text-neutral-400 border border-white/10 p-5 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all group bg-white/[0.02]"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-[12px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Previous</div>
                  <div className="font-bold text-white text-base leading-snug">{previousPost.title}</div>
                </div>
              </Link>
            ) : (
              <div className="flex opacity-50 items-center h-auto gap-4 w-full text-neutral-500 border border-white/10 p-5 rounded-2xl cursor-not-allowed bg-white/[0.02]">
                <ArrowLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[12px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Previous</div>
                  <div className="font-medium text-sm">
                    You are at the First Post
                  </div>
                </div>
              </div>
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex items-center justify-end h-auto gap-4 w-full text-neutral-400 border border-white/10 p-5 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all group bg-white/[0.02]"
              >
                <div className="text-right">
                  <div className="text-[12px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Next</div>
                  <div className="font-bold text-white text-base leading-snug">{nextPost.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="flex items-center opacity-50 justify-end h-auto gap-4 w-full text-neutral-500 border border-white/10 p-5 rounded-2xl cursor-not-allowed bg-white/[0.02]">
                <div className="text-right">
                  <div className="text-[12px] opacity-60 mb-1 uppercase tracking-wider font-semibold">Next</div>
                  <div className="font-medium text-sm">
                    You are on the Last Post
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
        <div className="md:w-80 hidden md:block my-6">
          <PostNavigation
            mainTitle={post.title}
            mainRead={post.readTime}
            subposts={post.subposts || []}
            suggestedPosts={suggestedPosts}
          />
        </div>
      </div>
    </Container>
  );
}

export async function generateStaticParams() {
  try {
    const posts = getAllBlogPosts();
    const params = posts.map((post) => ({
      slug: post.slug,
    }));
    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}
