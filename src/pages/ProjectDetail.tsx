import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, FileText, Table } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/hooks/usePortfolioData';
import { UniversalEmbed } from '@/components/embed/UniversalEmbed';
import { ImageGallery } from '@/components/gallery/ImageGallery';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            <Skeleton className="h-4 w-24 mb-12" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-5 w-1/3 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-2xl font-bold font-display mb-4">Project not found</h1>
            <Link
              to="/projects"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Projects
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const hasEmbeds =
    project.google_docs_url ||
    project.google_sheets_url ||
    project.github_url ||
    project.pdf_url ||
    project.embed_code;

  return (
    <Layout>
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            {/* Back Link */}
            <FadeIn>
              <Link
                to="/projects"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-12 block"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Projects
              </Link>
            </FadeIn>

            {/* Header */}
            <FadeIn delay={0.1}>
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  {project.category}
                  {project.is_featured && ' · Featured'}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold font-display leading-[0.95] mb-6">
                  {project.title}
                </h1>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal uppercase tracking-wider">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Hero Image */}
            {project.thumbnail_url && (
              <FadeIn delay={0.2}>
                <div className="overflow-hidden mb-12">
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </FadeIn>
            )}

            {/* Description */}
            <FadeIn delay={0.3}>
              <div className="mb-12">
                <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {project.description}
                </p>
              </div>
            </FadeIn>

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <FadeIn delay={0.32}>
                <div className="mb-12">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
                    Project Gallery
                  </h2>
                  <ImageGallery images={project.images} columns={3} />
                </div>
              </FadeIn>
            )}

            {/* External Links */}
            <FadeIn delay={0.35}>
              <div className="flex flex-wrap gap-4 mb-16">
                {project.external_url && (
                  <Button asChild className="uppercase tracking-wider text-xs">
                    <a href={project.external_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Live
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button asChild variant="outline" className="uppercase tracking-wider text-xs">
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-3 w-3" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.pdf_url && (
                  <Button asChild variant="outline" className="uppercase tracking-wider text-xs">
                    <a href={project.pdf_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-3 w-3" />
                      View PDF
                    </a>
                  </Button>
                )}
              </div>
            </FadeIn>

            {/* Embeds */}
            {hasEmbeds && (
              <FadeIn delay={0.4}>
                <div className="border border-border">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
                      Project Resources
                    </h2>
                  </div>
                  <div className="p-6">
                    <Tabs defaultValue={
                      project.google_docs_url ? 'docs' :
                      project.google_sheets_url ? 'sheets' :
                      project.github_url ? 'github' :
                      project.pdf_url ? 'pdf' :
                      'custom'
                    }>
                      <TabsList className="mb-4 bg-transparent border-b border-border rounded-none p-0 h-auto">
                        {project.google_docs_url && (
                          <TabsTrigger value="docs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider">
                            <FileText className="mr-2 h-3 w-3" />
                            Document
                          </TabsTrigger>
                        )}
                        {project.google_sheets_url && (
                          <TabsTrigger value="sheets" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider">
                            <Table className="mr-2 h-3 w-3" />
                            Spreadsheet
                          </TabsTrigger>
                        )}
                        {project.github_url && (
                          <TabsTrigger value="github" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider">
                            <Github className="mr-2 h-3 w-3" />
                            Repository
                          </TabsTrigger>
                        )}
                        {project.pdf_url && (
                          <TabsTrigger value="pdf" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider">
                            <FileText className="mr-2 h-3 w-3" />
                            PDF
                          </TabsTrigger>
                        )}
                        {project.embed_code && (
                          <TabsTrigger value="custom" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none text-xs uppercase tracking-wider">
                            Dashboard
                          </TabsTrigger>
                        )}
                      </TabsList>

                      {project.google_docs_url && (
                        <TabsContent value="docs">
                          <UniversalEmbed
                            type="google-docs"
                            url={project.google_docs_url}
                            title={`${project.title} - Document`}
                          />
                        </TabsContent>
                      )}
                      {project.google_sheets_url && (
                        <TabsContent value="sheets">
                          <UniversalEmbed
                            type="google-sheets"
                            url={project.google_sheets_url}
                            title={`${project.title} - Spreadsheet`}
                          />
                        </TabsContent>
                      )}
                      {project.github_url && (
                        <TabsContent value="github">
                          <div className="border border-border p-8 text-center">
                            <Github className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-4">View the source code on GitHub</p>
                            <Button asChild className="uppercase tracking-wider text-xs">
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                Open Repository
                              </a>
                            </Button>
                          </div>
                        </TabsContent>
                      )}
                      {project.pdf_url && (
                        <TabsContent value="pdf">
                          <UniversalEmbed
                            type="pdf"
                            url={project.pdf_url}
                            title={`${project.title} - PDF`}
                          />
                        </TabsContent>
                      )}
                      {project.embed_code && (
                        <TabsContent value="custom">
                          <UniversalEmbed
                            type="custom"
                            url=""
                            embedCode={project.embed_code}
                            title={project.title}
                          />
                        </TabsContent>
                      )}
                    </Tabs>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default ProjectDetail;
