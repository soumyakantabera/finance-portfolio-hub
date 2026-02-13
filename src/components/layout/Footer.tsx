import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfile } from '@/hooks/usePortfolioData';

export function Footer() {
  const { data: profile } = useProfile();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-bold tracking-tight">
              {profile?.name || 'Portfolio'}
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {profile?.tagline || 'Finance professional showcasing projects and experience.'}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6 pt-4">
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/projects', label: 'Projects' },
                { to: '/skills', label: 'Skills' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground transition-colors group flex items-center"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Get in Touch
            </h4>
            <div className="space-y-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {profile.email}
                </a>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center text-foreground font-medium group"
              >
                Send a Message
                <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
