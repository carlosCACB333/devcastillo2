import { linkVariants } from '@heroui/styles';
import { Route } from 'next';
import Link, { LinkProps } from 'next/link';

export const NextLink = ({ className, ...props }: LinkProps<Route>) => {
    const linkClass = linkVariants({ className });

    return <Link {...props} className={linkClass.base()} />;
};
