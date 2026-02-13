import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { FilteredImage } from '@/components/FilteredImage';
import { MediaEmbed } from '@/components/MediaEmbed';
import { getBlogPostBySlug } from '@/lib/blogStore';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-2xl font-bold font-display mb-4">Post not found</h1>
            <Link
              to="/blog"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || undefined}
        keywords={post.meta_keywords || undefined}
        ogImage={post.featured_image || undefined}
      />
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            {/* Back Link */}
            <FadeIn>
              <Link
                to="/blog"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-12 block"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Blog
              </Link>
            </FadeIn>

            {/* Header */}
            <FadeIn delay={0.1}>
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  {post.category}
                  {' · '}
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold font-display leading-[0.95] mb-6">
                  {post.title}
                </h1>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal uppercase tracking-wider"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Featured Image */}
            {post.featured_image && (
              <FadeIn delay={0.2}>
                <div className="overflow-hidden mb-12">
                  <FilteredImage
                    src={post.featured_image}
                    alt={post.title}
                    filter={post.image_filter}
                    className="w-full transition-all duration-700"
                  />
                </div>
              </FadeIn>
            )}

            {/* Content */}
            <FadeIn delay={0.3}>
              <div className="mb-12">
                <div className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </div>
              </div>
            </FadeIn>

            {/* Gallery */}
            {post.gallery_images && post.gallery_images.length > 0 && (
              <FadeIn delay={0.35}>
                <div className="mb-12">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.gallery_images.map((img, i) => (
                      <div key={i} className="overflow-hidden">
                        <FilteredImage
                          src={img}
                          alt={`Gallery image ${i + 1}`}
                          filter={post.image_filter}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Media Embeds */}
            <FadeIn delay={0.4}>
              <MediaEmbed
                videoUrl={post.video_url}
                googleDocsUrl={post.google_docs_url}
                googleSheetsUrl={post.google_sheets_url}
                googleSlidesUrl={post.google_slides_url}
                pdfUrl={post.pdf_url}
                embedCode={post.embed_code}
              />
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default BlogPost;
