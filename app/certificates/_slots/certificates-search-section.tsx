import { SearchComponent } from '../../_components/search-component';

interface Props {
  defaultQuery?: string;
  totalCount: number;
}

export const CertificatesSearchSection = async ({ defaultQuery, totalCount }: Props) => {
  'use cache';

  return (
    <SearchComponent
      action='/certificates'
      defaultQuery={defaultQuery}
      totalCount={totalCount}
      title='Buscar certificados'
      description='Filtra por nombre de certificado'
    />
  );
};
