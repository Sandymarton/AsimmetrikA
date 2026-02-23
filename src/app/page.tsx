import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero pins here via CSS sticky — About slides up and covers it */}
        <div className="relative">
          <HeroSection />
          <AboutSection />
        </div>
        <ServicesSection />
        <ProjectsSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
