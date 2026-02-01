import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ProfileSummary } from '@/components/home/ProfileSummary';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { SkillsHighlight } from '@/components/home/SkillsHighlight';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProfileSummary />
      <FeaturedProjects />
      <SkillsHighlight />
    </Layout>
  );
};

export default Index;
