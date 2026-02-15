import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolio';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.is_featured);

  if (featured.length === 0) {
    return (
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Projects will appear here once added.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="container">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Work</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Projects</h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link to="/projects">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featured.map((project, index) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="group block">
              <div className="overflow-hidden mb-6">
                {project.thumbnail_url ? (
                  <img src={project.thumbnail_url} alt={project.title} className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center">
                    <span className="text-6xl font-display font-bold text-muted-foreground/20">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">{project.category}</p>
                <h3 className="text-2xl font-display font-semibold group-hover:underline underline-offset-4">{project.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{project.short_description || project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Button asChild variant="outline" className="w-full h-12 border-foreground hover:bg-foreground hover:text-background">
            <Link to="/projects">View All Projects<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
