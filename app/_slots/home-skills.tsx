import { Chip } from '@heroui/react';
import { CardSimple } from '../_components/card-simple';
import { skillGroups } from '../_data/portfolio';
import { SectionHeading } from './section-heading';

export const HomeSkills = () => {
  return (
    <section id='habilidades' className='space-y-6 pt-8 sm:pt-12'>
      <SectionHeading
        eyebrow='Competencias'
        title='Stack técnico organizado por capas'
        description='Agrupo mis habilidades por dominios para mantener claridad sobre dónde puedo aportar valor inmediato y cómo escalar una solución.'
      />

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {skillGroups.map((group) => (
          <CardSimple key={group.title} title={group.title}>
            <div className='flex flex-wrap gap-2'>
              {group.items.map((item) => (
                <Chip key={item} size='sm' variant='soft'>
                  {item}
                </Chip>
              ))}
            </div>
          </CardSimple>
        ))}
      </div>
    </section>
  );
};
