import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/usePortfolioData';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSection() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-36" />
                <Skeleton className="h-12 w-36" />
              </div>
            </div>
            <Skeleton className="h-[480px] w-full rounded-3xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground/80">
                Finance Professional
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
              <span className="block text-foreground">
                {profile?.name?.split(' ')[0] || 'Your'}
              </span>
              <span className="block text-gradient-gold">
                {profile?.name?.split(' ').slice(1).join(' ') || 'Name'}
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-lg leading-relaxed">
              {profile?.tagline || 'Transforming complex financial data into actionable insights'}
            </p>

            {/* Bio */}
            <p className="text-base text-muted-foreground/80 max-w-lg leading-relaxed">
              {profile?.bio || 'Welcome to my portfolio. Explore my projects showcasing financial modeling, valuation analysis, and data-driven decision making.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 text-base font-medium shadow-soft hover:shadow-card transition-all duration-300 bg-primary hover:bg-primary/90">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-medium border-2 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-3xl" />
            
            {/* Main image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-card animate-float">
              {profile?.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.name}
                  className="w-full aspect-[4/5] object-cover"
                />
              ) : (
                <div className="bg-gradient-navy w-full aspect-[4/5] flex items-center justify-center">
                  <span className="text-9xl font-display font-bold text-primary-foreground/30">
                    {profile?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-card p-6 border animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">10+</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
