---
cover: "./cover.png"
title: "Blog Rendering Test: All Elements"
description: "A comprehensive test post that uses every major Markdown/MDX feature in this blog system."
date: "2026-03-02"
author: "Test Runner"
tags: ["Testing", "Markdown", "MDX", "Next.js", "Demo"]
---

This post exists **only for testing** your blog rendering pipeline.  
It is intentionally long and uses as many Markdown features as possible so you can verify:

- Typography for headings and paragraphs
- Lists (ordered, unordered, nested)
- Links
- Inline code and code blocks
- Blockquotes
- Tables
- Horizontal rules

If anything looks off, you probably need to adjust your `MDXComponents` or Tailwind classes.

---

## 1. Headings and Basic Text

### 1.1 Heading levels

This is an H1 (the title above).

## This is an H2 example

Lorem ipsum dolor sit amet, **consectetur** adipiscing _elit_. You can also mix **bold _and italic_** together.

### This is an H3 example

Use H3s for subsections. You can also add `inline code` like `npm run dev` in the same paragraph.

---

## 2. Links and Emphasis

A normal paragraph with a [link to Next.js docs](https://nextjs.org/docs) and another to [Tailwind CSS](https://tailwindcss.com/).

More emphasis examples:

- **Bold text**
- _Italic text_
- ~~Strikethrough (falls back to default styling if not customized)~~

---

## 3. Lists

### 3.1 Unordered list

- Item one
- Item two
	- Nested item two-a
	- Nested item two-b
- Item three

### 3.2 Ordered list

1. Step one
2. Step two
3. Step three

### 3.3 Mixed list

1. Install dependencies:
	 - `gray-matter`
	 - `react-markdown`
	 - `reading-time`
2. Create content files in `Content/blogs`
3. Run `npm run dev`

---

## 4. Code Samples

### 4.1 Inline code

Use `npm run dev` to start the development server, and `npm run build` to build for production.

### 4.2 Code block – shell

```bash
# Install dependencies
npm install gray-matter react-markdown reading-time lucide-react

# Run dev server
npm run dev
```

### 4.3 Code block – TypeScript

```ts
import { getAllBlogPosts } from "@/lib/blog";

export function getLatestPostTitle() {
	const posts = getAllBlogPosts();
	if (!posts.length) return "No posts yet";
	return posts[0].frontmatter.title;
}
```

### 4.4 Code block – JSX

```tsx
import ReactMarkdown from "react-markdown";
import { MDXComponents } from "@/components/MDXComponents";

export function BlogBody({ content }: { content: string }) {
	return (
		<div className="prose prose-neutral dark:prose-invert">
			<ReactMarkdown components={MDXComponents}>{content}</ReactMarkdown>
		</div>
	);
}
```

---

## 5. Blockquotes

> This is a simple blockquote.
> It should stand out from the main text and be easy to read.

> **Pro tip:** Long-form technical content benefits a lot from clear headings, tables, and highlighted code.

---

## 6. Tables

A table to test how tabular data appears:

| Feature       | Location                        | Notes                             |
| ------------- | ------------------------------- | --------------------------------- |
| Content       | `Content/blogs/*/index.md`      | Markdown/MDX, frontmatter + body |
| Loader        | `lib/blog.ts`                   | Reads files, computes read time   |
| List page     | `app/blog/page.tsx`             | Shows all posts                   |
| Detail page   | `app/blog/[slug]/page.tsx`      | Renders a single article          |
| Components    | `components/MDXComponents.tsx`  | Controls markdown typography      |

---

## 7. Images (If Configured)

If you add a `cover.png` next to this file, you can reference it like:

```md
![Sample cover image](./cover.png)
```

Or an external image:

![Next.js Logo](./cover.png)

(If image behavior looks odd, you can later add a custom `img` entry to `MDXComponents`.)

---

## 8. Horizontal Rules

Above and below this sentence are horizontal rules:

---

This should visually separate sections in a long article.

---

## 9. Long-Form Text Sample

Sometimes you just need a big block of text to see how the reading experience feels.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lacus nec justo tincidunt consectetur. Mauris malesuada arcu sed sem dignissim, sed pulvinar leo dapibus. Integer bibendum urna a semper fermentum. Suspendisse potenti. Cras scelerisque, lorem id porttitor blandit, massa arcu pharetra nibh, at vestibulum arcu risus et augue.

Another paragraph to test vertical rhythm and spacing between paragraphs. Maecenas laoreet, augue ac suscipit convallis, est massa aliquam est, id hendrerit justo nisi in lacus. Aenean eget pulvinar justo, id tincidunt elit.

---

## 10. Final Checklist

If this test post renders correctly, you should see:

- Clean spacing between headings and paragraphs
- Nicely styled lists (bullets, numbers, nested items)
- Distinct look for inline code and code blocks
- Styled links with hover state
- Blockquotes that stand out visually
- Tables aligned and readable
- Horizontal rules with good spacing

Once you’re happy with the visuals:

1. Delete or rename this test post.
2. Start adding real content to `Content/blogs/your-new-post/index.md`.
3. Enjoy your Headbanger-style blogging platform.
