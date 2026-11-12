import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import { ComponentProps } from 'react';
import rehypeSlug from 'rehype-slug';

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink({ href, ...props }: ComponentProps<typeof Link>) {
  if ((href as string).startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if ((href as string).startsWith('#')) {
    return <a {...props} />;
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
}

function RoundedImage({ alt, ...props }: ComponentProps<typeof Image>) {
  return <Image alt={alt} className='rounded-lg' {...props} />;
}

function Code({ children, ...props }: { children: string }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

type HeadingProps = ComponentProps<'h2'>;

/** Los ids los genera rehype-slug; aquí solo se añade el enlace ancla. */
function createHeading(level: number) {
  const Tag = `h${level}` as 'h2';
  const Heading = ({ id, children, ...props }: HeadingProps) => (
    <Tag id={id} {...props}>
      {id ? <a href={`#${id}`} className='anchor' aria-hidden='true' tabIndex={-1} /> : null}
      {children}
    </Tag>
  );

  Heading.displayName = `Heading${level}`;

  return Heading;
}

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...props.options,
        mdxOptions: {
          ...props.options?.mdxOptions,
          rehypePlugins: [rehypeSlug, ...(props.options?.mdxOptions?.rehypePlugins ?? [])],
        },
      }}
      components={{
        h1: createHeading(1),
        h2: createHeading(2),
        h3: createHeading(3),
        h4: createHeading(4),
        h5: createHeading(5),
        h6: createHeading(6),
        Image: RoundedImage,
        a: CustomLink,
        code: Code,
        Table,
        ...(props.components || {}),
      }}
    />
  );
}
