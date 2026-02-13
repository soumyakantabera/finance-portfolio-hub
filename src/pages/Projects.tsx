import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjects } from '@/hooks/usePortfolioData';
import { useStaticProjects } from '@/hooks/useStaticData';

const categories = ['All', 'Financial Models', 'Case Studies', 'Code', 'Research'];

const Projects = () => {
  const { data: dbProjects, isLoading: dbLoading } = useProjects();
  const { data: staticProjects, isLoading: staticLoading } = useStaticProjects();
  const isLoading = dbLoading && staticLoading;
  const projects = (dbProjects && dbProjects.length > 0) ? dbProjects : staticProjects;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
            {/* Editorial Header */}
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

            {/* Search and Filters */}
            <FadeIn delay={0.1}>
              <div className="mb-12 space-y-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
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

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-56 w-full mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
                  {projects?.length === 0
                    ? 'No projects yet'
                    : 'No projects match your search'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <FadeIn key={project.id} delay={index * 0.08}>
                    <Link to={`/projects/${project.id}`} className="group block">
                      {/* Thumbnail */}
                      {project.thumbnail_url ? (
                        <div className="overflow-hidden mb-4">
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="h-56 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-56 bg-secondary flex items-center justify-center mb-4">
                          <span className="text-5xl font-bold text-muted-foreground/20 font-display">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Meta */}
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        {project.category}
                        {project.is_featured && ' · Featured'}
                      </p>

                      {/* Title */}
                      <h3 className="text-lg font-semibold font-display mb-2 group-hover:underline underline-offset-4 transition-all">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {project.short_description || project.description}
                      </p>

                      {/* Tags */}
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
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Projects;
