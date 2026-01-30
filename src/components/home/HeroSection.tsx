import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/usePortfolioData';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSection() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {profile?.name || 'Your Name'}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {profile?.tagline || 'Finance Professional'}
            </p>
            <p className="text-lg text-muted-foreground max-w-lg">
              {profile?.bio || 'Welcome to my portfolio. Explore my projects, experience, and skills.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {profile?.photo_url ? (
              <img
                src={profile.photo_url}
                alt={profile.name}
                className="rounded-2xl shadow-2xl w-full aspect-square object-cover"
              />
            ) : (
              <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 w-full aspect-square flex items-center justify-center">
                <span className="text-8xl font-bold text-primary/30">
                  {profile?.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
