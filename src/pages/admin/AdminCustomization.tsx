import { useState, useCallback } from 'react';
import { Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getPageCustomization, savePageCustomization } from '@/lib/blogStore';
import type { PageCustomization } from '@/types/portfolio';

const PAGES = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const NAV_LINKS = ['Home', 'Projects', 'Blog', 'About', 'Contact'];

const FONTS = [
  { value: 'default', label: 'Default (Manrope / Sora)' },
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'lora', label: 'Lora' },
  { value: 'source-sans', label: 'Source Sans Pro' },
];

const AdminCustomization = () => {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState('/');
  const [customization, setCustomization] = useState<Partial<PageCustomization>>(
    () => getPageCustomization('/') || {}
  );

  const loadPage = useCallback(
    (path: string) => {
      setSelectedPage(path);
      const existing = getPageCustomization(path);
      setCustomization(existing || { page_path: path });
    },
    []
  );

  const updateField = (field: keyof PageCustomization, value: string | string[] | null) => {
    setCustomization((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNavLink = (link: string) => {
    const hidden = customization.hidden_nav_links || [];
    const updated = hidden.includes(link)
      ? hidden.filter((l) => l !== link)
      : [...hidden, link];
    updateField('hidden_nav_links', updated);
  };

  const handleSave = () => {
    savePageCustomization({
      page_path: selectedPage,
      primary_color: customization.primary_color || null,
      secondary_color: customization.secondary_color || null,
      accent_color: customization.accent_color || null,
      heading_font: customization.heading_font || null,
      body_font: customization.body_font || null,
      navbar_color: customization.navbar_color || null,
      navbar_font: customization.navbar_font || null,
      hidden_nav_links: customization.hidden_nav_links || [],
    });
    toast({ title: 'Customization saved', description: `Settings for ${selectedPage} have been saved.` });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">UI Customization</h1>
          <p className="text-muted-foreground">Customize appearance per page</p>
        </div>

        {/* Page Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select Page</CardTitle>
            <CardDescription>Choose a page to customize its appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedPage} onValueChange={loadPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGES.map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.label} ({page.path})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Color Scheme */}
        <Card>
          <CardHeader>
            <CardTitle>Color Scheme</CardTitle>
            <CardDescription>Customize colors for this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={customization.primary_color || '#000000'}
                    onChange={(e) => updateField('primary_color', e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customization.primary_color || ''}
                    onChange={(e) => updateField('primary_color', e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>Secondary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={customization.secondary_color || '#666666'}
                    onChange={(e) => updateField('secondary_color', e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customization.secondary_color || ''}
                    onChange={(e) => updateField('secondary_color', e.target.value)}
                    placeholder="#666666"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>Accent Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={customization.accent_color || '#0066ff'}
                    onChange={(e) => updateField('accent_color', e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customization.accent_color || ''}
                    onChange={(e) => updateField('accent_color', e.target.value)}
                    placeholder="#0066ff"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Font Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Choose fonts for headings and body text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Heading Font</Label>
                <Select
                  value={customization.heading_font || 'default'}
                  onValueChange={(v) => updateField('heading_font', v === 'default' ? null : v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Body Font</Label>
                <Select
                  value={customization.body_font || 'default'}
                  onValueChange={(v) => updateField('body_font', v === 'default' ? null : v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navbar Customization */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation Bar</CardTitle>
            <CardDescription>Customize the navbar for this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Navbar Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={customization.navbar_color || '#ffffff'}
                    onChange={(e) => updateField('navbar_color', e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={customization.navbar_color || ''}
                    onChange={(e) => updateField('navbar_color', e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>Navbar Font</Label>
                <Select
                  value={customization.navbar_font || 'default'}
                  onValueChange={(v) => updateField('navbar_font', v === 'default' ? null : v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Navigation Links Visibility</Label>
              <div className="space-y-3">
                {NAV_LINKS.map((link) => {
                  const isHidden = (customization.hidden_nav_links || []).includes(link);
                  return (
                    <div key={link} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm font-medium">{link}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {isHidden ? 'Hidden' : 'Visible'}
                        </span>
                        <Switch
                          checked={!isHidden}
                          onCheckedChange={() => toggleNavLink(link)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Customization
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomization;
