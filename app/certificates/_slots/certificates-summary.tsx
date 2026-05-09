import { CardSimple } from '../../_components/card-simple';

interface Props {
  totalCount: number;
  q?: string;
}

export const CertificatesSummary = ({ totalCount, q = '' }: Props) => {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <CardSimple titleSize='2xl' caption='Resultados' title={`${totalCount} certificados`}>
        {q !== '' ? `Mostrando resultados para "${q}".` : 'Mostrando todos los certificados disponibles.'}
      </CardSimple>
      <CardSimple titleSize='2xl' caption='Tipos' title='Variedad de certificaciones'>
        Certificaciones de cloud, desarrollo, metodologías ágiles y más.
      </CardSimple>
      <CardSimple titleSize='2xl' caption='Enlaces' title='Verificación y detalles'>
        Accede a detalles y verificaciones oficiales de cada certificado.
      </CardSimple>
    </div>
  );
};
