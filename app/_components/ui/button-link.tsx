import { ButtonVariants, buttonVariants } from '@heroui/styles';
import { Route } from 'next';
import NextLink, { LinkProps } from 'next/link';

interface Props extends LinkProps<Route>, ButtonVariants {}

export const ButtonLink = ({ isIconOnly, fullWidth, size, variant, className, ...linkProps }: Props) => {
  const btnClass = buttonVariants({
    variant,
    size,
    isIconOnly,
    fullWidth,
    className,
  });

  return <NextLink {...linkProps} className={btnClass} />;
};
