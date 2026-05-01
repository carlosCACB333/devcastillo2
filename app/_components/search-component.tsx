import { Button, Chip } from '@heroui/react';
import { Route } from 'next';
import Form from 'next/form';
import { CardSimple } from './card-simple';

interface Props {
  defaultQuery?: string;
  totalCount: number;
  action: Route;
  title: string;
  description: string;
}

export const SearchComponent = ({ defaultQuery, totalCount, action, title, description }: Props) => {
  return (
    <>
      <CardSimple caption='Buscar'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold tracking-tight'>{title}</h2>
            <p className='text-foreground-2 text-sm leading-6'>{description}</p>
          </div>

          <Form className='flex w-full flex-col justify-end gap-3 lg:max-w-xl lg:flex-row' action={action}>
            <input type='hidden' name='page' value='1' />
            <label className='sr-only' htmlFor='search-component'>
              Buscar
            </label>
            <input
              id='search-component'
              name='q'
              defaultValue={defaultQuery}
              placeholder='Buscar por nombre...'
              className='placeholder:text-foreground/40 bg-surface h-11 w-full rounded-full border border-(--app-border) px-4 text-sm transition outline-none focus:border-slate-400'
            />
            <Button type='submit' variant='tertiary' size='lg'>
              Buscar
            </Button>
          </Form>
        </div>

        <div className='mt-4 flex flex-wrap items-center gap-3 text-sm'>
          <Chip size='sm' variant='soft'>
            {totalCount} resultados
          </Chip>
          <span className='text-foreground-2'>
            {defaultQuery !== '' ? `Mostrando resultados para "${defaultQuery}"` : 'Mostrando todos los resultados'}
          </span>
        </div>
      </CardSimple>
    </>
  );
};
