import { CardSimple } from '../../_components/card-simple';

interface Props {
  totalCount: number;
  q?: string;
}

export const ProjectsSummary = ({ totalCount, q = '' }: Props) => {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <CardSimple caption='Resultados' title={`${totalCount} proyectos`}>
        {q !== '' ? `Mostrando resultados para "${q}".` : 'Mostrando todos los proyectos disponibles.'}
      </CardSimple>
      <CardSimple caption='Tecnologías' title='Stack variado'>
        Frontend, backend, mobile, microservicios y cloud.
      </CardSimple>
      <CardSimple caption='Enlaces' title='Código y demos'>
        Accede a repositorios y versiones en producción.
      </CardSimple>
    </div>
  );
};
