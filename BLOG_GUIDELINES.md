# How to Write a Blog

This guide explains how to create and publish a new blog post on the OWASP VIT Bhopal website.

## 1. Create a New Folder

All blogs are stored in the `Content/blogs/` directory. 
To create a new blog, first create a new folder inside `Content/blogs/`. The name of this folder will be used as the URL slug for your blog post. 

For example:
`Content/blogs/my-awesome-writeup/`

## 2. Create the `index.md` File

Inside your newly created folder, create a file named `index.md`. This file will contain the content of your blog post.

## 3. Add the Required Frontmatter

At the very top of your `index.md` file, you must include a YAML frontmatter block. This provides metadata about your blog post. 

Copy and paste the following template at the top of your `index.md` file, and fill in the details:

```yaml
---
title: "Your Blog Post Title"
description: "A short, engaging description of what your blog post is about."
date: "YYYY-MM-DD"
author: "Your Name or Team Name"
tags: ["CTF", "Web", "Writeups", "AnyOtherTag"]
---
```

**Frontmatter Fields:**
- `title`: The main title of your blog post.
- `description`: A brief summary that will appear on the blog listing page.
- `date`: The publication date in `YYYY-MM-DD` format (e.g., `2026-03-04`).
- `author`: The person or team who wrote the post.
- `tags`: A list of relevant technical tags to help categorize the post.

## 4. Write Your Content

Below the frontmatter (after the second `---`), you can start writing your blog content using standard Markdown.

```markdown
---
... frontmatter ...
---

## Introduction
Welcome to my new blog post! Here is some **bold text** and a [link](https://owasp.org).

### Code Snippets
You can include code snippets like this:

\```python
print("Hello, OWASP!")
\```
```

## 5. Adding Images

If your blog post requires images (like a cover image or screenshots), place them directly inside the same folder as your `index.md` file.

For example:
`Content/blogs/my-awesome-writeup/cover.png`

You can then reference these images in your markdown (depending on the exact site component setup, usually via relative paths or Next.js image imports if handled by the markdown parser).

## Example Directory Structure

A complete blog post might look like this:

```text
Content/blogs/
└── my-awesome-writeup/
    ├── index.md       # Your main content and frontmatter
    ├── cover.png      # Cover image
    └── screenshot.jpg # Any other image used in the blog
```

## 6. Review and Submit

Once you are done writing your post and adding any necessary assets, run the development server (`npm run dev`) to preview it locally. If everything looks good, commit your changes and submit a Pull Request!
