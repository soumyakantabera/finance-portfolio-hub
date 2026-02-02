import { useSkills } from '@/hooks/usePortfolioData';
import { Skeleton } from '@/components/ui/skeleton';

export function SkillsHighlight() {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mb-16">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!skills || skills.length === 0) {
    return null;
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Skills</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-lg font-display font-semibold uppercase tracking-wide border-b border-border pb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {categorySkills.map((skill) => (
                  <li key={skill.id} className="flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.proficiency}%</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
