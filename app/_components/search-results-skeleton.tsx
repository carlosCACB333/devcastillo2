/** Esqueleto de búsqueda + resultados mientras se resuelven los `searchParams`. */
export const SearchResultsSkeleton = () => (
  <div aria-hidden='true' className='animate-pulse space-y-10'>
    <div className='h-14 w-full rounded-2xl bg-(--surface)' />
    <div className='grid gap-6 md:grid-cols-2'>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className='aspect-4/3 rounded-2xl bg-(--surface)' />
      ))}
    </div>
  </div>
);
