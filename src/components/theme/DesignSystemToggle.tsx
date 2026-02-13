import { useState, useEffect } from 'react';
import { Settings2, Palette, Type, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export type ColorPalette = 'nordic-light' | 'midnight-finance' | 'soft-sepia';
export type Typography = 'sans-serif' | 'serif';
export type NavbarStyle = 'top-fixed' | 'sidebar-minimal' | 'hidden-burger';

interface ThemeSettings {
  palette: ColorPalette;
  typography: Typography;
  navbarStyle: NavbarStyle;
}

const palettes: Record<ColorPalette, { name: string; colors: Record<string, string> }> = {
  'nordic-light': {
    name: 'Nordic Light',
    colors: {
      primary: '0 0% 4%',
      background: '0 0% 100%',
      foreground: '0 0% 4%',
      muted: '0 0% 96%',
      accent: '0 0% 92%',
    },
  },
  'midnight-finance': {
    name: 'Midnight Finance',
    colors: {
      primary: '222 84% 5%',
      background: '222 47% 11%',
      foreground: '0 0% 98%',
      muted: '217 33% 17%',
      accent: '217 33% 20%',
    },
  },
  'soft-sepia': {
    name: 'Soft Sepia',
    colors: {
      primary: '30 30% 20%',
      background: '30 40% 96%',
      foreground: '30 30% 20%',
      muted: '30 30% 88%',
      accent: '30 30% 85%',
    },
  },
};

export const DesignSystemToggle = () => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('theme-settings');
    return saved
      ? JSON.parse(saved)
      : { palette: 'nordic-light', typography: 'sans-serif', navbarStyle: 'top-fixed' };
  });

  useEffect(() => {
    localStorage.setItem('theme-settings', JSON.stringify(settings));
    applyTheme(settings);
  }, [settings]);

  const applyTheme = (theme: ThemeSettings) => {
    const root = document.documentElement;
    const colors = palettes[theme.palette].colors;

    // Apply color palette
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply typography
    if (theme.typography === 'serif') {
      root.style.setProperty('--font-sans', '"Merriweather", serif');
      root.style.setProperty('--font-display', '"Playfair Display", serif');
    } else {
      root.style.setProperty('--font-sans', '"Manrope", sans-serif');
      root.style.setProperty('--font-display', '"Sora", sans-serif');
    }

    // Apply navbar style class
    root.classList.remove('navbar-top-fixed', 'navbar-sidebar', 'navbar-burger');
    root.classList.add(`navbar-${theme.navbarStyle}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg"
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl font-display">Design System</SheetTitle>
          <SheetDescription>
            Customize the appearance to match your preferences
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Color Palettes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-4 w-4" />
              <Label className="text-sm font-semibold uppercase tracking-wider">
                Color Palette
              </Label>
            </div>
            <RadioGroup
              value={settings.palette}
              onValueChange={(value) =>
                setSettings({ ...settings, palette: value as ColorPalette })
              }
            >
              {Object.entries(palettes).map(([key, { name }]) => (
                <div key={key} className="flex items-center space-x-3 mb-3">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key} className="cursor-pointer flex-1">
                    {name}
                  </Label>
                  <div className="flex gap-1">
                    {Object.entries(palettes[key as ColorPalette].colors)
                      .slice(0, 3)
                      .map(([colorKey, colorValue], i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full border border-border"
                          style={{
                            backgroundColor: `hsl(${colorValue})`,
                          }}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Typography */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-4 w-4" />
              <Label className="text-sm font-semibold uppercase tracking-wider">
                Typography
              </Label>
            </div>
            <RadioGroup
              value={settings.typography}
              onValueChange={(value) =>
                setSettings({ ...settings, typography: value as Typography })
              }
            >
              <div className="flex items-center space-x-3 mb-3">
                <RadioGroupItem value="sans-serif" id="sans" />
                <Label htmlFor="sans" className="cursor-pointer" style={{ fontFamily: 'sans-serif' }}>
                  Sans-Serif <span className="text-muted-foreground">(Modern)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="serif" id="serif" />
                <Label htmlFor="serif" className="cursor-pointer" style={{ fontFamily: 'serif' }}>
                  Serif <span className="text-muted-foreground">(Classic)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Navbar Style */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Menu className="h-4 w-4" />
              <Label className="text-sm font-semibold uppercase tracking-wider">
                Navbar Style
              </Label>
            </div>
            <RadioGroup
              value={settings.navbarStyle}
              onValueChange={(value) =>
                setSettings({ ...settings, navbarStyle: value as NavbarStyle })
              }
            >
              <div className="flex items-center space-x-3 mb-3">
                <RadioGroupItem value="top-fixed" id="top" />
                <Label htmlFor="top" className="cursor-pointer">
                  Top Fixed
                </Label>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <RadioGroupItem value="sidebar-minimal" id="sidebar" />
                <Label htmlFor="sidebar" className="cursor-pointer">
                  Sidebar Minimal
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="hidden-burger" id="burger" />
                <Label htmlFor="burger" className="cursor-pointer">
                  Hidden / Burger
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
