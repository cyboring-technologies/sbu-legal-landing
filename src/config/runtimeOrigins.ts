export const ENGINE_ORIGIN =
  process.env.NEXT_PUBLIC_ENGINE_ORIGIN ||
  "https://engine.documentos.legal";

export function buildEngineURL(locale?: string, theme?: string) {
  const url = new URL(ENGINE_ORIGIN);

  if (locale) {
    url.searchParams.set("lang", locale);
  }

  if (theme) {
    url.searchParams.set("theme", theme);
  }

  return url.toString();
}
