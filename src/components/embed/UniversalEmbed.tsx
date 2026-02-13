import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Code, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type EmbedType =
  | 'pdf'
  | 'google-docs'
  | 'google-sheets'
  | 'google-slides'
  | 'office-word'
  | 'office-excel'
  | 'office-powerpoint'
  | 'youtube'
  | 'vimeo'
  | 'figma'
  | 'github-gist'
  | 'iframe'
  | 'custom';

export interface UniversalEmbedProps {
  type: EmbedType;
  url: string;
  title?: string;
  height?: string;
  className?: string;
  embedCode?: string;
  lazyLoad?: boolean;
}

export const UniversalEmbed = ({
  type,
  url,
  title = 'Embedded Content',
  height = '600px',
  className = '',
  embedCode,
  lazyLoad = true,
}: UniversalEmbedProps) => {
  const [isLoading, setIsLoading] = useState(lazyLoad);
  const [isInView, setIsInView] = useState(!lazyLoad);

  useEffect(() => {
    if (!lazyLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    const element = document.getElementById(`embed-${url}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [url, lazyLoad]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const renderEmbed = () => {
    if (!isInView) {
      return (
        <div
          style={{ height }}
          className="flex items-center justify-center bg-muted"
        >
          <p className="text-sm text-muted-foreground">Loading embed...</p>
        </div>
      );
    }

    switch (type) {
      case 'pdf':
        return (
          <iframe
            src={url}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            onLoad={handleLoad}
          />
        );

      case 'google-docs':
        return (
          <iframe
            src={url.includes('/preview') ? url : `${url.replace('/edit', '/preview')}`}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            onLoad={handleLoad}
          />
        );

      case 'google-sheets':
        return (
          <iframe
            src={url.includes('/preview') ? url : `${url.replace('/edit', '/preview')}`}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            onLoad={handleLoad}
          />
        );

      case 'google-slides':
        return (
          <iframe
            src={url.includes('/embed') ? url : `${url.replace('/edit', '/embed')}`}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            onLoad={handleLoad}
            allowFullScreen
          />
        );

      case 'office-word':
      case 'office-excel':
      case 'office-powerpoint':
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            onLoad={handleLoad}
          />
        );

      case 'youtube':
        const youtubeId = extractYoutubeId(url);
        return (
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={title}
              className="absolute top-0 left-0 w-full h-full border border-border"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleLoad}
            />
          </div>
        );

      case 'vimeo':
        const vimeoId = extractVimeoId(url);
        return (
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}`}
              title={title}
              className="absolute top-0 left-0 w-full h-full border border-border"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={handleLoad}
            />
          </div>
        );

      case 'figma':
        return (
          <iframe
            src={url}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            allowFullScreen
            onLoad={handleLoad}
          />
        );

      case 'github-gist':
        return (
          <div className="border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  GitHub Gist
                </span>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View on GitHub
                </a>
              </Button>
            </div>
            <script src={`${url}.js`} />
          </div>
        );

      case 'iframe':
        return (
          <iframe
            src={url}
            title={title}
            className="w-full border border-border"
            style={{ height }}
            onLoad={handleLoad}
            sandbox="allow-scripts allow-same-origin"
          />
        );

      case 'custom':
        if (!embedCode) return null;
        return (
          <div
            className="w-full"
            style={{ minHeight: height }}
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        );

      default:
        return (
          <div
            style={{ height }}
            className="flex flex-col items-center justify-center border border-border bg-muted p-8"
          >
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              This embed type is not yet supported
            </p>
            <Button asChild variant="outline">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                Open Link
              </a>
            </Button>
          </div>
        );
    }
  };

  return (
    <div id={`embed-${url}`} className={`relative ${className}`}>
      {isLoading && (
        <Skeleton
          className="absolute inset-0 z-10"
          style={{ height }}
        />
      )}
      {renderEmbed()}
    </div>
  );
};

// Helper functions
function extractYoutubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}

function extractVimeoId(url: string): string {
  const regExp = /vimeo.*\/(\d+)/i;
  const match = url.match(regExp);
  return match ? match[1] : '';
}
