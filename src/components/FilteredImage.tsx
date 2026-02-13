import { cn } from '@/lib/utils';
import type { ImageFilter } from '@/types/portfolio';

interface FilteredImageProps {
  src: string;
  alt: string;
  filter?: ImageFilter | null;
  className?: string;
}

const filterClasses: Record<string, string> = {
  none: '',
  grayscale: 'grayscale',
  monochrome: 'grayscale contrast-125',
  retro: 'sepia',
  warm: 'saturate-110 brightness-105',
  cool: 'saturate-90 brightness-105 hue-rotate-[-15deg]',
  'high-contrast': 'contrast-125 saturate-110',
};

export function FilteredImage({ src, alt, filter, className }: FilteredImageProps) {
  const filterClass = filter ? filterClasses[filter] || '' : '';

  return (
    <img
      src={src}
      alt={alt}
      className={cn(filterClass, className)}
      loading="lazy"
    />
  );
}

export function getFilterLabel(filter: ImageFilter): string {
  const labels: Record<ImageFilter, string> = {
    none: 'None',
    grayscale: 'Black & White',
    monochrome: 'Monochrome',
    retro: 'Retro',
    warm: 'Warm',
    cool: 'Cool',
    'high-contrast': 'High Contrast',
  };
  return labels[filter] || filter;
}

export const IMAGE_FILTERS: ImageFilter[] = [
  'none',
  'grayscale',
  'monochrome',
  'retro',
  'warm',
  'cool',
  'high-contrast',
];
