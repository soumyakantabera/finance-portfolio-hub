import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/usePortfolioData';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSummary() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 rounded-2xl" />
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              {profile?.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.name}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="bg-gradient-navy w-full aspect-square flex items-center justify-center">
                  <span className="text-7xl font-display font-bold text-primary-foreground/30">
                    {profile?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-accent/30 rounded-2xl -z-10" />
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground">
                {profile?.tagline || 'Finance Professional'}
              </p>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {profile?.bio || 'Welcome to my portfolio. I am passionate about finance and data-driven decision making.'}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild className="h-12 px-6">
                <Link to="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {profile?.resume_url && (
                <Button asChild variant="outline" className="h-12 px-6">
                  <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
