import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getContentImageUrl } from "./imageUtils";

// All blog content lives under Content/blogs/<slug>
const contentDirectory = path.join(process.cwd(), "Content", "blogs");

export interface Subpost {
  slug: string;
  title: string;
  description: string;
  content: string;
  readTime: string;
  parentSlug: string;
  author?: string;
  date?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  content: string;
  coverImage: string | null;
  subposts: Subpost[];
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const blogDirs = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return blogDirs
    .map<BlogPost>((slug) => {
      const indexPath = path.join(contentDirectory, slug, "index.md");

      if (!fs.existsSync(indexPath)) {
        throw new Error(`index.md not found for blog: ${slug}`);
      }

      const fileContent = fs.readFileSync(indexPath, "utf8");
      const { data, content } = matter(fileContent);

      let coverImagePath: string | null = null;

      if (data.cover) {
        let imageName: string | undefined;

        if (typeof data.cover === "string") {
          if (data.cover.startsWith("./")) {
            imageName = data.cover.substring(2);
          } else if (data.cover.startsWith("/")) {
            coverImagePath = data.cover;
          } else {
            imageName = data.cover;
          }
        }

        if (imageName && !coverImagePath) {
          coverImagePath = getContentImageUrl(slug, imageName);
        }
      } else {
        const blogDir = path.join(contentDirectory, slug);
        const files = fs.readdirSync(blogDir);
        const coverImage = files.find(
          (file) =>
            file.startsWith("cover") &&
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
        );

        if (coverImage) {
          coverImagePath = getContentImageUrl(slug, coverImage);
        }
      }

      const dateValue: string =
        typeof data.date === "string" ? data.date : new Date().toISOString();

      return {
        slug,
        title: (data.title as string) || slug,
        description: (data.description as string) || "",
        date: dateValue,
        author: (data.author as string) || "Anonymous",
        tags: (data.tags as string[]) || [],
        readTime: readingTime(content).text,
        content,
        coverImage: coverImagePath,
        subposts: getSubPosts(slug),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}

function getSubPosts(blogSlug: string): Subpost[] {
  try {
    const blogPath = path.join(contentDirectory, blogSlug);

    if (!fs.existsSync(blogPath)) {
      return [];
    }

    const subpostDirs = fs
      .readdirSync(blogPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .filter((subpostDir) =>
        fs.existsSync(path.join(blogPath, subpostDir, "subpost.mdx")),
      );

    return subpostDirs.map<Subpost>((subpostDir) => {
      const subpostPath = path.join(blogPath, subpostDir, "subpost.mdx");

      const fileContent = fs.readFileSync(subpostPath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        slug: subpostDir,
        title: (data.title as string) || subpostDir,
        description: (data.description as string) || "",
        content,
        readTime: readingTime(content).text,
        parentSlug: blogSlug,
        author: data.author as string | undefined,
        date: typeof data.date === "string" ? data.date : undefined,
      };
    });
  } catch (error) {
    console.error(`Error reading subposts for ${blogSlug}:`, error);
    return [];
  }
}

export function getSubPost(
  blogSlug: string,
  subpostSlug: string,
): Subpost | undefined {
  const subposts = getSubPosts(blogSlug);
  return subposts.find((subpost) => subpost.slug === subpostSlug);
}

export function getPreviousSubPost(
  blogSlug: string,
  currentSubpostSlug: string,
): Subpost | null {
  const subposts = getSubPosts(blogSlug);
  const currentIndex = subposts.findIndex(
    (subpost) => subpost.slug === currentSubpostSlug,
  );

  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }

  return subposts[currentIndex - 1];
}

export function getNextSubPost(
  blogSlug: string,
  currentSubpostSlug: string,
): Subpost | null {
  const subposts = getSubPosts(blogSlug);
  const currentIndex = subposts.findIndex(
    (subpost) => subpost.slug === currentSubpostSlug,
  );

  if (currentIndex === -1 || currentIndex === subposts.length - 1) {
    return null;
  }

  return subposts[currentIndex + 1];
}

export function getPreviousPost(currentSlug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1 || currentIndex === posts.length - 1) {
    return null;
  }

  return posts[currentIndex + 1];
}

export function getNextPost(currentSlug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }

  return posts[currentIndex - 1];
}

export function getSuggestedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);
  const shuffled = otherPosts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}
