import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/portfolio';

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center border-b border-border">
      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Finance Professional
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9]">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed font-light">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 text-base font-medium">
                <Link to="/projects">
                  View Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-medium border-foreground hover:bg-foreground hover:text-background transition-colors">
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              {profile.photo_url ? (
                <img src={profile.photo_url} alt={profile.name} className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="bg-muted w-full aspect-[4/5] flex items-center justify-center">
                  <span className="text-[12rem] font-display font-bold text-muted-foreground/20">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
