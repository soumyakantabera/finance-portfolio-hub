import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseSingle, useSupabaseUpsert } from '@/hooks/useSupabaseCrud';
import type { SiteSettings } from '@/types/portfolio';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';

const settingsSchema = z.object({
  site_title: z.string().min(1, 'Site title is required'),
  tagline: z.string().optional(),
  contact_email: z.string().email('Invalid email').optional().or(z.literal('')),
  calendly_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const AdminSettings = () => {
  const { data: settings, isLoading } = useSupabaseSingle<SiteSettings>('site_settings');
  const upsertSettings = useSupabaseUpsert<SiteSettings>('site_settings');
  const { toast } = useToast();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    values: {
      site_title: settings?.site_title || 'Finance Portfolio',
      tagline: settings?.tagline || '',
      contact_email: settings?.contact_email || '',
      calendly_url: settings?.calendly_url || '',
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    upsertSettings.mutate({
      ...(settings?.id ? { id: settings.id } : {}),
      site_title: data.site_title,
      tagline: data.tagline || null,
      contact_email: data.contact_email || null,
      calendly_url: data.calendly_url || null,
    } as any, {
      onSuccess: () => toast({ title: 'Settings updated', description: 'Your changes have been saved.' }),
      onError: (err) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
    });
  };

  if (isLoading) return <AdminLayout><div className="text-muted-foreground">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your portfolio site</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>General settings for your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="site_title" render={({ field }) => (<FormItem><FormLabel>Site Title</FormLabel><FormControl><Input placeholder="My Portfolio" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="tagline" render={({ field }) => (<FormItem><FormLabel>Tagline</FormLabel><FormControl><Input placeholder="Showcasing my finance journey" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contact_email" render={({ field }) => (<FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="contact@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="calendly_url" render={({ field }) => (<FormItem><FormLabel>Calendly URL (optional)</FormLabel><FormControl><Input placeholder="https://calendly.com/yourname" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <Button type="submit" disabled={upsertSettings.isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  {upsertSettings.isPending ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
