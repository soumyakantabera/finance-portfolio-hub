import { useState } from 'react';
import { BarChart3, PieChart, List, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { useSkills } from '@/hooks/usePortfolioData';
import { skillReferences } from '@/data/portfolio';

type ViewMode = 'bar' | 'radar' | 'list';

const Skills = () => {
  const { data: skills } = useSkills();
  const [viewMode, setViewMode] = useState<ViewMode>('bar');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skillsByCategory = skills?.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  const categories = ['All', ...Object.keys(skillsByCategory)];

  const filteredSkills = selectedCategory === 'All'
    ? skills || []
    : skillsByCategory[selectedCategory] || [];

  const maxProficiency = Math.max(...(filteredSkills.map(s => s.proficiency) || [100]));

  return (
    <Layout>
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-5xl">
            {/* Header */}
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Expertise
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  Skills
                </h1>
                <div className="w-16 h-px bg-foreground" />
              </div>
            </FadeIn>

            {/* Controls */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs uppercase tracking-[0.2em] pb-1 transition-all ${
                        selectedCategory === cat
                          ? 'text-foreground border-b border-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 border border-border">
                  {[
                    { mode: 'bar' as ViewMode, icon: BarChart3, label: 'Bar' },
                    { mode: 'radar' as ViewMode, icon: PieChart, label: 'Radar' },
                    { mode: 'list' as ViewMode, icon: List, label: 'List' },
                  ].map(({ mode, icon: Icon, label }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                        viewMode === mode
                          ? 'bg-foreground text-background'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Bar Chart View */}
            {viewMode === 'bar' && (
              <FadeIn delay={0.15}>
                <div className="space-y-4">
                  {filteredSkills.map((skill, i) => (
                    <div key={skill.id} className="group">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {skill.category}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>
                      <div className="h-8 bg-secondary w-full relative overflow-hidden">
                        <div
                          className="h-full bg-foreground transition-all duration-1000 ease-out"
                          style={{
                            width: `${(skill.proficiency / maxProficiency) * 100}%`,
                            transitionDelay: `${i * 80}ms`,
                          }}
                        />
                      </div>
                      {/* References */}
                      {skillReferences[skill.name] && (
                        <div className="mt-1 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          {skillReferences[skill.name].map((ref) => (
                            <a
                              key={ref.url}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                            >
                              {ref.label}
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Radar/Pie View - Simple radial chart */}
            {viewMode === 'radar' && (
              <FadeIn delay={0.15}>
                <div className="flex justify-center py-8">
                  <div className="relative w-80 h-80 md:w-96 md:h-96">
                    {/* Concentric circles */}
                    {[25, 50, 75, 100].map((pct) => (
                      <div
                        key={pct}
                        className="absolute border border-border rounded-full"
                        style={{
                          width: `${pct}%`,
                          height: `${pct}%`,
                          top: `${(100 - pct) / 2}%`,
                          left: `${(100 - pct) / 2}%`,
                        }}
                      />
                    ))}
                    {/* Skill dots */}
                    {filteredSkills.map((skill, i) => {
                      const angle = (i / filteredSkills.length) * 2 * Math.PI - Math.PI / 2;
                      const radius = (skill.proficiency / 100) * 45;
                      const x = 50 + radius * Math.cos(angle);
                      const y = 50 + radius * Math.sin(angle);
                      return (
                        <div
                          key={skill.id}
                          className="absolute group"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <div className="w-3 h-3 bg-foreground" />
                          <div className="absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-medium bg-background px-1">
                              {skill.name} ({skill.proficiency}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {/* Labels around edge */}
                    {filteredSkills.map((skill, i) => {
                      const angle = (i / filteredSkills.length) * 2 * Math.PI - Math.PI / 2;
                      const x = 50 + 52 * Math.cos(angle);
                      const y = 50 + 52 * Math.sin(angle);
                      return (
                        <div
                          key={`label-${skill.id}`}
                          className="absolute text-xs text-muted-foreground whitespace-nowrap"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          {skill.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <FadeIn delay={0.15}>
                <div className="space-y-0">
                  {Object.entries(
                    selectedCategory === 'All' ? skillsByCategory : { [selectedCategory]: filteredSkills }
                  ).map(([category, catSkills]) => (
                    <div key={category} className="mb-12">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 pb-2 border-b border-border">
                        {category}
                      </h3>
                      <div className="space-y-0">
                        {catSkills?.map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between py-4 border-b border-border/50 group">
                            <div>
                              <span className="text-sm font-medium">{skill.name}</span>
                              {/* References inline */}
                              {skillReferences[skill.name] && (
                                <div className="flex gap-3 mt-1">
                                  {skillReferences[skill.name].map((ref) => (
                                    <a
                                      key={ref.url}
                                      href={ref.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                                    >
                                      {ref.label}
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-1 bg-secondary">
                                <div
                                  className="h-full bg-foreground"
                                  style={{ width: `${skill.proficiency}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground font-mono w-8 text-right">
                                {skill.proficiency}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Skills;
