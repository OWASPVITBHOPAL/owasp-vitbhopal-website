import Link from "next/link";

import { Metadata } from "next";
import { Clock } from "lucide-react";
import Header from "@/components/layout/header";

import { getAllBlogPosts } from "@/lib/blog";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest insights, tutorials, write-ups, and updates from the OWASP VIT Bhopal cybersecurity community.",
};

export default async function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <Container className="min-h-screen px-4 py-10 md:px-6 lg:px-8">
      <Header title="Our Blog">
        Insights, tutorials, and updates from the OWASP VIT Bhopal community.
      </Header>

      <div className="my-4 w-full border-2 border-dashed border-white/12" />

      <div className="mx-auto mt-12 w-full space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-lg text-white/60">Comming Soon</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[#121212] shadow-[inset_2px_2px_8px_0px_rgba(255,255,255,0.05),inset_1px_0px_8px_0px_rgba(255,255,255,0.01)] transition-all duration-300 hover:bg-[#181818]"
              >
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h2 className="text-xl leading-tight font-bold text-white group-hover:text-white/90">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <div className="text-sm font-medium text-neutral-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-neutral-500" />
                      <span>{post.readTime}</span>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-500">By:</span>
                        <span className="text-neutral-300">{post.author}</span>
                      </div>
                    )}
                  </div>

                  {post.description && (
                    <p className="mb-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                      {post.description}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
