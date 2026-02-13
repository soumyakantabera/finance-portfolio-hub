import { useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '@/lib/blogStore';
import { IMAGE_FILTERS, getFilterLabel } from '@/components/FilteredImage';
import type { BlogPost, ImageFilter } from '@/types/portfolio';

const categories = ['Articles', 'Case Studies', 'Tutorials', 'Research'];

const emptyForm = {
  title: '',
  content: '',
  excerpt: '',
  featured_image: '',
  image_filter: 'none' as ImageFilter,
  category: 'Articles',
  tags: '',
  status: 'draft' as const,
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  video_url: '',
  gallery_images: '',
  google_docs_url: '',
  google_sheets_url: '',
  google_slides_url: '',
  pdf_url: '',
  embed_code: '',
};

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const refreshPosts = useCallback(() => {
    setPosts(getBlogPosts());
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      featured_image: post.featured_image || '',
      image_filter: post.image_filter || 'none',
      category: post.category,
      tags: post.tags?.join(', ') || '',
      status: post.status,
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      video_url: post.video_url || '',
      gallery_images: post.gallery_images?.join(', ') || '',
      google_docs_url: post.google_docs_url || '',
      google_sheets_url: post.google_sheets_url || '',
      google_slides_url: post.google_slides_url || '',
      pdf_url: post.pdf_url || '',
      embed_code: post.embed_code || '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast({ title: 'Error', description: 'Title is required.', variant: 'destructive' });
      return;
    }

    saveBlogPost({
      id: editingId || undefined,
      title: form.title,
      content: form.content,
      excerpt: form.excerpt || null,
      featured_image: form.featured_image || null,
      image_filter: form.image_filter === 'none' ? null : form.image_filter,
      category: form.category,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      status: form.status,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      meta_keywords: form.meta_keywords || null,
      video_url: form.video_url || null,
      gallery_images: form.gallery_images
        ? form.gallery_images.split(',').map((u) => u.trim()).filter(Boolean)
        : [],
      google_docs_url: form.google_docs_url || null,
      google_sheets_url: form.google_sheets_url || null,
      google_slides_url: form.google_slides_url || null,
      pdf_url: form.pdf_url || null,
      embed_code: form.embed_code || null,
    });

    toast({
      title: editingId ? 'Post updated' : 'Post created',
      description: 'Your changes have been saved.',
    });

    setIsDialogOpen(false);
    refreshPosts();
  };

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    toast({ title: 'Post deleted' });
    refreshPosts();
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog</h1>
            <p className="text-muted-foreground">Manage blog posts and articles</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="h-16 w-24 rounded object-cover"
                    />
                  ) : (
                    <div className="h-16 w-24 rounded bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold text-muted-foreground">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{post.title}</h3>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status === 'published' ? (
                          <><Eye className="mr-1 h-3 w-3" /> Published</>
                        ) : (
                          <><EyeOff className="mr-1 h-3 w-3" /> Draft</>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {post.excerpt || post.content.slice(0, 100)}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Button onClick={openNew}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Post' : 'New Post'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update your blog post' : 'Create a new blog post'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Post title"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => updateField('category', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center gap-3 h-10">
                    <Switch
                      checked={form.status === 'published'}
                      onCheckedChange={(checked) =>
                        updateField('status', checked ? 'published' : 'draft')
                      }
                    />
                    <span className="text-sm">
                      {form.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Excerpt</Label>
                <Input
                  placeholder="Brief summary for cards"
                  value={form.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                />
              </div>

              <div>
                <Label>Content</Label>
                <Textarea
                  placeholder="Write your post content..."
                  className="min-h-[150px]"
                  value={form.content}
                  onChange={(e) => updateField('content', e.target.value)}
                />
              </div>

              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  placeholder="Finance, Analysis, Tutorial"
                  value={form.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Featured Image URL</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={form.featured_image}
                    onChange={(e) => updateField('featured_image', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Image Filter</Label>
                  <Select
                    value={form.image_filter}
                    onValueChange={(v) => updateField('image_filter', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {IMAGE_FILTERS.map((filter) => (
                        <SelectItem key={filter} value={filter}>
                          {getFilterLabel(filter)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Gallery Images (comma-separated URLs)</Label>
                <Input
                  placeholder="https://img1.jpg, https://img2.jpg"
                  value={form.gallery_images}
                  onChange={(e) => updateField('gallery_images', e.target.value)}
                />
              </div>

              <div>
                <Label>Video URL (YouTube or direct)</Label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={form.video_url}
                  onChange={(e) => updateField('video_url', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Google Docs URL</Label>
                  <Input
                    placeholder="https://docs.google.com/..."
                    value={form.google_docs_url}
                    onChange={(e) => updateField('google_docs_url', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Google Sheets URL</Label>
                  <Input
                    placeholder="https://sheets.google.com/..."
                    value={form.google_sheets_url}
                    onChange={(e) => updateField('google_sheets_url', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Google Slides URL</Label>
                  <Input
                    placeholder="https://docs.google.com/presentation/..."
                    value={form.google_slides_url}
                    onChange={(e) => updateField('google_slides_url', e.target.value)}
                  />
                </div>
                <div>
                  <Label>PDF URL</Label>
                  <Input
                    placeholder="https://example.com/doc.pdf"
                    value={form.pdf_url}
                    onChange={(e) => updateField('pdf_url', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Custom Embed Code (HTML)</Label>
                <Textarea
                  placeholder="<iframe>...</iframe>"
                  className="font-mono text-sm"
                  value={form.embed_code}
                  onChange={(e) => updateField('embed_code', e.target.value)}
                />
              </div>

              {/* SEO Fields */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] mb-4">
                  SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Meta Title</Label>
                    <Input
                      placeholder="Custom page title for search engines"
                      value={form.meta_title}
                      onChange={(e) => updateField('meta_title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Meta Description</Label>
                    <Textarea
                      placeholder="Description shown in search results"
                      value={form.meta_description}
                      onChange={(e) => updateField('meta_description', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Meta Keywords</Label>
                    <Input
                      placeholder="keyword1, keyword2, keyword3"
                      value={form.meta_keywords}
                      onChange={(e) => updateField('meta_keywords', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
