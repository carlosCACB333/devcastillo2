import { CardSimple } from '../_components/card-simple';
import { highlights } from '../_data/portfolio';

export const HomeHighlights = () => {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {highlights.map((highlight) => (
        <CardSimple key={highlight.label + highlight.value} title={highlight.value} caption={highlight.label}>
          {highlight.note}
        </CardSimple>
      ))}
    </div>
  );
};
