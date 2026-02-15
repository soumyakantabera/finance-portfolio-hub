import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { skills } from '@/data/portfolio';

export function SkillsHighlight() {
  if (skills.length === 0) return null;

  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Skills</h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link to="/skills">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-lg font-display font-semibold uppercase tracking-wide border-b border-border pb-4">{category}</h3>
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

        <div className="mt-12 md:hidden">
          <Button asChild variant="outline" className="w-full h-12 border-foreground hover:bg-foreground hover:text-background">
            <Link to="/skills">View All Skills<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
