export interface ResolvedUtm {
  utmSource?: string;
  utmMedium?: string;
}

const HOST_TO_SOURCE: Array<{
  pattern: RegExp;
  source: string;
  medium: 'social' | 'organic';
}> = [
  { pattern: /(^|\.)instagram\.com$/, source: 'instagram', medium: 'social' },
  {
    pattern: /(^|\.)l\.instagram\.com$/,
    source: 'instagram',
    medium: 'social',
  },
  { pattern: /(^|\.)facebook\.com$/, source: 'facebook', medium: 'social' },
  { pattern: /(^|\.)m\.facebook\.com$/, source: 'facebook', medium: 'social' },
  { pattern: /(^|\.)lm\.facebook\.com$/, source: 'facebook', medium: 'social' },
  { pattern: /(^|\.)fb\.com$/, source: 'facebook', medium: 'social' },
  { pattern: /(^|\.)linkedin\.com$/, source: 'linkedin', medium: 'social' },
  { pattern: /(^|\.)lnkd\.in$/, source: 'linkedin', medium: 'social' },
  { pattern: /(^|\.)t\.co$/, source: 'twitter', medium: 'social' },
  { pattern: /(^|\.)x\.com$/, source: 'twitter', medium: 'social' },
  { pattern: /(^|\.)twitter\.com$/, source: 'twitter', medium: 'social' },
  { pattern: /(^|\.)youtube\.com$/, source: 'youtube', medium: 'social' },
  { pattern: /(^|\.)youtu\.be$/, source: 'youtube', medium: 'social' },
  { pattern: /(^|\.)tiktok\.com$/, source: 'tiktok', medium: 'social' },
  { pattern: /(^|\.)google\./, source: 'google', medium: 'organic' },
  { pattern: /(^|\.)bing\.com$/, source: 'bing', medium: 'organic' },
  {
    pattern: /(^|\.)duckduckgo\.com$/,
    source: 'duckduckgo',
    medium: 'organic',
  },
];

export function resolveUtm(search: string, referrer: string): ResolvedUtm {
  const params = new URLSearchParams(search);
  const urlSource = params.get('utm_source') || undefined;
  const urlMedium = params.get('utm_medium') || undefined;

  if (urlSource && urlMedium) {
    return { utmSource: urlSource, utmMedium: urlMedium };
  }

  let refSource: string | undefined;
  let refMedium: string | undefined;
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, '');
      const hit = HOST_TO_SOURCE.find((h) => h.pattern.test(host));
      if (hit) {
        refSource = hit.source;
        refMedium = hit.medium;
      }
    } catch {
      // referrer invalido: ignora
    }
  }

  return {
    utmSource: urlSource ?? refSource,
    utmMedium: urlMedium ?? refMedium,
  };
}
