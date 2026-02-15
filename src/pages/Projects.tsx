import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, LayoutGrid, BookOpen, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/usePortfolioData';

const categories = ['All', 'Financial Models', 'Case Studies', 'Code', 'Research'];

type ViewMode = 'grid' | 'journal' | 'case-study';

const Projects = () => {
  const { data: projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <Layout>
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-6xl">
            {/* Header */}
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Portfolio
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  Projects
                </h1>
                <div className="w-16 h-px bg-foreground" />
              </div>
            </FadeIn>

            {/* Controls */}
            <FadeIn delay={0.1}>
              <div className="mb-12 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  {/* Search */}
                  <div className="relative max-w-md flex-1">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 border-0 border-b border-border bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center gap-1 border border-border">
                    {[
                      { mode: 'grid' as ViewMode, icon: LayoutGrid, label: 'Grid' },
                      { mode: 'journal' as ViewMode, icon: Calendar, label: 'Journal' },
                      { mode: 'case-study' as ViewMode, icon: BookOpen, label: 'Case Study' },
                    ].map(({ mode, icon: Icon, label }) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                          viewMode === mode
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filters */}
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

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
                  No projects match your search
                </p>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <FadeIn key={project.id} delay={index * 0.08}>
                    <Link to={`/projects/${project.id}`} className="group block">
                      {project.thumbnail_url ? (
                        <div className="overflow-hidden mb-4">
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="h-56 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-56 bg-secondary flex items-center justify-center mb-4 group-hover:bg-foreground/5 transition-colors">
                          <span className="text-5xl font-bold text-muted-foreground/20 font-display">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-lg font-semibold font-display mb-2 group-hover:underline underline-offset-4">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {project.short_description || project.description}
                      </p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs font-normal uppercase tracking-wider">
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

            {/* Journal View - Date-ordered entries */}
            {viewMode === 'journal' && filteredProjects.length > 0 && (
              <div className="space-y-0">
                {[...filteredProjects]
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((project, index) => (
                    <FadeIn key={project.id} delay={index * 0.08}>
                      <Link
                        to={`/projects/${project.id}`}
                        className="group block border-t border-border py-8 hover:bg-secondary/30 transition-colors -mx-4 px-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                          {/* Date */}
                          <div className="md:w-32 shrink-0">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                              {format(new Date(project.created_at), 'MMM dd, yyyy')}
                            </p>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                              {project.category}
                            </p>
                            <h3 className="text-xl font-semibold font-display mb-3 group-hover:underline underline-offset-4">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {project.description}
                            </p>
                            {project.tags && project.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs font-normal uppercase tracking-wider">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
              </div>
            )}

            {/* Case Study View */}
            {viewMode === 'case-study' && filteredProjects.length > 0 && (
              <div className="space-y-16">
                {filteredProjects.map((project, index) => {
                  // Parse case study format from description
                  const desc = project.description || '';
                  const hasCaseFormat = desc.includes('Problem:') && desc.includes('Approach:') && desc.includes('Result:');

                  let sections: { label: string; text: string }[] = [];
                  if (hasCaseFormat) {
                    const problemMatch = desc.match(/Problem:\s*(.*?)(?=Approach:|$)/s);
                    const approachMatch = desc.match(/Approach:\s*(.*?)(?=Result:|$)/s);
                    const resultMatch = desc.match(/Result:\s*(.*?)$/s);
                    sections = [
                      { label: 'Problem', text: problemMatch?.[1]?.trim() || '' },
                      { label: 'Approach', text: approachMatch?.[1]?.trim() || '' },
                      { label: 'Result', text: resultMatch?.[1]?.trim() || '' },
                    ].filter(s => s.text);
                  }

                  return (
                    <FadeIn key={project.id} delay={index * 0.1}>
                      <Link
                        to={`/projects/${project.id}`}
                        className="group block border border-border p-8 md:p-12 hover:border-foreground/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {project.category}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {format(new Date(project.created_at), 'yyyy')}
                          </p>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold font-display mb-6 group-hover:underline underline-offset-4">
                          {project.title}
                        </h3>

                        {hasCaseFormat ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {sections.map((section) => (
                              <div key={section.label}>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 font-medium">
                                  {section.label}
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {section.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                            {project.description}
                          </p>
                        )}

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs font-normal uppercase tracking-wider">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </Link>
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Projects;
