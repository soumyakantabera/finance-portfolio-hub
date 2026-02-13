

# Portfolio 2.0 -- Enhancement Strategy

## Overview
A phased upgrade of the minimalist portfolio into a feature-rich professional showcase. The implementation is split into 4 phases to keep changes manageable and testable.

---

## Phase 1: Pro Embedding System and Project Detail Upgrade

### Universal Embedder Component
Create `src/components/embeds/UniversalEmbed.tsx` -- a single component that detects URL type and renders the appropriate embed:

- **Documents**: PDF viewer (inline iframe), Google Docs/Sheets/Slides (existing, enhanced), Office 365 embeds via `view.officeapps.live.com`
- **Video/Audio**: YouTube and Vimeo detection via URL regex, rendered as responsive iframes with minimal chrome. Direct video via HTML5 `<video>` element with a custom minimalist player skin (play/pause, progress bar, volume -- all black/white styled)
- **Interactive**: Figma embeds via `figma.com/embed`, GitHub Gists via `gist.github.com` script injection, and generic iframe for live website URLs

### Blog-Style Project Detail Layout
Upgrade `src/pages/ProjectDetail.tsx` to support a richer narrative flow:
- Full-width hero image with parallax-like scroll effect
- Long-form description rendered with proper paragraph spacing
- Inline embeds interspersed with text (using the UniversalEmbed component)
- Resource section at the bottom with tabbed embeds (enhanced from current)

### Database Changes
Add columns to the `projects` table:
- `video_url` (text, nullable) -- for YouTube/Vimeo/direct video links
- `figma_url` (text, nullable) -- for Figma design embeds
- `slides_url` (text, nullable) -- for Google Slides / PowerPoint

Update the Admin Projects form to include fields for these new URL types.

### Files Created
- `src/components/embeds/UniversalEmbed.tsx`
- `src/components/embeds/VideoPlayer.tsx` (custom minimal HTML5 video player)

### Files Modified
- `src/pages/ProjectDetail.tsx` (blog-style layout + UniversalEmbed integration)
- `src/pages/admin/AdminProjects.tsx` (new URL fields in form)
- `src/types/portfolio.ts` (add new fields to Project type)
- `src/hooks/usePortfolioData.ts` (no changes needed, selects *)

---

## Phase 2: Image Gallery with Filters and Lightbox

### Image Gallery Component
Create `src/components/gallery/ImageGallery.tsx`:
- Masonry-style or grid layout for project images
- Each image displays with a subtle hover overlay showing expand icon

### CSS/Canvas Filters
Create `src/components/gallery/ImageFilters.tsx`:
- **Monochrome**: CSS `filter: grayscale(1) contrast(1.2)` -- high-contrast B&W
- **Retro**: CSS `filter: sepia(0.3) contrast(1.1) saturate(0.9)` plus a subtle grain overlay using a repeating SVG noise pattern
- **Pro Color**: CSS `filter: saturate(1.3) contrast(1.1) brightness(1.05)` -- enhanced vibrancy
- Filter toggle rendered as minimal uppercase text buttons below the gallery

### Lightbox
Create `src/components/gallery/Lightbox.tsx`:
- Full-screen overlay with dark background (pure black, `bg-black/95`)
- Left/right arrow navigation, keyboard support (arrow keys, Escape to close)
- Current filter applied to lightbox view
- Minimal counter (e.g., "03 / 12") in bottom corner
- Animated open/close with framer-motion scale + fade

### Database Changes
Create a `project_images` table:
- `id` (uuid, PK)
- `project_id` (uuid, FK to projects)
- `image_url` (text, not null)
- `caption` (text, nullable)
- `display_order` (integer, default 0)
- `created_at` (timestamptz)
- RLS: public read, authenticated write

### Files Created
- `src/components/gallery/ImageGallery.tsx`
- `src/components/gallery/ImageFilters.tsx`
- `src/components/gallery/Lightbox.tsx`

### Files Modified
- `src/pages/ProjectDetail.tsx` (integrate ImageGallery)
- `src/hooks/usePortfolioData.ts` (add useProjectImages hook)
- `src/types/portfolio.ts` (add ProjectImage type)

---

## Phase 3: Design System Toggle

### Theme Context
Create `src/hooks/useDesignSystem.tsx` with a React context providing:

**Color Palettes** (CSS variable overrides, persisted to localStorage):
- "Nordic Light" -- cool grays with ice-blue accents
- "Midnight Finance" -- deep navy background with warm gold accents
- "Soft Sepia" -- warm cream background with brown/charcoal text
- "Mono" (default) -- current black and white

**Typography Toggle**:
- Serif mode: Switch headings to a serif font (e.g., `Playfair Display`) for a classic/authoritative feel
- Sans-Serif mode (default): Keep current Sora + Manrope pairing

**Navbar Styles**:
- "Top Fixed" (default) -- current sticky top header
- "Sidebar Minimal" -- narrow sidebar on left with icon-only nav, expanding on hover
- "Hidden/Burger" -- no visible nav, floating hamburger button in corner

### Design System Panel
Create `src/components/DesignSystemToggle.tsx`:
- A small floating button (bottom-right corner, palette icon) that opens a slide-out panel
- Panel sections: Palette selector (color swatches), Typography toggle (Serif/Sans), Navbar style picker (radio options)
- All changes apply instantly via CSS variable updates
- Persisted to localStorage

### Files Created
- `src/hooks/useDesignSystem.tsx`
- `src/components/DesignSystemToggle.tsx`
- `src/components/layout/SidebarNav.tsx` (sidebar navbar variant)
- `src/components/layout/BurgerNav.tsx` (hidden/burger navbar variant)

### Files Modified
- `src/index.css` (add palette CSS variable sets, serif font import)
- `src/App.tsx` (wrap with DesignSystemProvider)
- `src/components/layout/Layout.tsx` (conditionally render navbar based on style setting)
- `src/components/layout/Header.tsx` (minor adjustments for toggle integration)

---

## Phase 4: Command Palette, Performance UX, and Micro-interactions

### Command Palette (Cmd+K)
Create `src/components/CommandPalette.tsx`:
- Built on top of the existing `cmdk` dependency (already installed)
- Triggered by `Cmd+K` (Mac) / `Ctrl+K` (Windows) keyboard shortcut
- Searchable list of: all pages, all projects (fetched), quick actions (view site, admin, contact)
- Minimal black/white styling consistent with design system
- Results navigate using react-router on selection

### Performance UX
- **Lazy Loading**: Wrap heavy embed iframes in an IntersectionObserver-based component (`src/components/LazyEmbed.tsx`) that only renders the iframe when scrolled into view, showing a skeleton placeholder until then
- **Skeleton Loaders**: Already implemented across pages -- verify coverage is complete

### Micro-interactions
Create `src/components/ui/BackToTop.tsx`:
- Floating button (bottom-right, above design toggle if present) that appears after scrolling past 500px
- Smooth scroll to top on click
- Fade in/out animation

Create `src/components/ui/ReadingProgress.tsx`:
- Thin horizontal progress bar at the very top of the viewport (above header)
- Only visible on long-form pages (ProjectDetail)
- Pure black fill, 2px height

### Auth Page Redesign
Update `src/pages/Auth.tsx` to match the editorial B&W aesthetic:
- Remove Card wrapper, use full-page minimal layout
- Large editorial heading, underline-style form inputs (matching Contact page)
- Sharp corners, uppercase labels

### Files Created
- `src/components/CommandPalette.tsx`
- `src/components/LazyEmbed.tsx`
- `src/components/ui/BackToTop.tsx`
- `src/components/ui/ReadingProgress.tsx`

### Files Modified
- `src/App.tsx` (add CommandPalette, BackToTop globally)
- `src/pages/ProjectDetail.tsx` (add ReadingProgress)
- `src/pages/Auth.tsx` (editorial redesign)

---

## Implementation Order

Due to the size of this plan, implementation will proceed phase by phase:

1. **Phase 1** first -- Pro Embedding (DB migration + components + admin form)
2. **Phase 2** next -- Image Gallery with filters and lightbox (DB migration + components)
3. **Phase 3** -- Design System Toggle (CSS + context + navbar variants)
4. **Phase 4** -- Command Palette, micro-interactions, Auth redesign

Each phase will be followed by testing before moving to the next.

---

## Technical Notes

- All new components follow the existing pattern: framer-motion for animations, Lucide for icons, Tailwind for styling
- No new major dependencies needed -- `cmdk` is already installed, `framer-motion` is already installed
- Database migrations will add columns/tables with proper RLS policies (public read, authenticated write)
- All theme/design preferences are stored in localStorage (no database needed)
- The serif font (Playfair Display) will be added via Google Fonts import in index.css
