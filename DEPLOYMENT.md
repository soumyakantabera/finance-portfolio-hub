# GitHub Pages Deployment

This document provides information about the GitHub Pages deployment setup for this project.

## Overview

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow builds the application and publishes it to GitHub Pages.

## Deployment URL

Once deployed, the application will be accessible at:
```
https://soumyakantabera.github.io/finance-portfolio-hub/
```

## Automatic Deployment

The application is automatically deployed to GitHub Pages when:
- Changes are pushed to the `main` branch
- Manual trigger via GitHub Actions "workflow_dispatch" event

## Deployment Workflow

The deployment process consists of two main jobs:

1. **Build Job**: 
   - Checks out the repository
   - Sets up Node.js (version 20)
   - Installs dependencies using `npm ci`
   - Builds the application using `npm run build`
   - Uploads the build artifacts to GitHub Pages

2. **Deploy Job**:
   - Deploys the uploaded artifacts to GitHub Pages
   - Makes the application accessible at the GitHub Pages URL

## Configuration

### Vite Configuration

The Vite configuration (`vite.config.ts`) has been updated to use the correct base path for GitHub Pages:

```typescript
base: mode === "production" ? "/finance-portfolio-hub/" : "/"
```

This ensures that all assets (CSS, JavaScript, images) are correctly referenced when deployed to GitHub Pages.

### GitHub Actions Workflow

The workflow file is located at `.github/workflows/deploy.yml` and includes:
- Checkout and build steps
- Pages setup and artifact upload
- Deployment to GitHub Pages

## Manual Deployment

To manually trigger a deployment:

1. Go to the repository on GitHub
2. Navigate to the "Actions" tab
3. Select the "Deploy to GitHub Pages" workflow
4. Click "Run workflow"
5. Select the `main` branch
6. Click "Run workflow"

## Prerequisites

For GitHub Pages to work, ensure that:

1. GitHub Pages is enabled in the repository settings
2. The source is set to "GitHub Actions"
3. The workflow has the necessary permissions (`contents: read`, `pages: write`, `id-token: write`)

## Troubleshooting

If the deployment fails:

1. Check the GitHub Actions logs for error messages
2. Verify that all dependencies are correctly listed in `package.json`
3. Ensure the build command (`npm run build`) works locally
4. Check that GitHub Pages is enabled in the repository settings

## Local Testing

To test the production build locally:

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The preview server will serve the application with the production configuration.
