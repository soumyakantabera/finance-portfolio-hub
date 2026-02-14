import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, ExternalLink, GripVertical } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useCertifications } from '@/hooks/usePortfolioData';
import { supabase } from '@/integrations/supabase/client';
import type { Certification } from '@/types/portfolio';

type CertificationFormData = {
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string;
  credential_url: string;
  display_order: number;
};

const emptyForm: CertificationFormData = {
  name: '',
  issuing_organization: '',
  issue_date: '',
  expiration_date: '',
  credential_url: '',
  display_order: 0,
};

export default function AdminCertifications() {
  const { data: certifications, isLoading } = useCertifications();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [form, setForm] = useState<CertificationFormData>(emptyForm);

  const handleOpenDialog = (cert?: Certification) => {
    if (cert) {
      setEditingCert(cert);
      setForm({
        name: cert.name,
        issuing_organization: cert.issuing_organization || '',
        issue_date: cert.issue_date || '',
        expiration_date: cert.expiration_date || '',
        credential_url: cert.credential_url || '',
        display_order: cert.display_order || 0,
      });
    } else {
      setEditingCert(null);
      setForm({
        ...emptyForm,
        display_order: (certifications?.length || 0) + 1,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const certData = {
      name: form.name,
      issuing_organization: form.issuing_organization || null,
      issue_date: form.issue_date || null,
      expiration_date: form.expiration_date || null,
      credential_url: form.credential_url || null,
      display_order: form.display_order,
    };

    if (editingCert) {
      const { error } = await supabase
        .from('certifications')
        .update(certData)
        .eq('id', editingCert.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Success', description: 'Certification updated successfully' });
    } else {
      const { error } = await supabase.from('certifications').insert(certData);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Success', description: 'Certification added successfully' });
    }

    queryClient.invalidateQueries({ queryKey: ['certifications'] });
    setIsDialogOpen(false);
    setForm(emptyForm);
    setEditingCert(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('certifications').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Success', description: 'Certification deleted successfully' });
    queryClient.invalidateQueries({ queryKey: ['certifications'] });
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Certifications</h1>
            <p className="text-muted-foreground">
              Manage your professional certifications and credentials
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editingCert ? 'Edit Certification' : 'Add Certification'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Certification Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., CFA Level I"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuing_organization">Issuing Organization</Label>
                  <Input
                    id="issuing_organization"
                    value={form.issuing_organization}
                    onChange={(e) =>
                      setForm({ ...form, issuing_organization: e.target.value })
                    }
                    placeholder="e.g., CFA Institute"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issue_date">Issue Date</Label>
                    <Input
                      id="issue_date"
                      type="date"
                      value={form.issue_date}
                      onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiration_date">Expiration Date</Label>
                    <Input
                      id="expiration_date"
                      type="date"
                      value={form.expiration_date}
                      onChange={(e) =>
                        setForm({ ...form, expiration_date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credential_url">Credential URL</Label>
                  <Input
                    id="credential_url"
                    type="url"
                    value={form.credential_url}
                    onChange={(e) =>
                      setForm({ ...form, credential_url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={form.display_order}
                    onChange={(e) =>
                      setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCert ? 'Save Changes' : 'Add Certification'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : certifications?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No certifications added yet
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Certification
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {certifications?.map((cert) => (
              <Card key={cert.id} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground cursor-move">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-display">
                          {cert.name}
                        </CardTitle>
                        <CardDescription>
                          {cert.issuing_organization || 'No organization specified'}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(cert)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Certification</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{cert.name}"? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(cert.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Issued: {formatDate(cert.issue_date)}</span>
                    {cert.expiration_date && (
                      <span>Expires: {formatDate(cert.expiration_date)}</span>
                    )}
                  </div>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                    >
                      View Credential
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
