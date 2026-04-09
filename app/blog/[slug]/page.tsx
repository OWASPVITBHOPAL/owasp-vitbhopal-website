import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText,
  Hash,
  ArrowLeft,
  ArrowRight,
  House,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import {
  getBlogPost,
  getAllBlogPosts,
  getPreviousPost,
  getNextPost,
  getSuggestedPosts,
} from "@/lib/blog";
import PostNavigation from "@/components/layout/RightSidebar";
import PostSidebar from "@/components/layout/LeftSidebar";
import MDXComponents from "@/components/shared/MDXComponents";
import { Container } from "@/components/ui/container";

interface BlogPageParams {
  slug: string;
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

export default async function BlogPage({
  params,
}: {
  params: Promise<BlogPageParams>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const suggestedPosts = getSuggestedPosts(slug, 3);

  if (!post) {
    notFound();
  }

  const previousPost = getPreviousPost(slug);
  const nextPost = getNextPost(slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex flex-col gap-y-4">
          <div className="mb-4 flex justify-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-400">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-2 transition-colors hover:text-white"
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
                    className="flex items-center gap-2 transition-colors hover:text-white"
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
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-white"
                    aria-current="page"
                  >
                    <FileText className="size-3.5" />
                    <span className="max-w-[150px] truncate md:max-w-xs">
                      {post.title}
                    </span>
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          {post.coverImage && (
            <Image
              alt={post.title}
              className="mb-6 h-[220px] w-full rounded-2xl border border-white/10 object-cover object-center shadow-2xl md:h-[400px]"
              width={800}
              height={300}
              src={post.coverImage}
            />
          )}
          <h1 className="text-center text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl">
            {post.title}
          </h1>
          <div className="hidden justify-center gap-3 text-sm text-white/70 md:flex">
            <div>{formatDate(post.date)}</div>
            <div>|</div>
            <div>{post.readTime}</div>
            <div>|</div>
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {post.subposts.length} subpost
              {post.subposts.length > 1 ? "s" : ""}
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center justify-center gap-1 text-sm text-white/70 md:hidden">
            <div className="w-full border-1" />
            <div className="flex w-full items-center justify-center gap-2">
              <div className="flex">{formatDate(post.date)}</div>
              <div>|</div>
              <div className="flex">{post.readTime}</div>
            </div>
            <div className="w-full border-1" />
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          {post.tags && post.tags.length > 0 && (
            <div className="mx-auto flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-[#1a1815] px-3 py-1 text-xs tracking-wide text-white/70 uppercase"
                >
                  <Hash className="mr-1 inline h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 w-full flex-row justify-center gap-8 md:mx-auto md:flex">
        <div className="my-6 md:w-80">
          <PostSidebar content={post.content} />
        </div>

        <div className="w-full md:w-[50vw]">
          <ReactMarkdown components={MDXComponents}>
            {post.content}
          </ReactMarkdown>
          <div className="block md:hidden">
            <PostNavigation
              mainTitle={post.title}
              mainRead={post.readTime}
              subposts={post.subposts || []}
              suggestedPosts={suggestedPosts}
            />
          </div>

          <div className="grid w-full grid-rows-2 items-stretch gap-4 sm:grid-cols-2 sm:grid-rows-1">
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="group flex h-auto w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-neutral-400 transition-all hover:border-white/20 hover:bg-white/5"
              >
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <div className="mb-1 text-[12px] font-semibold tracking-wider uppercase opacity-60">
                    Previous
                  </div>
                  <div className="text-base leading-snug font-bold text-white">
                    {previousPost.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex h-auto w-full cursor-not-allowed items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-neutral-500 opacity-50">
                <ArrowLeft className="h-5 w-5" />
                <div className="text-left">
                  <div className="mb-1 text-[12px] font-semibold tracking-wider uppercase opacity-60">
                    Previous
                  </div>
                  <div className="text-sm font-medium">
                    You are at the First Post
                  </div>
                </div>
              </div>
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex h-auto w-full items-center justify-end gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-neutral-400 transition-all hover:border-white/20 hover:bg-white/5"
              >
                <div className="text-right">
                  <div className="mb-1 text-[12px] font-semibold tracking-wider uppercase opacity-60">
                    Next
                  </div>
                  <div className="text-base leading-snug font-bold text-white">
                    {nextPost.title}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="flex h-auto w-full cursor-not-allowed items-center justify-end gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-neutral-500 opacity-50">
                <div className="text-right">
                  <div className="mb-1 text-[12px] font-semibold tracking-wider uppercase opacity-60">
                    Next
                  </div>
                  <div className="text-sm font-medium">
                    You are on the Last Post
                  </div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div className="my-6 hidden md:block md:w-80">
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
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
