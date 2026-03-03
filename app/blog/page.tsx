import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import Header from '@/components/layout/header';

import { getAllBlogPosts } from '@/lib/blog';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Blog | OWASP VIT Bhopal',
};

export default async function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <Container className="px-4 md:px-6 lg:px-8 py-10 min-h-screen">
      <Header title="Our Blog">
        Insights, tutorials, and updates from the OWASP VIT Bhopal community.
      </Header>
      
      <div className='w-full border-2 my-4 border-dashed border-white/12' />

      <div className="w-full mx-auto space-y-8 mt-12">
        {posts.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No posts yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col h-full bg-white/[0.02] rounded-2xl overflow-hidden border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {post.coverImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative w-full h-56 block overflow-hidden"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10" />
                  </Link>
                )}

                <div className="flex flex-col flex-1 p-6 gap-4">
                  <h2 className="text-xl font-bold text-white leading-tight group-hover:text-white/90">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <div className="text-sm text-neutral-400 font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-neutral-500" />
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
                    <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-2">
                      {post.description}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
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
