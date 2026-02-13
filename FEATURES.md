# Finance Portfolio Hub - Enhanced Professional Portfolio

A modern, minimalistic finance portfolio website with advanced features for showcasing professional work, built with React, TypeScript, and Tailwind CSS. Optimized for static deployment on GitHub Pages.

## ✨ Key Features

### 🎨 **Design System Toggle**
- **3 Color Palettes**: Nordic Light, Midnight Finance, Soft Sepia
- **Typography Options**: Switch between Sans-Serif (modern) and Serif (classic)
- **Navbar Styles**: Top Fixed, Sidebar Minimal, or Hidden/Burger menu
- Preferences saved in localStorage

### 🖼️ **Universal Embedder**
Support for multiple media types with lazy loading:
- **Documents**: PDF viewer, Google Docs, Sheets, Slides, Microsoft Office 365
- **Video & Audio**: YouTube, Vimeo embeds with custom player
- **Interactive**: Figma designs, GitHub Gists, website iframes
- **Custom**: HTML embed codes

### 🎞️ **Image Gallery with Filters**
- Professional image showcase with lightbox
- **Real-time CSS Filters**:
  - Black & White / Monochrome
  - Retro / Vintage
  - Pro Color enhancement
- Full-screen distraction-free viewing
- Smooth transitions and animations

### ⌨️ **Command Palette (Cmd+K)**
- Quick navigation to any section
- Keyboard shortcuts for power users
- Search functionality
- Theme toggles and actions

### 🚀 **Performance & UX**
- **Skeleton loaders** for all loading states
- **Lazy loading** for images and embeds
- **Reading progress** indicator
- **Back to Top** button with smooth scroll
- Smooth page transitions
- Micro-interactions on hover

## 📁 Project Structure

```
src/
├── components/
│   ├── command/          # Command Palette (Cmd+K)
│   ├── embed/            # Universal Embed component
│   ├── gallery/          # Image Gallery & Lightbox
│   ├── theme/            # Design System Toggle
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── motion/           # Animation components
├── hooks/
│   ├── useData.ts        # Unified data hooks
│   ├── useStaticData.ts  # Static JSON data loading
│   └── usePortfolioData.ts # Supabase data loading
├── lib/
│   ├── staticData.ts     # Static data utilities
│   └── config.ts         # App configuration
├── pages/                # Route pages
└── types/                # TypeScript types

public/
└── content/              # Static JSON data files
    ├── projects.json
    ├── profile.json
    ├── settings.json
    ├── education.json
    ├── experience.json
    ├── skills.json
    └── certifications.json
```

## 🔧 Configuration

### Data Source Toggle

The app can use either static JSON files (GitHub Pages) or Supabase (dynamic backend):

```typescript
// src/lib/config.ts
export const config = {
  dataSource: 'static' // or 'supabase'
};
```

Set via environment variable:
```bash
VITE_DATA_SOURCE=static npm run build
```

## 📝 Content Management

### For Static Deployment (GitHub Pages)

1. Edit JSON files in `/public/content/`
2. Commit and push changes
3. GitHub Actions will automatically rebuild and deploy

### Project Structure Example

```json
{
  "id": "1",
  "title": "Financial Model Dashboard",
  "description": "Comprehensive analysis tool...",
  "category": "Financial Models",
  "thumbnail_url": "https://...",
  "is_featured": true,
  "tags": ["Excel", "VBA", "Financial Modeling"],
  "images": [
    "https://image1.jpg",
    "https://image2.jpg"
  ],
  "google_sheets_url": "https://docs.google.com/...",
  "pdf_url": "https://..."
}
```

## 🚀 Deployment

### GitHub Pages (Static)

1. **Enable GitHub Pages** in repository settings
2. **Configure workflow**: Already set up in `.github/workflows/deploy.yml`
3. **Push to main branch**: Automatic deployment

### Manual Build

```bash
# Install dependencies
npm install

# Build for production (static mode)
VITE_DATA_SOURCE=static npm run build

# Preview build
npm run preview
```

## 🎨 Customization

### Color Palettes

Edit `/public/content/settings.json`:

```json
{
  "palettes": {
    "custom-theme": {
      "name": "Custom Theme",
      "colors": {
        "primary": "220 70% 50%",
        "background": "0 0% 100%",
        "foreground": "220 70% 10%"
      }
    }
  }
}
```

### Adding New Embeds

Use the `UniversalEmbed` component:

```tsx
<UniversalEmbed
  type="youtube"
  url="https://youtube.com/watch?v=..."
  title="Video Title"
  height="500px"
  lazyLoad={true}
/>
```

Supported types:
- `pdf`, `google-docs`, `google-sheets`, `google-slides`
- `office-word`, `office-excel`, `office-powerpoint`
- `youtube`, `vimeo`, `figma`, `github-gist`
- `iframe`, `custom`

### Adding Images to Projects

```json
{
  "id": "project-id",
  "images": [
    "https://image1.jpg",
    "https://image2.jpg"
  ]
}
```

The `ImageGallery` component will automatically:
- Create a responsive grid
- Add filter controls
- Enable lightbox viewing

## 🛠️ Development

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Run tests
npm run test

# Build for production
npm run build
```

## 📦 Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Build Tool**: Vite

## 🔐 Security

- No sensitive data in static files
- Sanitized HTML for custom embeds
- Secure iframe sandboxing
- HTTPS-only external resources

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues or questions, please open a GitHub issue or contact the maintainer.

---

Built with ❤️ for finance professionals
