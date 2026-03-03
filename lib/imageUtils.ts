import fs from 'fs';
import path from 'path';

export function getContentImageUrl(slug: string, imageName: string): string {
  // Blog images are stored alongside markdown in Content/blogs/<slug>
  const contentImagePath = path.join(
    process.cwd(),
    'Content',
    'blogs',
    slug,
    imageName,
  );
  const publicImagePath = path.join(
    process.cwd(),
    'public',
    'blog-images',
    slug
  );

  if (!fs.existsSync(publicImagePath)) {
    fs.mkdirSync(publicImagePath, { recursive: true });
  }

  const publicImageFile = path.join(publicImagePath, imageName);

  if (fs.existsSync(contentImagePath) && !fs.existsSync(publicImageFile)) {
    fs.copyFileSync(contentImagePath, publicImageFile);
  }

  return `/blog-images/${slug}/${imageName}`;
}
