import { buttonVariants } from '@heroui/react';
import { Link } from '@heroui/react';
import { profile, whatsappMessage } from '../_data/portfolio';
import { WhatsappIcon } from '../_components/icons';
import { CardSimple } from '../_components/card-simple';

export const HomeContact = () => {
  const btnSecondary = buttonVariants({ variant: 'secondary', size: 'lg' });
  const whatsappPhone = profile.phone.replace(/\D/g, '');

  return (
    <section id='contacto' className='pt-8 sm:pt-12'>
      <CardSimple caption='Contacto' title='Si necesitas construir algo sólido, podemos conversar.'>
        <div className='flex justify-between gap-4 max-md:flex-col'>
          <p className='text-foreground-2 text-sm leading-7'>
            Puedo aportar tanto en frontend como en backend, con foco en claridad técnica, velocidad de entrega y
            decisiones que reduzcan deuda futura.
          </p>
          <Link
            className={`${btnSecondary} bg-green-600 text-white hover:bg-green-700`}
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <WhatsappIcon className='me-2' />
            Escribirme
          </Link>
        </div>
      </CardSimple>
    </section>
  );
};
