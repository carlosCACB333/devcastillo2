import { experiences } from '../_data/portfolio';
import { ExperienceCard } from './experience-card';
import { SectionHeading } from './section-heading';

export const HomeExperience = () => {
  return (
    <section id='experiencia' className='space-y-6 pt-8 sm:pt-12'>
      <SectionHeading
        eyebrow='Experiencia'
        title='Trayectoria enfocada en producto, rendimiento y escalabilidad'
        description='Cada etapa aportó una capa distinta: experiencia de usuario, arquitectura de servicios y decisiones técnicas que sostienen sistemas reales.'
      />

      <div className='space-y-4'>
        {experiences.map((experience) => (
          <ExperienceCard key={`${experience.company}-${experience.role}`} experience={experience} />
        ))}
      </div>
    </section>
  );
};
