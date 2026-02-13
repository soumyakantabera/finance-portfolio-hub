import { useState } from 'react';
import { Lightbox } from './Lightbox';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

export type ImageFilter = 'none' | 'bw' | 'retro' | 'pro-color';

export interface ImageGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
}

const filterStyles: Record<ImageFilter, string> = {
  none: '',
  bw: 'grayscale contrast-110 brightness-105',
  retro: 'sepia-[0.4] contrast-95 brightness-105 saturate-110',
  'pro-color': 'saturate-125 contrast-105 brightness-102',
};

export const ImageGallery = ({
  images,
  columns = 3,
  showFilters = true,
  aspectRatio = 'landscape',
}: ImageGalleryProps) => {
  const [filter, setFilter] = useState<ImageFilter>('none');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const aspectRatioClass = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      {showFilters && (
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Filters:
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'none' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('none')}
              className="text-xs uppercase tracking-wider"
            >
              Original
            </Button>
            <Button
              variant={filter === 'bw' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('bw')}
              className="text-xs uppercase tracking-wider"
            >
              B&W
            </Button>
            <Button
              variant={filter === 'retro' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('retro')}
              className="text-xs uppercase tracking-wider"
            >
              Retro
            </Button>
            <Button
              variant={filter === 'pro-color' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pro-color')}
              className="text-xs uppercase tracking-wider"
            >
              Pro Color
            </Button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden cursor-pointer ${
              aspectRatio !== 'auto' ? aspectRatioClass[aspectRatio] : ''
            }`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                filterStyles[filter]
              } group-hover:scale-105`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
