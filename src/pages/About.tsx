import { Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
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

  // Group skills by category
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
        <div className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-10 w-1/2" />
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
      <div className="py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              {profile?.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.name}
                  className="rounded-xl shadow-lg w-full aspect-square object-cover"
                />
              ) : (
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 w-full aspect-square flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/30">
                    {profile?.name?.charAt(0) || '?'}
                  </span>
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2">{profile?.name || 'Your Name'}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {profile?.tagline || 'Finance Professional'}
              </p>
              <p className="text-muted-foreground mb-6 whitespace-pre-wrap">
                {profile?.bio || 'Welcome to my portfolio.'}
              </p>
              <div className="flex flex-wrap gap-4">
                {profile?.resume_url && (
                  <Button asChild>
                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                )}
                {profile?.linkedin_url && (
                  <Button asChild variant="outline">
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {profile?.github_url && (
                  <Button asChild variant="outline">
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{exp.position}</CardTitle>
                          <CardDescription className="text-base">{exp.company}</CardDescription>
                        </div>
                        <Badge variant="outline">
                          {formatDate(exp.start_date)} -{' '}
                          {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                        </Badge>
                      </div>
                    </CardHeader>
                    {exp.description && (
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{exp.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education && education.length > 0 && (
            <section id="education" className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <Card key={edu.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{edu.degree}</CardTitle>
                          <CardDescription className="text-base">
                            {edu.institution}
                            {edu.field_of_study && ` • ${edu.field_of_study}`}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">
                          {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                        </Badge>
                      </div>
                    </CardHeader>
                    {edu.description && (
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{edu.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {skillsByCategory && Object.keys(skillsByCategory).length > 0 && (
            <section id="skills" className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {categorySkills?.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">{skill.proficiency}%</span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <section id="certifications" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <Card key={cert.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                      <CardDescription>
                        {cert.issuing_organization}
                        {cert.issue_date && ` • ${formatDate(cert.issue_date)}`}
                      </CardDescription>
                    </CardHeader>
                    {cert.credential_url && (
                      <CardContent>
                        <Button asChild variant="link" className="p-0 h-auto">
                          <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                            View Credential
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default About;
