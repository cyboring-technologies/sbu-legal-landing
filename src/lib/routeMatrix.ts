import data from '../data/antipages.json';
import { validateAntiPages, AntiPage } from './antiPageSchema';

const validatedPages = validateAntiPages(data);

export const allSlugs: string[] = validatedPages.map((page: AntiPage) => page.slug);

export function getPageBySlug(slug: string): AntiPage | undefined {
    return validatedPages.find((page: AntiPage) => page.slug === slug);
}
