import type { BlogPost, PageCustomization } from '@/types/portfolio';

const BLOG_STORAGE_KEY = 'portfolio_blog_posts';
const PAGE_CUSTOMIZATION_KEY = 'portfolio_page_customizations';

function generateId(): string {
  return crypto.randomUUID();
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Blog Posts
export function getBlogPosts(): BlogPost[] {
  try {
    const data = localStorage.getItem(BLOG_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getBlogPosts().filter((p) => p.status === 'published');
}

export function getBlogPost(id: string): BlogPost | null {
  return getBlogPosts().find((p) => p.id === id) ?? null;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getBlogPosts().find((p) => p.slug === slug && p.status === 'published') ?? null;
}

export function saveBlogPost(post: Omit<BlogPost, 'id' | 'slug' | 'created_at' | 'updated_at'> & { id?: string; slug?: string }): BlogPost {
  const posts = getBlogPosts();
  const now = new Date().toISOString();

  if (post.id) {
    const index = posts.findIndex((p) => p.id === post.id);
    if (index >= 0) {
      const updated: BlogPost = {
        ...posts[index],
        ...post,
        slug: post.slug || posts[index].slug,
        updated_at: now,
      };
      posts[index] = updated;
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
      return updated;
    }
  }

  const newPost: BlogPost = {
    id: generateId(),
    slug: generateSlug(post.title),
    created_at: now,
    updated_at: now,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt ?? null,
    featured_image: post.featured_image ?? null,
    image_filter: post.image_filter ?? null,
    category: post.category,
    tags: post.tags ?? [],
    status: post.status ?? 'draft',
    meta_title: post.meta_title ?? null,
    meta_description: post.meta_description ?? null,
    meta_keywords: post.meta_keywords ?? null,
    video_url: post.video_url ?? null,
    gallery_images: post.gallery_images ?? [],
    google_docs_url: post.google_docs_url ?? null,
    google_sheets_url: post.google_sheets_url ?? null,
    google_slides_url: post.google_slides_url ?? null,
    pdf_url: post.pdf_url ?? null,
    embed_code: post.embed_code ?? null,
  };
  posts.push(newPost);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  return newPost;
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts().filter((p) => p.id !== id);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

// Page Customizations
export function getPageCustomizations(): PageCustomization[] {
  try {
    const data = localStorage.getItem(PAGE_CUSTOMIZATION_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getPageCustomization(pagePath: string): PageCustomization | null {
  return getPageCustomizations().find((p) => p.page_path === pagePath) ?? null;
}

export function savePageCustomization(customization: Omit<PageCustomization, 'id'> & { id?: string }): PageCustomization {
  const customizations = getPageCustomizations();
  const existing = customizations.findIndex((c) => c.page_path === customization.page_path);

  const saved: PageCustomization = {
    id: customization.id || generateId(),
    page_path: customization.page_path,
    primary_color: customization.primary_color ?? null,
    secondary_color: customization.secondary_color ?? null,
    accent_color: customization.accent_color ?? null,
    heading_font: customization.heading_font ?? null,
    body_font: customization.body_font ?? null,
    navbar_color: customization.navbar_color ?? null,
    navbar_font: customization.navbar_font ?? null,
    hidden_nav_links: customization.hidden_nav_links ?? [],
  };

  if (existing >= 0) {
    customizations[existing] = saved;
  } else {
    customizations.push(saved);
  }

  localStorage.setItem(PAGE_CUSTOMIZATION_KEY, JSON.stringify(customizations));
  return saved;
}
