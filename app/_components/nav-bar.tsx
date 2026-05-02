import { Avatar, buttonVariants, linkVariants } from '@heroui/react';
import { ThemeSwitch } from './theme-switch';
import { Profile } from '../_data/portfolio';
import Link from 'next/link';
import { Route } from 'next';
import { GithubIcon, LinkedinIcon } from './icons';

const navigationItems: { href: Route; label: string }[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/certificates', label: 'Certificados' },
] as const;

interface Props {
  profile: Profile;
}

export const NavBar = ({ profile }: Props) => {
  const linkClass = linkVariants();
  const btnClass = buttonVariants({ variant: 'ghost', size: 'sm', isIconOnly: true });

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

        <div className='flex max-md:flex-col max-md:items-start items-center gap-2 md:gap-4'>
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass.base()}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className='flex max-md:flex-col items-center'>
          <Link href={profile.linkedin as Route} target='_blank' rel='noreferrer' className={btnClass}>
            <LinkedinIcon />
          </Link>
          <Link href={profile.github as Route} target='_blank' rel='noreferrer' className={btnClass}>
            <GithubIcon />
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};
