import { Chip } from '@heroui/react';
import { CardSimple } from '../_components/card-simple';
import { education } from '../_data/portfolio';
import { SectionHeading } from './section-heading';

export const HomeEducation = () => {
  return (
    <section className='grid gap-4 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:pt-12'>
      <div className='space-y-6'>
        <SectionHeading
          eyebrow='Formación'
          title='Base académica y aprendizaje continuo'
          description='Combino formación universitaria con certificaciones y práctica constante en plataformas y proyectos reales.'
        />
      </div>

      <div className='space-y-4'>
        {education.map((item) => (
          <CardSimple key={`${item.institution}-${item.title}`} title={item.institution} caption={item.title}>
            <div className='mb-3 flex items-center gap-2'>
              <Chip size='sm' variant='soft'>
                {item.period}
              </Chip>
            </div>
            <p className='text-foreground-2 text-sm leading-7'>{item.description}</p>
          </CardSimple>
        ))}
      </div>
    </section>
  );
};
