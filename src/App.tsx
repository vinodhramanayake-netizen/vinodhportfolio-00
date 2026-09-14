import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ManifestoCookieSection from './components/ManifestoCookieSection';
import WorksSection from './components/WorksSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutPage from './components/AboutPage';
import ContactModal from './components/ContactModal';
import NavigationOverlay from './components/NavigationOverlay';
import ScrollPaceWidget from './components/ScrollPaceWidget';
import { ScrollProvider, useScroll } from './context/ScrollContext';
import { PROJECTS } from './data';
import { ScreenId, Project } from './types';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { scrollTo, setModalOpen } = useScroll();

  // Inform scroll manager when a modal is open to smoothly pause background wheel
  const handleOpenProject = (project: Project | null) => {
    if (project) {
      setSelectedProject(project);
      setCurrentScreen('project');
      scrollTo(0, 1.0);
    } else {
      setSelectedProject(null);
      setCurrentScreen('work');
      scrollTo(0, 1.0);
    }
  };

  const handleOpenContact = (open: boolean) => {
    setIsContactOpen(open);
    setModalOpen(open || isMenuOpen);
  };

  const handleOpenMenu = (open: boolean) => {
    setIsMenuOpen(open);
    setModalOpen(open || isContactOpen);
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    handleOpenMenu(false);
    scrollTo(0, 1.1);
  };

  const handleScrollDown = () => {
    scrollTo('#manifesto-section', 1.25);
  };

  const handleExploreWork = () => {
    if (currentScreen === 'home') {
      scrollTo('#works-section', 1.25);
    } else {
      handleNavigate('work');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#18181b] font-sans selection:bg-[#18181b] selection:text-white relative">
      {/* Top progress indicator & bottom-right pace selector */}
      <ScrollPaceWidget />

      {/* Primary Sticky Top Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact(true)}
      />

      {/* Screen Views */}
      <main id="page-content" className="w-full">
        {currentScreen === 'home' && (
          <>
            {/* Screen 1: The Iconic PRØDUX Hero (Exact Match to User's Uploaded Screenshot) */}
            <Hero onScrollDown={handleScrollDown} />

            {/* Screen 2: Manifesto & Star Wars Cookie Banner (Exact Match to User's Uploaded Screenshot) */}
            <ManifestoCookieSection onExploreWork={handleExploreWork} />

            {/* Selected Works Portfolio Showcase: 4 Projects on Landing Page */}
            <div id="works-section">
              <WorksSection
                projects={PROJECTS}
                isLandingPage={true}
                onSelectProject={(project) => handleOpenProject(project)}
              />
            </div>

            {/* Founder Reviews & Testimonials */}
            <ReviewsSection onOpenContact={() => handleOpenContact(true)} />
          </>
        )}

        {currentScreen === 'work' && (
          <div className="pt-16 sm:pt-20">
            <WorksSection
              projects={PROJECTS}
              isLandingPage={false}
              onSelectProject={(project) => handleOpenProject(project)}
              onBackHome={() => handleNavigate('home')}
            />
          </div>
        )}

        {currentScreen === 'project' && (selectedProject || PROJECTS[0]) && (
          <ProjectDetailPage
            project={selectedProject || PROJECTS[0]}
            allProjects={PROJECTS}
            onSelectProject={(project) => handleOpenProject(project)}
            onBackToWorks={() => handleNavigate('work')}
            onBackToHome={() => handleNavigate('home')}
            onOpenContact={() => handleOpenContact(true)}
          />
        )}

        {currentScreen === 'about' && (
          <AboutPage
            onOpenContact={() => handleOpenContact(true)}
            onNavigateToWorks={() => handleNavigate('work')}
          />
        )}

        {currentScreen === 'studio' && (
          <div className="pt-24">
            <ReviewsSection onOpenContact={() => handleOpenContact(true)} />
          </div>
        )}

        {currentScreen === 'contact' && (
          <div className="pt-24 min-h-[80vh] flex items-center justify-center">
            <ContactModal isOpen={true} onClose={() => setCurrentScreen('home')} />
          </div>
        )}
      </main>

      {/* Global Footer with Contact Info & Giant Wordmark */}
      <Footer onNavigate={handleNavigate} onOpenContact={() => handleOpenContact(true)} />

      {/* Brand Sprint Contact & Booking Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => handleOpenContact(false)} />

      {/* Fullscreen Brutalist Navigation Menu */}
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => handleOpenMenu(false)}
        onNavigate={handleNavigate}
        onOpenContact={() => {
          handleOpenMenu(false);
          handleOpenContact(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}
