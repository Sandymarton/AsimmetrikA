import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import FallingLeaves from '@/components/FallingLeaves';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero pins here via CSS sticky — About slides up and covers it */}
        <div className="relative bg-black">
          <HeroSection />
          <AboutSection />
        </div>
        <FallingLeaves />
        <ServicesSection />
        <ProjectsSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
