
# Redesign Pages and Add Animations

## Overview
Update the Projects, Project Detail, About, and Contact pages to match the minimal black-and-white editorial aesthetic already established in the homepage and header/footer. Additionally, install framer-motion for subtle page transitions and hover animations across all pages. Clean up unused color theme CSS variables from index.css.

---

## 1. Install framer-motion

Add `framer-motion` as a dependency for page transitions and element animations.

---

## 2. Clean Up index.css

Remove all unused color theme classes (`.theme-navy-gold`, `.theme-emerald`, `.theme-rose`, `.theme-purple`, `.theme-ocean`, `.theme-sunset`) since the project now uses only the monochrome design. Keep only `:root` / `.theme-mono` and `.dark`.

---

## 3. Create Animation Wrapper Components

**New file: `src/components/motion/PageTransition.tsx`**
- A framer-motion wrapper that fades/slides content in when a page mounts
- Used to wrap each page's content for smooth route transitions

**New file: `src/components/motion/FadeIn.tsx`**
- A reusable component that animates children into view (fade + slight upward slide)
- Accepts optional `delay` and `direction` props
- Used for staggered section reveals on all pages

---

## 4. Redesign Projects Page (`src/pages/Projects.tsx`)

- Wrap in `PageTransition`
- Large editorial header with uppercase label + bold display heading
- Search input with sharp borders matching the monochrome style
- Category filters styled as minimal uppercase text buttons with underline active state
- Project cards: no rounded corners, grayscale thumbnails with hover-to-color effect, uppercase category labels, clean typography
- Staggered fade-in animation for project cards using `FadeIn`

---

## 5. Redesign Project Detail Page (`src/pages/ProjectDetail.tsx`)

- Wrap in `PageTransition`
- Full-width grayscale hero image with hover-to-color
- Back link styled as minimal uppercase text with arrow
- Large display title, uppercase category/tags
- Description in clean serif-like body text
- External links as sharp-cornered buttons with border
- Embeds card with minimal styling, no rounded corners
- Fade-in animations for each section

---

## 6. Redesign About Page (`src/pages/About.tsx`)

- Wrap in `PageTransition`
- Profile section: grayscale photo with sharp corners, large display name, uppercase label
- Experience cards: borderless with horizontal rule separators, timeline-like left border accent
- Education cards: similar minimal treatment
- Skills: replace progress bars with horizontal bar charts using pure black fills
- Certifications: clean list layout with uppercase issuer text
- Each section animated with staggered `FadeIn`

---

## 7. Redesign Contact Page (`src/pages/Contact.tsx`)

- Wrap in `PageTransition`
- Editorial header with uppercase label
- Form inputs with sharp borders (already 0 radius), minimal styling
- Contact info links with underline hover effect
- FadeIn animations for form and info sections

---

## 8. Update Layout for Page Transitions

Wrap the `<main>` content in `src/components/layout/Layout.tsx` with `AnimatePresence` from framer-motion to enable exit animations between routes.

---

## Technical Details

### Files Created:
- `src/components/motion/PageTransition.tsx` -- motion.div wrapper with fade+slide
- `src/components/motion/FadeIn.tsx` -- reusable reveal animation component

### Files Modified:
- `src/index.css` -- remove 6 unused theme blocks (~200 lines)
- `src/pages/Projects.tsx` -- full redesign with monochrome style + animations
- `src/pages/ProjectDetail.tsx` -- full redesign with monochrome style + animations
- `src/pages/About.tsx` -- full redesign with monochrome style + animations
- `src/pages/Contact.tsx` -- full redesign with monochrome style + animations
- `src/components/layout/Layout.tsx` -- add AnimatePresence wrapper

### Dependencies Added:
- `framer-motion` (latest)

### Design Principles Applied:
- Zero border radius throughout (sharp corners)
- Grayscale images with hover-to-color transitions
- Uppercase tracking on labels and category text
- High-contrast black/white palette only
- Large display typography using Sora font
- Minimal shadows and borders
- Staggered entrance animations for content sections
- Smooth page transitions on route changes
