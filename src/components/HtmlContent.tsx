import React from 'react';

/**
 * HtmlContent component - Safely renders HTML content from translations
 *
 * This component allows HTML tags (like <br />) to be used in translation strings
 * while maintaining a clean, reusable API across the entire website.
 *
 * @param content - The HTML string to render (from translations)
 * @param className - Optional CSS classes to apply to the wrapper element
 * @param as - The HTML element type to render (default: 'div')
 *
 * @example
 * // In your component:
 * <HtmlContent
 *   content={t('hero.title')}
 *   as="h1"
 *   className="text-4xl font-bold"
 * />
 *
 * // In translation file (es.json):
 * {
 *   "hero": {
 *     "title": "Ingeniería de documentos<br /> para resultados de éxito"
 *   }
 * }
 */

interface HtmlContentProps {
  content: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  className = '',
  as: Component = 'div',
}) => {
  return <Component className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HtmlContent;
