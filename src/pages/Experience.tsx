import { format } from 'date-fns';
import { Briefcase, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useExperience } from '@/hooks/usePortfolioData';

const Experience = () => {
  const { data: experience, isLoading } = useExperience();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMM yyyy');
  };

  const formatDateRange = (startDate: string | null, endDate: string | null, isCurrent: boolean) => {
    const start = startDate ? formatDate(startDate) : '';
    const end = isCurrent ? 'Present' : endDate ? formatDate(endDate) : '';
    return `${start}${start && end ? ' - ' : ''}${end}`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            <Skeleton className="h-4 w-20 mb-4" />
            <Skeleton className="h-12 w-1/2 mb-8" />
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
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
                  Professional Journey
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  Experience
                </h1>
                <div className="w-16 h-px bg-foreground" />
              </div>
            </FadeIn>

            {/* Experience List */}
            <div className="space-y-8">
              {experience && experience.length > 0 ? (
                experience.map((exp, index) => (
                  <FadeIn key={exp.id} delay={0.1 + index * 0.1}>
                    <Card className="overflow-hidden border-0 shadow-none bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-background rounded-lg">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold font-display mb-1">
                              {exp.position}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-2">
                              {exp.company}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                              </span>
                              {exp.is_current && (
                                <Badge variant="secondary" className="ml-2">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {exp.description && (
                          <div className="mt-6 pl-16">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {exp.description}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))
              ) : (
                <FadeIn delay={0.1}>
                  <Card className="border-dashed">
                    <CardContent className="p-12 text-center">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-lg font-semibold mb-2">No Experience Yet</h3>
                      <p className="text-muted-foreground">
                        Experience entries will appear here once added.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Experience;
