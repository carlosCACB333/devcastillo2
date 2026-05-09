'use client';

import { Button } from '@heroui/react';
import { NextLink } from './_components/ui/next-link';
import { AlertCircleIcon } from './_components/icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <main className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='w-full max-w-lg space-y-8 text-center'>
        <div className='space-y-4'>
          <div className='flex justify-center'>
            <AlertCircleIcon size={50}/>
          </div>
          <h1 className='text-4xl font-semibold tracking-tight'>Algo salió mal</h1>
          <p className='text-foreground-2 mx-auto max-w-md text-base leading-7'>
            Ocurrió un error inesperado. Ya lo registramos, pero podés intentar de nuevo mientras lo revisamos.
          </p>
          {error.digest && (
            <p className='text-foreground/40 text-xs'>Error ID: {error.digest}</p>
          )}
        </div>

        <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button variant='secondary' size='lg' onPress={() => reset()}>
            Intentar de nuevo
          </Button>
          <NextLink href={'/'} >
            Volver al inicio
          </NextLink>
        </div>
      </div>
    </main>
  );
}
