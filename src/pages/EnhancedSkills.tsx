import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { SEOHead } from '@/components/SEOHead';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useSkillsWithRanking } from '@/hooks/usePortfolioContent';

/**
 * Enhanced Skills page with ranking based on citations
 * No bar charts - clean minimalist display with categories
 */
const EnhancedSkills = () => {
  const { skillsByCategory, categories, isLoading } = useSkillsWithRanking();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container max-w-6xl">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-12 w-48 mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
              No skills data available
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const displayCategories = selectedCategory
    ? [selectedCategory]
    : categories;

  return (
    <Layout>
      <SEOHead title="Skills" description="Technical skills and expertise ranked by usage" />
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-6xl">
            {/* Header */}
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Expertise
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  Skills
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Skills are ranked based on their usage across projects, experiences, education, and certifications.
                  Only actively used skills are displayed.
                </p>
                <div className="w-16 h-px bg-foreground mt-6" />
              </div>
            </FadeIn>

            {/* Category Filter */}
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all rounded ${
                    !selectedCategory
                      ? 'bg-foreground text-background'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all rounded ${
                      selectedCategory === category
                        ? 'bg-foreground text-background'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Skills by Category */}
            <div className="space-y-16">
              {displayCategories.map((category, idx) => {
                const skills = skillsByCategory[category] || [];
                if (skills.length === 0) return null;

                return (
                  <FadeIn key={category} delay={0.2 + idx * 0.1}>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                        {category}
                        <Badge variant="outline" className="text-xs">
                          {skills.length}
                        </Badge>
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group relative border border-border rounded-lg p-6 hover:border-foreground transition-all"
                          >
                            {/* Skill Icon */}
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                <img
                                  src={`/finance-portfolio-hub/assets/icons/${skill.icon}`}
                                  alt={skill.name}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    // Fallback to default icon if specific icon not found
                                    e.currentTarget.src = '/finance-portfolio-hub/assets/icons/default_icon.svg';
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>Rank #{skill.rank}</span>
                                  <span>•</span>
                                  <span>{skill.citationCount} {skill.citationCount === 1 ? 'use' : 'uses'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Visual rank indicator - larger for higher ranked skills */}
                            <div className="flex gap-1 items-end h-8">
                              {Array.from({ length: Math.min(5, Math.ceil(skill.citationCount)) }).map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-foreground/20 rounded-sm"
                                  style={{
                                    height: `${20 + (i * 15)}%`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Summary */}
            <FadeIn delay={0.5}>
              <div className="mt-16 pt-16 border-t border-border">
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Displaying {Object.values(skillsByCategory).flat().length} actively used skills
                    across {categories.length} {categories.length === 1 ? 'category' : 'categories'}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default EnhancedSkills;
