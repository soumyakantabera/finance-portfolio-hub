import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLocalCrud } from '@/hooks/useLocalStorage';
import { projects as staticProjects } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  short_description: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  thumbnail_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  google_docs_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  google_sheets_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  pdf_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  external_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  embed_code: z.string().optional(),
  tags: z.string().optional(),
  is_featured: z.boolean().default(false),
});

type ProjectFormData = z.infer<typeof projectSchema>;
const categories = ['Financial Models', 'Case Studies', 'Code', 'Research'];

const AdminProjects = () => {
  const { data: projects, add, update, remove } = useLocalCrud<Project>('portfolio_projects', staticProjects);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: '', short_description: '', description: '', category: 'Financial Models', thumbnail_url: '', github_url: '', google_docs_url: '', google_sheets_url: '', pdf_url: '', external_url: '', embed_code: '', tags: '', is_featured: false },
  });

  const onSubmit = (data: ProjectFormData) => {
    const now = new Date().toISOString();
    const projectData: Omit<Project, 'id' | 'created_at'> & { id?: string; created_at?: string } = {
      title: data.title,
      short_description: data.short_description || null,
      description: data.description || null,
      category: data.category,
      thumbnail_url: data.thumbnail_url || null,
      github_url: data.github_url || null,
      google_docs_url: data.google_docs_url || null,
      google_sheets_url: data.google_sheets_url || null,
      pdf_url: data.pdf_url || null,
      external_url: data.external_url || null,
      embed_code: data.embed_code || null,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
      is_featured: data.is_featured,
      display_order: projects.length + 1,
      updated_at: now,
    };

    if (editingProject) {
      update(editingProject.id, projectData);
      toast({ title: 'Project updated', description: 'Your changes have been saved.' });
    } else {
      add({ ...projectData, id: `proj-${Date.now()}`, created_at: now } as Project);
      toast({ title: 'Project created', description: 'Your changes have been saved.' });
    }

    setIsDialogOpen(false);
    setEditingProject(null);
    form.reset();
  };

  const handleDelete = (id: string) => {
    remove(id);
    toast({ title: 'Project deleted' });
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title, short_description: project.short_description || '', description: project.description || '',
      category: project.category, thumbnail_url: project.thumbnail_url || '', github_url: project.github_url || '',
      google_docs_url: project.google_docs_url || '', google_sheets_url: project.google_sheets_url || '',
      pdf_url: project.pdf_url || '', external_url: project.external_url || '', embed_code: project.embed_code || '',
      tags: project.tags?.join(', ') || '', is_featured: project.is_featured,
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => { setEditingProject(null); form.reset(); setIsDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" />Add Project</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'New Project'}</DialogTitle>
                <DialogDescription>{editingProject ? 'Update your project details' : 'Add a new project to your portfolio'}</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Project title" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent>{categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="short_description" render={({ field }) => (<FormItem><FormLabel>Short Description</FormLabel><FormControl><Input placeholder="Brief description for cards" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Full Description</FormLabel><FormControl><Textarea placeholder="Detailed project description" className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="tags" render={({ field }) => (<FormItem><FormLabel>Tags (comma-separated)</FormLabel><FormControl><Input placeholder="Python, DCF, Valuation" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="thumbnail_url" render={({ field }) => (<FormItem><FormLabel>Thumbnail URL</FormLabel><FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="github_url" render={({ field }) => (<FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="external_url" render={({ field }) => (<FormItem><FormLabel>External URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="google_docs_url" render={({ field }) => (<FormItem><FormLabel>Google Docs URL</FormLabel><FormControl><Input placeholder="https://docs.google.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="google_sheets_url" render={({ field }) => (<FormItem><FormLabel>Google Sheets URL</FormLabel><FormControl><Input placeholder="https://sheets.google.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="pdf_url" render={({ field }) => (<FormItem><FormLabel>PDF URL</FormLabel><FormControl><Input placeholder="https://example.com/document.pdf" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="embed_code" render={({ field }) => (<FormItem><FormLabel>Custom Embed Code (HTML)</FormLabel><FormControl><Textarea placeholder="<iframe>...</iframe>" className="font-mono text-sm" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="is_featured" render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div><FormLabel className="text-base">Featured Project</FormLabel><p className="text-sm text-muted-foreground">Display this project on the home page</p></div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )} />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Save Project</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  {project.thumbnail_url ? (
                    <img src={project.thumbnail_url} alt={project.title} className="h-16 w-24 rounded object-cover" />
                  ) : (
                    <div className="h-16 w-24 rounded bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold text-muted-foreground">{project.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      {project.is_featured && <Badge>Featured</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                    {project.tags?.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {project.tags.slice(0, 3).map((tag) => (<Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(project.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" />Add Your First Project</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
