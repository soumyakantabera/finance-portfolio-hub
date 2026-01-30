import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, FileText, Table } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/hooks/usePortfolioData';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <Skeleton className="h-8 w-24 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-2xl font-bold mb-4">Project not found</h1>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
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
      <div className="py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary">{project.category}</Badge>
              {project.is_featured && <Badge>Featured</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail */}
          {project.thumbnail_url && (
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full rounded-xl mb-8 shadow-lg"
            />
          )}

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* External Links */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.external_url && (
              <Button asChild>
                <a href={project.external_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button asChild variant="outline">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project.pdf_url && (
              <Button asChild variant="outline">
                <a href={project.pdf_url} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View PDF
                </a>
              </Button>
            )}
          </div>

          {/* Embeds */}
          {hasEmbeds && (
            <Card>
              <CardHeader>
                <CardTitle>Project Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={
                  project.google_docs_url ? 'docs' :
                  project.google_sheets_url ? 'sheets' :
                  project.github_url ? 'github' :
                  project.pdf_url ? 'pdf' :
                  'custom'
                }>
                  <TabsList className="mb-4">
                    {project.google_docs_url && (
                      <TabsTrigger value="docs">
                        <FileText className="mr-2 h-4 w-4" />
                        Document
                      </TabsTrigger>
                    )}
                    {project.google_sheets_url && (
                      <TabsTrigger value="sheets">
                        <Table className="mr-2 h-4 w-4" />
                        Spreadsheet
                      </TabsTrigger>
                    )}
                    {project.github_url && (
                      <TabsTrigger value="github">
                        <Github className="mr-2 h-4 w-4" />
                        Repository
                      </TabsTrigger>
                    )}
                    {project.pdf_url && (
                      <TabsTrigger value="pdf">
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                      </TabsTrigger>
                    )}
                    {project.embed_code && (
                      <TabsTrigger value="custom">Dashboard</TabsTrigger>
                    )}
                  </TabsList>

                  {project.google_docs_url && (
                    <TabsContent value="docs">
                      <iframe
                        src={`${project.google_docs_url.replace('/edit', '/preview')}`}
                        className="w-full h-[600px] border rounded-lg"
                        title="Google Document"
                      />
                    </TabsContent>
                  )}

                  {project.google_sheets_url && (
                    <TabsContent value="sheets">
                      <iframe
                        src={`${project.google_sheets_url.replace('/edit', '/preview')}`}
                        className="w-full h-[600px] border rounded-lg"
                        title="Google Spreadsheet"
                      />
                    </TabsContent>
                  )}

                  {project.github_url && (
                    <TabsContent value="github">
                      <div className="border rounded-lg p-6 text-center">
                        <Github className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="mb-4">View the source code on GitHub</p>
                        <Button asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            Open Repository
                          </a>
                        </Button>
                      </div>
                    </TabsContent>
                  )}

                  {project.pdf_url && (
                    <TabsContent value="pdf">
                      <iframe
                        src={project.pdf_url}
                        className="w-full h-[600px] border rounded-lg"
                        title="PDF Document"
                      />
                    </TabsContent>
                  )}

                  {project.embed_code && (
                    <TabsContent value="custom">
                      <div
                        className="w-full min-h-[400px]"
                        dangerouslySetInnerHTML={{ __html: project.embed_code }}
                      />
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
