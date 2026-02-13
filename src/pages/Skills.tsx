import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { SEOHead } from '@/components/SEOHead';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { useStaticSkills } from '@/hooks/useStaticData';

const Skills = () => {
  const { data: skillsData, isLoading } = useStaticSkills();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container max-w-6xl">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-12 w-48 mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!skillsData || skillsData.categories.length === 0) {
    return (
      <Layout>
        <div className="py-20 md:py-32">
          <div className="container text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
              No skills data available
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const categories = skillsData.categories;
  const activeCategory = selectedCategory
    ? categories.find((c) => c.name === selectedCategory)
    : null;

  // Prepare radar chart data - average proficiency per category
  const radarData = categories.map((cat) => ({
    category: cat.name.length > 20 ? cat.name.slice(0, 18) + '…' : cat.name,
    proficiency: Math.round(
      cat.skills.reduce((sum, s) => sum + s.proficiency, 0) / cat.skills.length
    ),
  }));

  return (
    <Layout>
      <SEOHead title="Skills" description="Technical skills and expertise" />
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-6xl">
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

            {/* Radar Chart - Overview */}
            <FadeIn delay={0.1}>
              <div className="mb-16">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] mb-8">
                  Overview
                </h2>
                <div className="w-full max-w-lg mx-auto" style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      />
                      <Radar
                        name="Proficiency"
                        dataKey="proficiency"
                        stroke="hsl(var(--foreground))"
                        fill="hsl(var(--foreground))"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </FadeIn>

            {/* Category Tabs */}
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-6 mb-12">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-xs uppercase tracking-[0.2em] pb-1 transition-all ${
                    !selectedCategory
                      ? 'text-foreground border-b border-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-xs uppercase tracking-[0.2em] pb-1 transition-all ${
                      selectedCategory === cat.name
                        ? 'text-foreground border-b border-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Skills Display */}
            {activeCategory ? (
              <FadeIn delay={0.3} key={activeCategory.name}>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-lg font-display font-semibold uppercase tracking-wide border-b border-border pb-4 mb-8">
                      {activeCategory.name}
                    </h3>
                    {/* Bar Chart */}
                    <div className="mb-8" style={{ height: 280 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={activeCategory.skills.map((s) => ({
                            name: s.name,
                            proficiency: s.proficiency,
                          }))}
                          layout="vertical"
                          margin={{ left: 100, right: 20, top: 10, bottom: 10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(var(--border))"
                            horizontal={false}
                          />
                          <XAxis
                            type="number"
                            domain={[0, 100]}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          />
                          <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            width={90}
                          />
                          <Tooltip
                            formatter={(value: number) => [`${value}%`, 'Proficiency']}
                            contentStyle={{
                              background: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: 4,
                              fontSize: 12,
                            }}
                          />
                          <Bar
                            dataKey="proficiency"
                            fill="hsl(var(--foreground))"
                            radius={[0, 2, 2, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Skill Details with References */}
                    <ul className="space-y-4">
                      {activeCategory.skills.map((skill) => (
                        <li key={skill.id} className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {skill.proficiency}%
                              </span>
                            </div>
                            {skill.references && skill.references.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-1">
                                {skill.references.map((ref, idx) => (
                                  <Link
                                    key={idx}
                                    to={ref.url}
                                    className="inline-flex items-center gap-1"
                                  >
                                    <Badge
                                      variant="outline"
                                      className="text-xs font-normal cursor-pointer hover:bg-muted"
                                    >
                                      <ExternalLink className="h-2.5 w-2.5 mr-1" />
                                      {ref.label}
                                    </Badge>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {categories.map((cat, catIdx) => (
                  <FadeIn key={cat.name} delay={0.3 + catIdx * 0.08}>
                    <div className="space-y-6">
                      <h3 className="text-lg font-display font-semibold uppercase tracking-wide border-b border-border pb-4">
                        {cat.name}
                      </h3>
                      {/* Compact Bar Chart */}
                      <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={cat.skills.map((s) => ({
                              name: s.name,
                              proficiency: s.proficiency,
                            }))}
                            layout="vertical"
                            margin={{ left: 90, right: 10, top: 5, bottom: 5 }}
                          >
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis
                              dataKey="name"
                              type="category"
                              tick={{
                                fill: 'hsl(var(--muted-foreground))',
                                fontSize: 11,
                              }}
                              width={80}
                            />
                            <Tooltip
                              formatter={(value: number) => [`${value}%`, 'Proficiency']}
                              contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 4,
                                fontSize: 12,
                              }}
                            />
                            <Bar
                              dataKey="proficiency"
                              fill="hsl(var(--foreground))"
                              radius={[0, 2, 2, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Skills;
