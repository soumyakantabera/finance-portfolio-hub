import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioContent } from '@/hooks/usePortfolioContent';
import { createGitHubClient } from '@/lib/github-api';
import { Loader2, Save, Eye, Github, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

/**
 * Admin page for managing dynamic portfolio content
 * Allows editing and committing content to GitHub
 */
const AdminContent = () => {
  const { toast } = useToast();
  const { data: content, isLoading } = usePortfolioContent();
  const [isCommitting, setIsCommitting] = useState(false);
  const [editedContent, setEditedContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState('edit');

  // Initialize edited content when data loads
  useEffect(() => {
    if (content && !editedContent) {
      setEditedContent(JSON.stringify(content, null, 2));
    }
  }, [content, editedContent]);

  const handlePreview = () => {
    try {
      JSON.parse(editedContent);
      setActiveTab('preview');
      toast({
        title: 'Valid JSON',
        description: 'Content is valid and ready to preview',
      });
    } catch (error) {
      toast({
        title: 'Invalid JSON',
        description: error instanceof Error ? error.message : 'Please fix JSON syntax errors',
        variant: 'destructive',
      });
    }
  };

  const handleCommit = async () => {
    // Validate JSON
    let parsedContent;
    try {
      parsedContent = JSON.parse(editedContent);
    } catch (error) {
      toast({
        title: 'Invalid JSON',
        description: 'Please fix JSON syntax errors before committing',
        variant: 'destructive',
      });
      return;
    }

    // Check GitHub configuration
    const client = createGitHubClient();
    if (!client) {
      toast({
        title: 'GitHub Not Configured',
        description: 'Please configure GitHub integration in Settings',
        variant: 'destructive',
      });
      return;
    }

    setIsCommitting(true);
    try {
      const result = await client.commitPortfolioContent(
        parsedContent,
        'Update portfolio content from admin panel'
      );

      if (result.success) {
        toast({
          title: 'Content Committed',
          description: 'Successfully committed changes to GitHub',
        });
      } else {
        toast({
          title: 'Commit Failed',
          description: result.error || 'Failed to commit changes',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsCommitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const previewContent = (() => {
    try {
      return JSON.parse(editedContent);
    } catch {
      return null;
    }
  })();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">
            Edit portfolio content and commit changes to GitHub
          </p>
        </div>

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Changes made here will be committed directly to your GitHub repository. 
            Make sure to preview your changes before committing.
          </AlertDescription>
        </Alert>

        {/* Content Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Content Editor</CardTitle>
            <CardDescription>
              Edit the JSON content below. All changes must be valid JSON.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-4">
                <div className="space-y-2">
                  <Label>Content (JSON)</Label>
                  <Textarea
                    value={editedContent || JSON.stringify(content, null, 2)}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="font-mono text-sm min-h-[500px]"
                    placeholder="Enter portfolio content as JSON..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handlePreview}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button onClick={handleCommit} disabled={isCommitting} variant="default">
                    {isCommitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Committing...
                      </>
                    ) : (
                      <>
                        <Github className="mr-2 h-4 w-4" />
                        Commit to GitHub
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                {previewContent ? (
                  <>
                    {/* Projects Preview */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Projects ({previewContent.projects?.length || 0})</h3>
                      <div className="space-y-2">
                        {previewContent.projects?.map((project: any) => (
                          <div key={project.id} className="p-3 border rounded">
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.skillsUsed?.map((skill: string) => (
                                <span key={skill} className="text-xs bg-muted px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Preview */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Skills ({previewContent.skills?.length || 0})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {previewContent.skills?.map((skill: any) => (
                          <div key={skill.name} className="p-2 border rounded text-sm">
                            <div className="font-medium">{skill.name}</div>
                            <div className="text-xs text-muted-foreground">{skill.category}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experiences Preview */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Experiences ({previewContent.experiences?.length || 0})</h3>
                      <div className="space-y-2">
                        {previewContent.experiences?.map((exp: any) => (
                          <div key={exp.id} className="p-3 border rounded">
                            <h4 className="font-medium">{exp.title} at {exp.company}</h4>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Invalid JSON - please fix syntax errors in the editor
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
