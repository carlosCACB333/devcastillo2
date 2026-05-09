import { Experience } from '@/app/_data/portfolio';
import { Card, Chip } from '@heroui/react';

export const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <Card>
      <Card.Content className='space-y-6 p-6 sm:p-7'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='space-y-1'>
            <p className='text-foreground text-lg font-semibold'>{experience.role}</p>
            <p className='text-muted text-sm'>{experience.company}</p>
          </div>
          <Chip size='sm' variant='soft'>
            {experience.period}
          </Chip>
        </div>

        <p className='text-foreground/65 text-sm leading-7'>{experience.summary}</p>

        <ul className='text-foreground/70 space-y-3 text-sm leading-6'>
          {experience.achievements.map((achievement) => (
            <li key={achievement} className='flex gap-3'>
              <span className='bg-foreground/35 mt-2 h-1.5 w-1.5 shrink-0 rounded-full' />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-2'>
          {experience.technologies.map((technology) => (
            <Chip key={technology} size='sm' variant='soft'>
              {technology}
            </Chip>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};
