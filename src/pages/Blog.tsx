import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { FilteredImage } from '@/components/FilteredImage';
import { getPublishedBlogPosts } from '@/lib/blogStore';

const categories = ['All', 'Articles', 'Case Studies', 'Tutorials', 'Research'];

const Blog = () => {
  const posts = getPublishedBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <Layout>
      <SEOHead
        title="Blog"
        description="Articles, case studies, tutorials, and insights"
      />
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-6xl">
            {/* Editorial Header */}
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Journal
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  Blog
                </h1>
                <div className="w-16 h-px bg-foreground" />
              </div>
            </FadeIn>

            {/* Search and Filters */}
            <FadeIn delay={0.1}>
              <div className="mb-12 space-y-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 border-0 border-b border-border bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                  />
                </div>
                <div className="flex flex-wrap gap-6">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs uppercase tracking-[0.2em] pb-1 transition-all ${
                        selectedCategory === category
                          ? 'text-foreground border-b border-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
                  {posts.length === 0
                    ? 'No posts yet'
                    : 'No posts match your search'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <FadeIn key={post.id} delay={index * 0.08}>
                    <Link to={`/blog/${post.slug}`} className="group block">
                      {post.featured_image ? (
                        <div className="overflow-hidden mb-4">
                          <FilteredImage
                            src={post.featured_image}
                            alt={post.title}
                            filter={post.image_filter}
                            className="h-56 w-full object-cover transition-all duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-56 bg-secondary flex items-center justify-center mb-4">
                          <span className="text-5xl font-bold text-muted-foreground/20 font-display">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        {post.category}
                        {' · '}
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>

                      <h3 className="text-lg font-semibold font-display mb-2 group-hover:underline underline-offset-4 transition-all">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.excerpt || post.content.slice(0, 150)}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
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
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Blog;
