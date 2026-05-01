import { SearchComponent } from '../../_components/search-component';

interface Props {
  defaultQuery?: string;
  totalCount: number;
}

export const ProjectsSearchSection = ({ defaultQuery, totalCount }: Props) => {
  return (
    <SearchComponent
      action='/projects'
      defaultQuery={defaultQuery}
      totalCount={totalCount}
      title='Buscar proyectos'
      description='Filtra por nombre o término relacionado'
    />
  );
};
