interface Props {
  data: Record<string, unknown>;
}

/**
 * Renderiza datos estructurados (schema.org) escapando `<` para evitar XSS.
 */
export const JsonLd = ({ data }: Props) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);
