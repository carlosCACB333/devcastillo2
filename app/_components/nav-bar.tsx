import { Avatar } from '@heroui/react';
import { Route } from 'next';
import Link from 'next/link';
import { Profile } from '../_data/portfolio';
import { GithubIcon, LinkedinIcon } from './icons';
import { ThemeSwitch } from './theme-switch';
import { ButtonLink } from './ui/button-link';
import { NextLink } from './ui/next-link';

const navigationItems: { href: Route; label: string }[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/certificates', label: 'Certificados' },
] as const;

interface Props {
  profile: Profile;
}

export const NavBar = ({ profile }: Props) => {
  return (
    <nav className='sticky top-0 z-50 border-b backdrop-blur-sm'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
        <Link className='flex items-center gap-4' href='/'>
          <Avatar>
            <Avatar.Image src={profile.avatarUrl} alt={profile.name} />
            <Avatar.Fallback>{profile.nickname}</Avatar.Fallback>
          </Avatar>
          <div>
            <p className='text-foreground text-sm font-medium'>{profile.name}</p>
            <p className='text-foreground-2 text-xs'>{profile.role}</p>
          </div>
        </Link>

        <div className='flex items-center gap-2 max-md:flex-col max-md:items-start md:gap-4'>
          {navigationItems.map((item) => (
            <NextLink key={item.href} href={item.href}>
              {item.label}
            </NextLink>
          ))}
        </div>
        <div className='flex items-center max-md:flex-col'>
          <ButtonLink
            href={profile.linkedin as Route}
            target='_blank'
            rel='noreferrer'
            size='sm'
            variant='ghost'
            isIconOnly
          >
            <LinkedinIcon />
          </ButtonLink>
          <ButtonLink
            href={profile.github as Route}
            target='_blank'
            rel='noreferrer'
            size='sm'
            variant='ghost'
            isIconOnly
          >
            <GithubIcon />
          </ButtonLink>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};
