import DOMPurify from 'dompurify';
import { FileText, Table, Presentation, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MediaEmbedProps {
  videoUrl?: string | null;
  googleDocsUrl?: string | null;
  googleSheetsUrl?: string | null;
  googleSlidesUrl?: string | null;
  pdfUrl?: string | null;
  embedCode?: string | null;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}`;
    }
  }
  return null;
}

export function MediaEmbed({
  videoUrl,
  googleDocsUrl,
  googleSheetsUrl,
  googleSlidesUrl,
  pdfUrl,
  embedCode,
}: MediaEmbedProps) {
  const hasMedia =
    videoUrl || googleDocsUrl || googleSheetsUrl || googleSlidesUrl || pdfUrl || embedCode;

  if (!hasMedia) return null;

  const defaultTab = videoUrl
    ? 'video'
    : googleDocsUrl
    ? 'docs'
    : googleSheetsUrl
    ? 'sheets'
    : googleSlidesUrl
    ? 'slides'
    : pdfUrl
    ? 'pdf'
    : 'custom';

  return (
    <div className="border border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Resources
        </h2>
      </div>
      <div className="p-6">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-4 bg-transparent border-b border-border rounded-none p-0 h-auto flex-wrap">
            {videoUrl && (
              <TabsTrigger
                value="video"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider"
              >
                <Play className="mr-2 h-3 w-3" />
                Video
              </TabsTrigger>
            )}
            {googleDocsUrl && (
              <TabsTrigger
                value="docs"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider"
              >
                <FileText className="mr-2 h-3 w-3" />
                Document
              </TabsTrigger>
            )}
            {googleSheetsUrl && (
              <TabsTrigger
                value="sheets"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider"
              >
                <Table className="mr-2 h-3 w-3" />
                Spreadsheet
              </TabsTrigger>
            )}
            {googleSlidesUrl && (
              <TabsTrigger
                value="slides"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider"
              >
                <Presentation className="mr-2 h-3 w-3" />
                Slides
              </TabsTrigger>
            )}
            {pdfUrl && (
              <TabsTrigger
                value="pdf"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider"
              >
                <FileText className="mr-2 h-3 w-3" />
                PDF
              </TabsTrigger>
            )}
            {embedCode && (
              <TabsTrigger
                value="custom"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider"
              >
                Dashboard
              </TabsTrigger>
            )}
          </TabsList>

          {videoUrl && (
            <TabsContent value="video">
              {(() => {
                const ytUrl = getYouTubeEmbedUrl(videoUrl);
                if (ytUrl) {
                  return (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={ytUrl}
                        className="absolute inset-0 w-full h-full border border-border"
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                return (
                  <video controls className="w-full border border-border">
                    <source src={videoUrl} />
                    Your browser does not support the video tag.
                  </video>
                );
              })()}
            </TabsContent>
          )}
          {googleDocsUrl && (
            <TabsContent value="docs">
              <iframe
                src={`${googleDocsUrl.replace('/edit', '/preview')}`}
                className="w-full h-[600px] border border-border"
                title="Google Document"
              />
            </TabsContent>
          )}
          {googleSheetsUrl && (
            <TabsContent value="sheets">
              <iframe
                src={`${googleSheetsUrl.replace('/edit', '/preview')}`}
                className="w-full h-[600px] border border-border"
                title="Google Spreadsheet"
              />
            </TabsContent>
          )}
          {googleSlidesUrl && (
            <TabsContent value="slides">
              <iframe
                src={`${googleSlidesUrl.replace('/edit', '/embed')}`}
                className="w-full h-[600px] border border-border"
                title="Google Slides"
                allowFullScreen
              />
            </TabsContent>
          )}
          {pdfUrl && (
            <TabsContent value="pdf">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px] border border-border"
                title="PDF Document"
              />
            </TabsContent>
          )}
          {embedCode && (
            <TabsContent value="custom">
              <div
                className="w-full min-h-[400px]"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(embedCode, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
