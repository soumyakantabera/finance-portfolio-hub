

# Finance Student Portfolio Template

A clean, minimal portfolio web app designed as a remixable template for finance students to showcase their work. Features a full CMS with admin dashboard for easy content management.

## ✅ Implementation Status: COMPLETE

---

## Pages & Features

### 1. Home Page ✅
- Hero section with name, tagline, and professional photo
- Featured projects carousel highlighting best work
- Quick bio summary with link to full About page
- Skills/expertise highlights (e.g., "Valuation", "Python", "Financial Modeling")
- Call-to-action buttons to view projects or get in touch

### 2. Projects Gallery ✅
- Grid layout displaying all portfolio projects
- Filter by category (Financial Models, Case Studies, Code, Research)
- Search functionality
- Each project card shows: title, thumbnail, category tag, brief description
- Click to view full project detail page

### 3. Project Detail Page (Dynamic) ✅
- Full project description and context
- **Embedded content support:**
  - Google Docs/Sheets viewer (iframe embeds)
  - GitHub repository preview with README
  - PDF/PowerPoint viewer
  - Interactive dashboard embeds (Tableau, Jupyter, etc.)
- Tags and related projects
- External links to live projects or downloads

### 4. About/Resume Page ✅
- Professional bio and photo
- Education history with institutions and degrees
- Work experience timeline
- Skills section (technical & soft skills)
- Certifications and achievements
- Downloadable resume (PDF upload)
- Social/professional links (LinkedIn, GitHub, etc.)

### 5. Contact Page ✅
- Contact form (name, email, message)
- Social media links
- Optional: calendly embed for scheduling calls
- Email display or obfuscated contact method

---

## Admin Dashboard (CMS) ✅

### Authentication ✅
- Secure login for portfolio owner
- Protected admin routes

### Content Management ✅
- **Projects Manager**: Add, edit, delete projects with rich text editor
- **Embed Manager**: Easy input for Google Docs URLs, GitHub repos, or paste embed codes
- **About/Resume Editor**: Update bio, experience, education, and upload resume PDF
- **Messages**: View contact form submissions
- **Site Settings**: Update name, tagline, social links, and theme colors

---

## Database Schema ✅

Tables created:
- `profile` - Personal information
- `projects` - Portfolio projects with embed support
- `education` - Educational background
- `experience` - Work history
- `skills` - Skills with categories and proficiency
- `certifications` - Certifications and credentials
- `site_settings` - Site configuration
- `contact_messages` - Contact form submissions

Storage bucket:
- `portfolio` - For images and resume PDFs

---

## Getting Started

1. **Sign up**: Go to `/auth` and create an account
2. **Access admin**: Navigate to `/admin` after logging in
3. **Update profile**: Add your name, bio, photo, and social links
4. **Add projects**: Create portfolio projects with embeds
5. **Add experience**: Add your work history
6. **Add education**: Add your educational background
7. **Add skills**: Add your technical and soft skills
8. **Configure settings**: Customize site title and contact info

---

## Technical Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **Authentication**: Email/password
- **Database**: PostgreSQL with RLS policies
- **Storage**: File uploads for images and PDFs
