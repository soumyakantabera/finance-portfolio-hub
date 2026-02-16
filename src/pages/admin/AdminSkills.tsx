import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLocalCrud } from '@/hooks/useLocalStorage';
import { skills as staticSkills } from '@/data/portfolio';
import type { Skill } from '@/types/portfolio';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  proficiency: z.number().min(0).max(100),
});

type SkillFormData = z.infer<typeof skillSchema>;
const categories = ['Technical', 'Soft Skills', 'Tools', 'Languages'];

const AdminSkills = () => {
  const { data: skills, add, update, remove } = useLocalCrud<Skill>('portfolio_skills', staticSkills);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '', category: 'Technical', proficiency: 80 },
  });

  const onSubmit = (data: SkillFormData) => {
    if (editingItem) {
      update(editingItem.id, { name: data.name, category: data.category, proficiency: data.proficiency });
      toast({ title: 'Skill updated', description: 'Your changes have been saved.' });
    } else {
      add({ id: `s-${Date.now()}`, name: data.name, category: data.category, proficiency: data.proficiency, display_order: skills.length + 1, created_at: new Date().toISOString() });
      toast({ title: 'Skill added', description: 'Your changes have been saved.' });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const openEditDialog = (item: Skill) => {
    setEditingItem(item);
    form.reset({ name: item.name, category: item.category, proficiency: item.proficiency });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => { setEditingItem(null); form.reset(); setIsDialogOpen(true); };

  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Skills</h1>
            <p className="text-muted-foreground">Manage your skills and expertise</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" />Add Skill</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Skill' : 'New Skill'}</DialogTitle>
                <DialogDescription>Add a skill to your portfolio</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Skill Name</FormLabel><FormControl><Input placeholder="Python, Excel, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent>{categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="proficiency" render={({ field }) => (<FormItem><FormLabel>Proficiency: {field.value}%</FormLabel><FormControl><Slider min={0} max={100} step={5} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {Object.keys(skillsByCategory).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skillsByCategory).map(([category, catSkills]) => (
              <Card key={category}>
                <CardHeader><CardTitle className="text-lg">{category}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditDialog(skill)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => { remove(skill.id); toast({ title: 'Skill deleted' }); }}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card><CardContent className="flex flex-col items-center justify-center py-12"><p className="text-muted-foreground mb-4">No skills added yet</p><Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" />Add Your First Skill</Button></CardContent></Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSkills;
