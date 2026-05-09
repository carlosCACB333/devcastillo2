import { SearchComponent } from '../../_components/search-component';

interface Props {
  defaultQuery?: string;
  totalCount: number;
}

export const CertificatesSearchSection = ({ defaultQuery, totalCount }: Props) => {
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
