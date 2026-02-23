export type AntiPage = {
  slug: string;
  service: string;
  jurisdiction: string;
  variant: 'V1' | 'V2' | 'V3' | 'V4';
  audience: 'B2B' | 'B2C' | 'Direct';
  seo?: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: { title: string };
  context: { title: string; body: string };
  scope: { title: string; body: string };
  irreversibility: { title: string; body: string };
  process: { title: string; body: string };
  trust: { title: string; body: string };
  cta: { label: string };
};

export function validateAntiPages(data: unknown): AntiPage[] {
  if (!Array.isArray(data)) {
    throw new Error('AntiPages data must be an array');
  }

  const validVariants = ['V1', 'V2', 'V3', 'V4'];
  const validAudiences = ['B2B', 'B2C', 'Direct'];

  return data.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Item at index ${index} is not an object`);
    }

    const { slug, service, jurisdiction, variant, audience, seo } = item as any;

    if (typeof slug !== 'string') throw new Error(`Invalid slug at index ${index}`);
    if (typeof service !== 'string') throw new Error(`Invalid service at index ${index}`);
    if (typeof jurisdiction !== 'string') throw new Error(`Invalid jurisdiction at index ${index}`);

    if (!validVariants.includes(variant))
      throw new Error(`Invalid variant at index ${index}: ${variant}`);
    if (!validAudiences.includes(audience))
      throw new Error(`Invalid audience at index ${index}: ${audience}`);

    const result = { slug, service, jurisdiction, variant, audience } as AntiPage;

    if (seo !== undefined) {
      if (typeof seo !== 'object' || seo === null) throw new Error(`Invalid seo at index ${index}`);
      if (typeof seo.title !== 'string') throw new Error(`Invalid seo.title at index ${index}`);
      if (typeof seo.description !== 'string')
        throw new Error(`Invalid seo.description at index ${index}`);
      if (typeof seo.canonical !== 'string')
        throw new Error(`Invalid seo.canonical at index ${index}`);

      result.seo = {
        title: seo.title,
        description: seo.description,
        canonical: seo.canonical,
      };
    }

    // Strict validation: no extra fields
    const allowedKeys = [
      'slug',
      'service',
      'jurisdiction',
      'variant',
      'audience',
      'seo',
      'hero',
      'context',
      'scope',
      'irreversibility',
      'process',
      'trust',
      'cta',
    ];
    const actualKeys = Object.keys(item);
    for (const key of actualKeys) {
      if (!allowedKeys.includes(key)) {
        throw new Error(`Unexpected field '${key}' at index ${index}`);
      }
    }

    const { hero, context, scope, irreversibility, process, trust, cta } = item as any;
    if (!hero || typeof hero.title !== 'string') throw new Error(`Invalid hero at index ${index}`);
    if (!context || typeof context.title !== 'string' || typeof context.body !== 'string')
      throw new Error(`Invalid context at index ${index}`);
    if (!scope || typeof scope.title !== 'string' || typeof scope.body !== 'string')
      throw new Error(`Invalid scope at index ${index}`);
    if (
      !irreversibility ||
      typeof irreversibility.title !== 'string' ||
      typeof irreversibility.body !== 'string'
    )
      throw new Error(`Invalid irreversibility at index ${index}`);
    if (!process || typeof process.title !== 'string' || typeof process.body !== 'string')
      throw new Error(`Invalid process at index ${index}`);
    if (!trust || typeof trust.title !== 'string' || typeof trust.body !== 'string')
      throw new Error(`Invalid trust at index ${index}`);
    if (!cta || typeof cta.label !== 'string') throw new Error(`Invalid cta at index ${index}`);

    result.hero = hero;
    result.context = context;
    result.scope = scope;
    result.irreversibility = irreversibility;
    result.process = process;
    result.trust = trust;
    result.cta = cta;

    return result;
  });
}
