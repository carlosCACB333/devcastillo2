interface Props {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionHeading = ({ eyebrow, title, description }: Props) => {
  return (
    <div className='max-w-2xl space-y-3'>
      <p className='text-muted text-xs font-semibold tracking-[0.24em] uppercase'>{eyebrow}</p>
      <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{title}</h2>
      <p className='text-foreground-2 text-sm leading-7 sm:text-base'>{description}</p>
    </div>
  );
};
