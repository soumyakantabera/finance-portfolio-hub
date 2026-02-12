import { Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useProfile,
  useEducation,
  useExperience,
  useSkills,
  useCertifications,
} from '@/hooks/usePortfolioData';

const About = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: education, isLoading: educationLoading } = useEducation();
  const { data: experience, isLoading: experienceLoading } = useExperience();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: certifications, isLoading: certificationsLoading } = useCertifications();

  const isLoading =
    profileLoading || educationLoading || experienceLoading || skillsLoading || certificationsLoading;

  const skillsByCategory = skills?.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMM yyyy');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            <Skeleton className="h-4 w-20 mb-4" />
            <Skeleton className="h-12 w-1/2 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Skeleton className="h-64 w-full" />
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            {/* Editorial Header */}
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Background
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  About
                </h1>
                <div className="w-16 h-px bg-foreground" />
              </div>
            </FadeIn>

            {/* Profile Section */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div>
                  {profile?.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={profile.name}
                      className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-secondary flex items-center justify-center">
                      <span className="text-6xl font-bold text-muted-foreground/20 font-display">
                        {profile?.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold font-display mb-2">
                    {profile?.name || 'Your Name'}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    {profile?.tagline || 'Finance Professional'}
                  </p>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-8">
                    {profile?.bio || 'Welcome to my portfolio.'}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {profile?.resume_url && (
                      <Button asChild className="uppercase tracking-wider text-xs">
                        <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-3 w-3" />
                          Resume
                        </a>
                      </Button>
                    )}
                    {profile?.linkedin_url && (
                      <Button asChild variant="outline" className="uppercase tracking-wider text-xs">
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {profile?.github_url && (
                      <Button asChild variant="outline" className="uppercase tracking-wider text-xs">
                        <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Experience Section */}
            {experience && experience.length > 0 && (
              <FadeIn delay={0.15}>
                <section className="mb-20">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    Career
                  </p>
                  <h2 className="text-3xl font-bold font-display mb-8">Experience</h2>
                  <div className="space-y-0">
                    {experience.map((exp, i) => (
                      <div key={exp.id} className="border-t border-border py-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold font-display">{exp.position}</h3>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                          </div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                            {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                          </p>
                        </div>
                        {exp.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Education Section */}
            {education && education.length > 0 && (
              <FadeIn delay={0.2}>
                <section id="education" className="mb-20 scroll-mt-20">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    Academic
                  </p>
                  <h2 className="text-3xl font-bold font-display mb-8">Education</h2>
                  <div className="space-y-0">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-t border-border py-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold font-display">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution}
                              {edu.field_of_study && ` · ${edu.field_of_study}`}
                            </p>
                          </div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                            {formatDate(edu.start_date)} — {formatDate(edu.end_date)}
                          </p>
                        </div>
                        {edu.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Skills Section */}
            {skillsByCategory && Object.keys(skillsByCategory).length > 0 && (
              <FadeIn delay={0.25}>
                <section id="skills" className="mb-20 scroll-mt-20">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    Expertise
                  </p>
                  <h2 className="text-3xl font-bold font-display mb-8">Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                      <div key={category}>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                          {category}
                        </h3>
                        <div className="space-y-3">
                          {categorySkills?.map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-muted-foreground text-xs">{skill.proficiency}%</span>
                              </div>
                              <div className="h-1 bg-secondary w-full">
                                <div
                                  className="h-full bg-foreground transition-all duration-700"
                                  style={{ width: `${skill.proficiency}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <FadeIn delay={0.3}>
                <section id="certifications" className="scroll-mt-20">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    Credentials
                  </p>
                  <h2 className="text-3xl font-bold font-display mb-8">Certifications</h2>
                  <div className="space-y-0">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="border-t border-border py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {cert.issuing_organization}
                            {cert.issue_date && ` · ${formatDate(cert.issue_date)}`}
                          </p>
                        </div>
                        {cert.credential_url && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          >
                            View Credential
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default About;
