import { NextLink } from './_components/ui/next-link';

export default function NotFound() {
  return (
    <main className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='w-full max-w-lg space-y-8 text-center'>
        <div className='space-y-4'>
          <div className='flex justify-center'>
            <span className='text-foreground/40 text-6xl font-bold tracking-tight'>404</span>
          </div>
          <h1 className='text-4xl font-semibold tracking-tight'>Página no encontrada</h1>
          <p className='text-foreground-2 mx-auto max-w-md text-base leading-7'>
            La página que buscas no existe o fue movida. Revisá la URL o volvé al inicio.
          </p>
        </div>

        <div className='flex justify-center'>
          <NextLink href='/'>Volver al inicio</NextLink>
        </div>
      </div>
    </main>
  );
}
