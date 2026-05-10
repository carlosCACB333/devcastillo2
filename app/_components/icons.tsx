import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type IconProps = ComponentPropsWithoutRef<'svg'> & { size?: number };

const Svg = ({ children, ...props }: { children: ReactNode } & IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    width={props.size ?? 24}
    height={props.size ?? 24}
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    {children}
  </svg>
);

export const GithubIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5' />
  </Svg>
);

export const WorldIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
    <path d='M3.6 9h16.8' />
    <path d='M3.6 15h16.8' />
    <path d='M11.5 3a17 17 0 0 0 0 18' />
    <path d='M12.5 3a17 17 0 0 1 0 18' />
  </Svg>
);

export const MoonIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008' />
  </Svg>
);

export const SunIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
    <path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' />
  </Svg>
);

export const LinkIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
    <path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' />
  </Svg>
);

export const WhatsappIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
    <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
  </Svg>
);

export const LinkedinIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M8 11v5' />
    <path d='M8 8v.01' />
    <path d='M12 16v-5' />
    <path d='M16 16v-3a2 2 0 1 0 -4 0' />
    <path d='M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10' />
  </Svg>
);

export const AlertCircleIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d='M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
    <path d='M12 9v4' />
    <path d='M12 16v.01' />
  </Svg>
);
