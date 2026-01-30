

# Finance Student Portfolio Template

A clean, minimal portfolio web app designed as a remixable template for finance students to showcase their work. Features a full CMS with admin dashboard for easy content management.

---

## Pages & Features

### 1. Home Page
- Hero section with name, tagline, and professional photo
- Featured projects carousel highlighting best work
- Quick bio summary with link to full About page
- Skills/expertise highlights (e.g., "Valuation", "Python", "Financial Modeling")
- Call-to-action buttons to view projects or get in touch

### 2. Projects Gallery
- Grid layout displaying all portfolio projects
- Filter by category (Financial Models, Case Studies, Code, Research)
- Search functionality
- Each project card shows: title, thumbnail, category tag, brief description
- Click to view full project detail page

### 3. Project Detail Page (Dynamic)
- Full project description and context
- **Embedded content support:**
  - Google Docs/Sheets viewer (iframe embeds)
  - GitHub repository preview with README
  - PDF/PowerPoint viewer
  - Interactive dashboard embeds (Tableau, Jupyter, etc.)
- Tags and related projects
- External links to live projects or downloads

### 4. About/Resume Page
- Professional bio and photo
- Education history with institutions and degrees
- Work experience timeline
- Skills section (technical & soft skills)
- Certifications and achievements
- Downloadable resume (PDF upload)
- Social/professional links (LinkedIn, GitHub, etc.)

### 5. Contact Page
- Contact form (name, email, message)
- Social media links
- Optional: calendly embed for scheduling calls
- Email display or obfuscated contact method

---

## Admin Dashboard (CMS)

### Authentication
- Secure login for portfolio owner
- Protected admin routes

### Content Management
- **Projects Manager**: Add, edit, delete projects with rich text editor
- **Embed Manager**: Easy input for Google Docs URLs, GitHub repos, or paste embed codes
- **About/Resume Editor**: Update bio, experience, education, and upload resume PDF
- **Media Library**: Upload and manage images and files
- **Site Settings**: Update name, tagline, social links, and theme colors

---

## Design Style
- Clean, minimal aesthetic with plenty of white space
- Professional typography (modern sans-serif)
- Subtle animations and hover effects
- Fully responsive (mobile, tablet, desktop)
- Light mode default with consistent color palette

---

## Technical Approach
- **Backend**: Lovable Cloud (Supabase) for database, authentication, and file storage
- **Database**: Tables for projects, profile info, resume data, and site settings
- **Storage**: File uploads for images and resume PDFs
- **No external API keys needed** for basic functionality

