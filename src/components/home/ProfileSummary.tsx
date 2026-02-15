import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/portfolio';

export function ProfileSummary() {
  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="container">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-8">About</p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight mb-12">
            {profile.bio}
          </p>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <Button asChild variant="outline" className="h-12 px-6 border-foreground hover:bg-foreground hover:text-background">
              <Link to="/about">Learn More<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <div className="flex items-center gap-6">
              {profile.email && <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-foreground transition-colors"><Mail className="h-5 w-5" /></a>}
              {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>}
              {profile.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="h-5 w-5" /></a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
