import React from 'react';

type ElementProps = {
  children?: React.ReactNode;
  id?: string;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
};

type CodeProps = {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
};

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const extractText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children) && children.props) return extractText((children.props as any).children);
  return '';
};

const generateId = (children: React.ReactNode) => {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const components = {
  h1: ({ children, id }: ElementProps) => {
    const generatedId = id || generateId(children);
    return (
      <h1 id={generatedId} className="text-3xl font-bold text-white mb-6 mt-10 leading-tight pb-3 border-b border-white/10 first:mt-0">
        {children}
      </h1>
    );
  },
  h2: ({ children, id }: ElementProps) => {
    const generatedId = id || generateId(children);
    return (
      <h2 id={generatedId} className="text-2xl font-bold text-white/90 mb-4 mt-8 leading-tight">
        {children}
      </h2>
    );
  },
  h3: ({ children, id }: ElementProps) => {
    const generatedId = id || generateId(children);
    return (
      <h3 id={generatedId} className="text-xl font-semibold text-white/80 mb-3 mt-6 leading-tight">
        {children}
      </h3>
    );
  },
  h4: ({ children, id }: ElementProps) => {
    const generatedId = id || generateId(children);
    return (
      <h4 id={generatedId} className="text-lg font-semibold text-white/70 mb-3 mt-4 leading-tight">
        {children}
      </h4>
    );
  },
  p: ({ children }: ElementProps) => (
    <p className="text-neutral-300 leading-relaxed mb-6 text-base/7 font-light">
      {children}
    </p>
  ),
  ul: ({ children }: ElementProps) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300 marker:text-white/40">
      {children}
    </ul>
  ),
  ol: ({ children }: ElementProps) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-300 marker:text-white/40">
      {children}
    </ol>
  ),
  li: ({ children }: ElementProps) => (
    <li className="leading-relaxed text-neutral-300 pl-1">
      {children}
    </li>
  ),
  blockquote: ({ children }: ElementProps) => (
    <blockquote className="border-l-[3px] border-white/20 pl-6 py-2 mb-6 italic text-neutral-400 bg-white/5 rounded-r-xl">
      {children}
    </blockquote>
  ),
  code: ({ children, className, inline }: CodeProps) => {
    const isInline = inline || !className;

    if (isInline) {
      return (
        <code className="bg-white/10 text-neutral-200 px-1.5 py-0.5 text-sm font-mono rounded border border-white/5">
          {children}
        </code>
      );
    }

    return (
      <code className={`${className || ''} text-sm text-neutral-200 font-mono`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: ElementProps) => (
    <pre className="bg-[#0f0f11] text-neutral-300 p-5 overflow-x-auto mb-8 text-sm border border-white/10 rounded-2xl shadow-inner font-mono leading-relaxed custom-scrollbar">
      {children}
    </pre>
  ),
  a: ({ href, children, ...rest }: AnchorProps) => (
    <a
      href={href}
      className="text-white font-medium hover:text-white/80 underline underline-offset-4 decoration-white/30 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-white/10 my-10" />,
  table: ({ children }: ElementProps) => (
    <div className="overflow-x-auto mb-8 rounded-2xl border border-white/10 bg-white/[0.02]">
      <table className="min-w-full text-neutral-300">{children}</table>
    </div>
  ),
  thead: ({ children }: ElementProps) => <thead className="bg-white/5 border-b border-white/10">{children}</thead>,
  tbody: ({ children }: ElementProps) => (
    <tbody className="divide-y divide-white/5">{children}</tbody>
  ),
  tr: ({ children }: ElementProps) => <tr className="hover:bg-white/5 transition-colors">{children}</tr>,
  th: ({ children }: ElementProps) => (
    <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
      {children}
    </th>
  ),
  td: ({ children }: ElementProps) => (
    <td className="px-6 py-4 text-sm border-b border-white/5 last:border-0">{children}</td>
  ),
  img: ({ src, alt, ...rest }: ImageProps) => (
    <img
      src={src}
      alt={alt}
      className="shadow-md mb-6 max-w-full h-auto border border-border"
      {...rest}
    />
  ),
  dl: ({ children }: ElementProps) => <dl className="mb-6 space-y-2">{children}</dl>,
  dt: ({ children }: ElementProps) => (
    <dt className="font-semibold text-foreground">{children}</dt>
  ),
  dd: ({ children }: ElementProps) => (
    <dd className="ml-4 text-muted-foreground mb-2">{children}</dd>
  ),
  kbd: ({ children }: ElementProps) => (
    <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border shadow-sm">
      {children}
    </kbd>
  ),
};

export default components;
