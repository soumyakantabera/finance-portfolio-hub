import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLocalObject } from '@/hooks/useLocalStorage';
import { profile as staticProfile } from '@/data/portfolio';
import type { Profile } from '@/types/portfolio';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  photo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  resume_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const AdminProfile = () => {
  const { data: profile, update: updateProfile } = useLocalObject<Profile>('portfolio_profile', staticProfile);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: profile?.name || '',
      tagline: profile?.tagline || '',
      bio: profile?.bio || '',
      email: profile?.email || '',
      linkedin_url: profile?.linkedin_url || '',
      github_url: profile?.github_url || '',
      photo_url: profile?.photo_url || '',
      resume_url: profile?.resume_url || '',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      updateProfile({
        name: data.name,
        tagline: data.tagline || null,
        bio: data.bio || null,
        email: data.email || null,
        linkedin_url: data.linkedin_url || null,
        github_url: data.github_url || null,
        photo_url: data.photo_url || null,
        resume_url: data.resume_url || null,
        updated_at: new Date().toISOString(),
      });
      toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to update profile.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>This information will be displayed on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="tagline" render={({ field }) => (
                  <FormItem><FormLabel>Tagline</FormLabel><FormControl><Input placeholder="Finance Professional | Data Analyst" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea placeholder="Tell visitors about yourself..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="contact@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="linkedin_url" render={({ field }) => (
                  <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/yourprofile" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="github_url" render={({ field }) => (
                  <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input placeholder="https://github.com/yourusername" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="photo_url" render={({ field }) => (
                  <FormItem><FormLabel>Photo URL</FormLabel><FormControl><Input placeholder="https://example.com/photo.jpg" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="resume_url" render={({ field }) => (
                  <FormItem><FormLabel>Resume URL</FormLabel><FormControl><Input placeholder="https://example.com/resume.pdf" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
