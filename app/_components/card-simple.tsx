import { Card } from '@heroui/react';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  caption?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  imageSrc?: string;
  imageCaption?: ReactNode;
  href?: Route;
  linkLabel?: string;
  footer?: ReactNode;
  titleSize?: 'md' | 'lg' | 'xl' | '2xl';
  padding?: boolean;
}

export const CardSimple = ({
  caption,
  title,
  imageSrc,
  imageCaption,
  children,
  href,
  linkLabel,
  titleSize = 'lg',
  footer,
  padding = true,
}: Props) => {
  const isExternal = href && href.startsWith('http');
  const linkText = linkLabel ?? (typeof title === 'string' ? title : 'Abrir tarjeta');

  return (
    <Card className='group relative overflow-hidden'>
      {imageSrc && (
        <div className='relative aspect-4/3 overflow-hidden rounded-2xl'>
          <Image
            src={imageSrc}
            alt={'card image'}
            className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
            loading='lazy'
            width={400}
            height={200}
          />
          {imageCaption && (
            <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/20 to-transparent p-4'>
              {imageCaption}
            </div>
          )}
        </div>
      )}
      <div className={`${padding ? 'space-y-6 p-6 md:p-8' : ''} ${href ? 'pointer-events-none' : ''}`}>
        <Card.Content className='space-y-3'>
          {caption && <div className='text-muted text-xs font-semibold tracking-[0.24em] uppercase'>{caption}</div>}
          {title && <div className={`text-${titleSize} font-semibold tracking-tight`}>{title}</div>}
          {children && <div className='text-foreground-2 text-sm leading-7'>{children}</div>}
        </Card.Content>
        {footer && (
          <>
            <div className='border-t' />
            <Card.Footer className='[&_a]:pointer-events-auto [&_a]:relative [&_a]:z-30'>{footer}</Card.Footer>
          </>
        )}
      </div>

      {href && (
        <Link
          href={href}
          aria-label={linkText}
          className='focus-visible:ring-primary/60 absolute inset-0 z-20 rounded-2xl outline-none focus-visible:ring-2'
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
        >
          <span className='sr-only'>{linkText}</span>
        </Link>
      )}
    </Card>
  );
};
