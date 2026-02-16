import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLocalCrud } from '@/hooks/useLocalStorage';
import { education as staticEducation } from '@/data/portfolio';
import type { Education } from '@/types/portfolio';

const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field_of_study: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  description: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

const AdminEducation = () => {
  const { data: education, add, update, remove } = useLocalCrud<Education>('portfolio_education', staticEducation);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '' },
  });

  const onSubmit = (data: EducationFormData) => {
    const now = new Date().toISOString();
    const itemData = {
      institution: data.institution, degree: data.degree,
      field_of_study: data.field_of_study || null,
      start_date: data.start_date || null, end_date: data.end_date || null,
      description: data.description || null, updated_at: now,
    };

    if (editingItem) {
      update(editingItem.id, itemData);
      toast({ title: 'Education updated', description: 'Your changes have been saved.' });
    } else {
      add({ ...itemData, id: `ed-${Date.now()}`, display_order: education.length + 1, created_at: now } as Education);
      toast({ title: 'Education added', description: 'Your changes have been saved.' });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const openEditDialog = (item: Education) => {
    setEditingItem(item);
    form.reset({ institution: item.institution, degree: item.degree, field_of_study: item.field_of_study || '', start_date: item.start_date || '', end_date: item.end_date || '', description: item.description || '' });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => { setEditingItem(null); form.reset(); setIsDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Education</h1>
            <p className="text-muted-foreground">Manage your educational background</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild><Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" />Add Education</Button></DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Education' : 'New Education'}</DialogTitle>
                <DialogDescription>Add your educational background</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="institution" render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="University name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="degree" render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="Bachelor's, Master's, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="field_of_study" render={({ field }) => (<FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input placeholder="Finance, Economics, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="start_date" render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="end_date" render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Honors, activities, relevant coursework..." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{item.degree}</h3>
                    <p className="text-sm text-muted-foreground">{item.institution}{item.field_of_study && ` • ${item.field_of_study}`}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.start_date && format(new Date(item.start_date), 'yyyy')} - {item.end_date && format(new Date(item.end_date), 'yyyy')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => { remove(item.id); toast({ title: 'Education deleted' }); }}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card><CardContent className="flex flex-col items-center justify-center py-12"><p className="text-muted-foreground mb-4">No education added yet</p><Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" />Add Your Education</Button></CardContent></Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEducation;
