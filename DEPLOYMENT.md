# GitHub Pages Deployment Guide

This guide explains how to deploy the Finance Portfolio Hub to GitHub Pages.

## Prerequisites

- GitHub repository with the code
- GitHub Pages enabled in repository settings
- Node.js 18+ installed locally for testing

## Quick Start (Automatic Deployment)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

### Step 1: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** in the left sidebar
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. Save the settings

### Step 2: Configure Secrets (if needed)

No secrets are required for static deployment. The workflow uses GitHub's built-in `GITHUB_TOKEN`.

### Step 3: Push to Main Branch

```bash
git checkout main
git merge your-feature-branch
git push origin main
```

The GitHub Actions workflow will automatically:
1. Install dependencies
2. Build the project with `VITE_DATA_SOURCE=static`
3. Deploy to GitHub Pages

### Step 4: Access Your Site

Your site will be available at:
- `https://<username>.github.io/<repository-name>/`

Or with a custom domain if configured.

## Manual Deployment

If you prefer to deploy manually:

### Step 1: Build the Project

```bash
# Install dependencies
npm install

# Build with static data source
VITE_DATA_SOURCE=static npm run build
```

This creates a `dist` folder with all static files.

### Step 2: Deploy to GitHub Pages

#### Option A: Using gh-pages npm package

```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

#### Option B: Manual Upload

1. Create a `gh-pages` branch
2. Copy contents of `dist` folder to root of `gh-pages` branch
3. Commit and push

```bash
git checkout -b gh-pages
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

## Subdirectory Deployment

If deploying to a subdirectory (e.g., `https://user.github.io/portfolio/`):

### Step 1: Set Base Path in vite.config.ts

```typescript
export default defineConfig({
  base: '/portfolio/', // your repository name
  // ... rest of config
});
```

### Step 2: Update Environment Variable

```bash
VITE_BASE_PATH=/portfolio npm run build
```

## Content Management

### Updating Content

All content is stored in `/public/content/` as JSON files:

- `projects.json` - Project listings
- `profile.json` - Personal information
- `settings.json` - Site settings and themes
- `education.json` - Education history
- `experience.json` - Work experience
- `skills.json` - Skills and proficiencies
- `certifications.json` - Certifications

### Workflow for Updates

1. Edit the relevant JSON file in `/public/content/`
2. Commit and push changes
3. GitHub Actions will automatically rebuild and deploy

Example:

```bash
# Edit a file
nano public/content/projects.json

# Commit
git add public/content/projects.json
git commit -m "Update projects"

# Push (triggers automatic deployment)
git push origin main
```

## Customization

### Changing Themes

Edit `/public/content/settings.json`:

```json
{
  "theme": {
    "currentPalette": "midnight-finance",
    "currentTypography": "serif",
    "currentNavbarStyle": "sidebar-minimal"
  }
}
```

Available options:
- **Palettes**: `nordic-light`, `midnight-finance`, `soft-sepia`
- **Typography**: `sans-serif`, `serif`
- **Navbar**: `top-fixed`, `sidebar-minimal`, `hidden-burger`

### Adding New Projects

Add to `/public/content/projects.json`:

```json
{
  "id": "unique-id",
  "title": "Project Title",
  "description": "Full description...",
  "short_description": "Brief summary",
  "category": "Financial Models",
  "thumbnail_url": "https://...",
  "is_featured": true,
  "display_order": 1,
  "tags": ["Excel", "VBA"],
  "images": [
    "https://image1.jpg",
    "https://image2.jpg"
  ],
  "google_sheets_url": "https://docs.google.com/...",
  "pdf_url": "https://...",
  "content": "## Markdown content\n\nDetailed description..."
}
```

## Troubleshooting

### Build Fails

**Issue**: Build fails with "vite not found"
**Solution**: Run `npm install` first

**Issue**: Build succeeds but site shows 404
**Solution**: Ensure base path is configured correctly in `vite.config.ts`

### Images Not Loading

**Issue**: Images return 404
**Solution**: Ensure images are:
1. In the `public` folder, or
2. Using absolute URLs (https://...)

### GitHub Actions Failing

**Issue**: Workflow fails to deploy
**Solution**: 
1. Check GitHub Pages is enabled
2. Ensure source is set to "GitHub Actions"
3. Check workflow logs for specific errors

## Performance Optimization

### Image Optimization

1. Compress images before upload
2. Use appropriate formats (WebP for modern browsers)
3. Lazy load images (already implemented)

### Bundle Size

The current bundle includes:
- React & React Router
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- TanStack Query

To reduce bundle size:
1. Consider code splitting large components
2. Use dynamic imports for rarely-used features
3. Remove unused dependencies

## Custom Domain

To use a custom domain:

1. Add `CNAME` file to `public` folder with your domain:
   ```
   www.yourdomainhere.com
   ```

2. Configure DNS records:
   - Add CNAME record: `www` → `<username>.github.io`
   - Or A records for apex domain

3. Enable "Enforce HTTPS" in GitHub Pages settings

## Monitoring

### Analytics

Add analytics by including tracking scripts in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Consider adding error tracking services:
- Sentry
- Rollbar
- Bugsnag

## Support

For issues or questions:
1. Check the FEATURES.md documentation
2. Review this deployment guide
3. Open an issue in the GitHub repository

## Security Notes

- All data is public (it's on GitHub Pages)
- Don't store sensitive information in JSON files
- Custom embed codes should only come from trusted sources
- Review the security warnings in the code

---

Happy deploying! 🚀
