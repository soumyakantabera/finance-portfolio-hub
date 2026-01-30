import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { SkillsHighlight } from '@/components/home/SkillsHighlight';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProjects />
      <SkillsHighlight />
    </Layout>
  );
};

export default Index;
