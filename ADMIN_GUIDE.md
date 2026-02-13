# Dynamic Portfolio Admin Panel - User Guide

## Overview

This portfolio site now features a dynamic admin panel with GitHub integration for DB-less content management. You can update your portfolio content, skills, projects, and more without writing code.

## 🔐 Admin Access

### Login
- Navigate to: `/auth`
- Password: `soumya01`
- The password is securely hashed using SHA-256

### Security Note
- Admin session is stored in your browser's localStorage
- Always log out when using a shared computer
- The password hash is stored in `src/data/adminConfig.json`

## 📝 Features

### 1. Enhanced Skills Section

**URL:** `/skills`

The skills section now features:
- **Automatic Ranking**: Skills are ranked by how often they're mentioned across:
  - Projects
  - Experiences
  - Education
  - Certifications
- **Dynamic Visibility**: Only skills that are actually used are displayed
- **Category Organization**: Skills grouped by category (Programming Languages, Financial Concepts, etc.)
- **Citation Count**: Each skill shows how many times it's referenced
- **Minimalist Icons**: Custom SVG icons for each skill

#### How Ranking Works
1. The system counts mentions of each skill across all content sections
2. Skills are ranked from most used (Rank #1) to least used
3. Unused skills are automatically hidden
4. Example: If "Python" is used in 6 places, it gets Rank #1

### 2. Content Management

**URL:** `/admin/content`

This is the heart of the dynamic content system:

#### Features
- **JSON Editor**: Edit all portfolio content as structured JSON
- **Live Preview**: Preview your changes before committing
- **GitHub Commit**: Save changes directly to your repository
- **Validation**: Automatic JSON syntax checking

#### Content Structure
The content file (`src/data/content.json`) includes:
```json
{
  "about": { ... },
  "contact": { ... },
  "projects": [ ... ],
  "skills": [ ... ],
  "experiences": [ ... ],
  "education": [ ... ],
  "certifications": [ ... ]
}
```

#### Editing Workflow
1. Navigate to `/admin/content`
2. Edit the JSON in the text area
3. Click "Preview" to validate and preview changes
4. Click "Commit to GitHub" to save changes

### 3. GitHub Integration

**URL:** `/admin/github`

#### Setup Instructions

1. **Create a Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name (e.g., "Portfolio Admin")
   - Required scope: `repo` (Full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Configure in Admin Panel**
   - Navigate to `/admin/github`
   - Enter your Personal Access Token
   - Repository Owner: `soumyakantabera` (or your username)
   - Repository Name: `finance-portfolio-hub` (or your repo name)
   - Branch: `main` (or your deployment branch)
   - Click "Test Connection" to verify
   - Click "Save Configuration" to store settings

3. **Security**
   - Token is stored in browser localStorage only
   - Never commit your token to version control
   - Keep it as secure as a password

#### How It Works
When you save content changes:
1. Admin panel generates updated JSON file
2. Connects to GitHub API using your token
3. Commits the file directly to your repository
4. GitHub Pages automatically rebuilds and deploys
5. Your live site updates within minutes!

### 4. Skill Icon Management

**Location:** `public/assets/icons/`

#### Adding New Skill Icons
1. Create an SVG file (minimalist black design recommended)
2. Name it: `skill_name_icon.svg` (e.g., `python_icon.svg`)
3. Place in: `public/assets/icons/`
4. Reference in content.json: `"icon": "skill_name_icon.svg"`

**Note**: The current implementation includes placeholder icons (checkmark/badge style) for many skills. You can replace these with custom icons specific to each technology or concept. Some skills like "Statistical Analysis" or "Risk Management" don't have universally recognized icons, so generic symbols work well.

#### Default Icon
If a specific icon is not found, the system uses `default_icon.svg`

## 🎨 Example Content

The repository includes comprehensive example content demonstrating:
- 3 projects with different display modes (journal, iframe, embedding)
- 22 skills across 7 categories
- 2 work experiences
- 2 education entries
- 2 certifications

All example content includes proper skill citations for ranking demonstration.

## 🚀 Deployment

### Automatic Deployment
- Changes committed via admin panel trigger GitHub Actions
- Site rebuilds automatically
- Live updates appear within 5-10 minutes

### Manual Deployment
1. Edit `src/data/content.json` directly
2. Commit and push to `main` branch
3. GitHub Actions handles the rest

## 📋 Admin Panel Pages

### Dashboard (`/admin`)
- Overview statistics
- Quick action buttons
- Project, experience, and skill counts

### Content (`/admin/content`)
- JSON editor for all content
- Preview before committing
- Direct GitHub integration

### Projects (`/admin/projects`)
- Manage projects stored in Supabase
- (Note: Different from content.json projects)

### Skills (`/admin/skills`)
- Manage skills in Supabase
- (Note: Display uses content.json for ranking)

### Experience (`/admin/experience`)
- Add/edit work experience

### Education (`/admin/education`)
- Add/edit educational background

### Certifications (`/admin/certifications`)
- Add/edit professional certifications

### Profile (`/admin/profile`)
- Update personal information

### Messages (`/admin/messages`)
- View contact form submissions

### GitHub (`/admin/github`)
- Configure GitHub API access
- Test connection
- Manage Personal Access Token

### Customization (`/admin/customization`)
- Customize page appearance

### Settings (`/admin/settings`)
- General site settings

## 🔧 Technical Details

### Architecture
- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **State**: TanStack React Query
- **Data**: Static JSON + GitHub API
- **Auth**: Client-side password hashing (SHA-256)

### Data Flow
1. Content stored in `src/data/content.json`
2. Loaded via React hooks at runtime
3. Ranking calculated client-side
4. Changes committed via GitHub API
5. Repository triggers rebuild
6. Updated site deploys automatically

### Skill Ranking Algorithm
```typescript
// Counts occurrences of each skill name
projects.forEach(p => p.skillsUsed.forEach(skill => count++))
experiences.forEach(e => e.skillsUsed.forEach(skill => count++))
education.forEach(edu => edu.skillsUsed.forEach(skill => count++))
certifications.forEach(cert => cert.skillsUsed.forEach(skill => count++))

// Sort by count, assign ranks
skills.sort((a, b) => b.count - a.count)
skills.forEach((skill, index) => skill.rank = index + 1)
```

## 🛡️ Security Best Practices

1. **Password**: Change the default password by updating the hash in `src/data/adminConfig.json`
2. **GitHub Token**: 
   - Use fine-grained tokens when available
   - Set expiration dates
   - Revoke if compromised
   - Never commit to repository
3. **Admin Access**: 
   - Log out when finished
   - Don't share admin URL publicly
   - Use secure networks

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review example content in `src/data/content.json`
3. Inspect browser console for errors
4. Verify GitHub token permissions

## 🎯 Quick Start Checklist

- [ ] Login with password `soumya01`
- [ ] Configure GitHub integration
- [ ] Test connection to GitHub
- [ ] Review example content structure
- [ ] Make a small test edit
- [ ] Preview changes
- [ ] Commit to GitHub
- [ ] Wait for deployment (5-10 min)
- [ ] Verify live site updates

Enjoy your dynamic portfolio! 🚀
