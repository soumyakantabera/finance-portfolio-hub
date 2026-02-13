import { describe, it, expect, beforeEach } from 'vitest';
import {
  getBlogPosts,
  getPublishedBlogPosts,
  getBlogPost,
  getBlogPostBySlug,
  saveBlogPost,
  deleteBlogPost,
  getPageCustomizations,
  getPageCustomization,
  savePageCustomization,
} from '@/lib/blogStore';

beforeEach(() => {
  localStorage.clear();
});

describe('blogStore - Blog Posts', () => {
  it('should return empty array when no posts exist', () => {
    expect(getBlogPosts()).toEqual([]);
  });

  it('should create a new blog post', () => {
    const post = saveBlogPost({
      title: 'Test Post',
      content: 'Test content',
      excerpt: 'A test excerpt',
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: ['test'],
      status: 'draft',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(post.id).toBeDefined();
    expect(post.title).toBe('Test Post');
    expect(post.slug).toBe('test-post');
    expect(post.status).toBe('draft');
    expect(getBlogPosts()).toHaveLength(1);
  });

  it('should update an existing blog post', () => {
    const post = saveBlogPost({
      title: 'Original Title',
      content: 'Content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'draft',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    const updated = saveBlogPost({
      id: post.id,
      title: 'Updated Title',
      content: 'Updated content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'published',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(updated.title).toBe('Updated Title');
    expect(updated.status).toBe('published');
    expect(getBlogPosts()).toHaveLength(1);
  });

  it('should only return published posts', () => {
    saveBlogPost({
      title: 'Draft',
      content: 'Draft content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'draft',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    saveBlogPost({
      title: 'Published',
      content: 'Published content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'published',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(getBlogPosts()).toHaveLength(2);
    expect(getPublishedBlogPosts()).toHaveLength(1);
    expect(getPublishedBlogPosts()[0].title).toBe('Published');
  });

  it('should find post by id', () => {
    const post = saveBlogPost({
      title: 'Find Me',
      content: 'Content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'draft',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(getBlogPost(post.id)).toBeTruthy();
    expect(getBlogPost('nonexistent')).toBeNull();
  });

  it('should find published post by slug', () => {
    saveBlogPost({
      title: 'My Great Post',
      content: 'Content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'published',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(getBlogPostBySlug('my-great-post')).toBeTruthy();
    expect(getBlogPostBySlug('nonexistent')).toBeNull();
  });

  it('should delete a blog post', () => {
    const post = saveBlogPost({
      title: 'Delete Me',
      content: 'Content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'draft',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(getBlogPosts()).toHaveLength(1);
    deleteBlogPost(post.id);
    expect(getBlogPosts()).toHaveLength(0);
  });

  it('should generate correct slug from title', () => {
    const post = saveBlogPost({
      title: 'Hello World! This is a Test',
      content: 'Content',
      excerpt: null,
      featured_image: null,
      image_filter: null,
      category: 'Articles',
      tags: [],
      status: 'draft',
      meta_title: null,
      meta_description: null,
      meta_keywords: null,
      video_url: null,
      gallery_images: [],
      google_docs_url: null,
      google_sheets_url: null,
      google_slides_url: null,
      pdf_url: null,
      embed_code: null,
    });

    expect(post.slug).toBe('hello-world-this-is-a-test');
  });
});

describe('blogStore - Page Customizations', () => {
  it('should return empty array when no customizations exist', () => {
    expect(getPageCustomizations()).toEqual([]);
  });

  it('should save a page customization', () => {
    const saved = savePageCustomization({
      page_path: '/',
      primary_color: '#ff0000',
      secondary_color: null,
      accent_color: null,
      heading_font: null,
      body_font: null,
      navbar_color: null,
      navbar_font: null,
      hidden_nav_links: [],
    });

    expect(saved.id).toBeDefined();
    expect(saved.primary_color).toBe('#ff0000');
    expect(getPageCustomizations()).toHaveLength(1);
  });

  it('should update existing page customization', () => {
    savePageCustomization({
      page_path: '/',
      primary_color: '#ff0000',
      secondary_color: null,
      accent_color: null,
      heading_font: null,
      body_font: null,
      navbar_color: null,
      navbar_font: null,
      hidden_nav_links: [],
    });

    savePageCustomization({
      page_path: '/',
      primary_color: '#00ff00',
      secondary_color: null,
      accent_color: null,
      heading_font: 'inter',
      body_font: null,
      navbar_color: null,
      navbar_font: null,
      hidden_nav_links: ['Contact'],
    });

    expect(getPageCustomizations()).toHaveLength(1);
    const custom = getPageCustomization('/');
    expect(custom?.primary_color).toBe('#00ff00');
    expect(custom?.heading_font).toBe('inter');
    expect(custom?.hidden_nav_links).toEqual(['Contact']);
  });

  it('should find customization by page path', () => {
    savePageCustomization({
      page_path: '/blog',
      primary_color: '#123456',
      secondary_color: null,
      accent_color: null,
      heading_font: null,
      body_font: null,
      navbar_color: null,
      navbar_font: null,
      hidden_nav_links: [],
    });

    expect(getPageCustomization('/blog')).toBeTruthy();
    expect(getPageCustomization('/nonexistent')).toBeNull();
  });
});
