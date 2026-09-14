import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface WorksSectionProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  onBackHome?: () => void;
  isLandingPage?: boolean;
}

const HOME_PAGE_PROJECT_IDS = [
  'brunelly',
  'mindfulness-meditation-mvp',
  'ceylo-tourism',
  'pixelvault-crypto',
];

export default function WorksSection({
  projects,
  onSelectProject,
  onBackHome,
  isLandingPage = false,
}: WorksSectionProps) {
  const selectedProjects = isLandingPage
    ? HOME_PAGE_PROJECT_IDS.map((id) => projects.find((p) => p.id === id)).filter(
        (p): p is Project => Boolean(p)
      )
    : projects;

  return (
    <section
      id="works-section"
      className="py-20 sm:py-28 px-4 sm:px-8 md:px-14 lg:px-20 border-t border-[#e5e7eb] bg-[#fafafa] relative"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Section Header */}
        <div className="pb-8 sm:pb-10 border-b border-[#e5e7eb]">
          {onBackHome && (
            <div className="pb-4">
              <button
                type="button"
                onClick={onBackHome}
                className="font-mono text-[12px] uppercase text-[#71717a] hover:text-[#111111] inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>←</span>
                <span>Back to Home</span>
              </button>
            </div>
          )}
          {isLandingPage && (
            <div className="flex items-center gap-3 mb-2 font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-[#15803d]">
              <span>[ NO MORE JUMPS ]</span>
              <span className="text-[#a1a1aa]">•</span>
              <span>VIEW MY AWSOME WORK AND HIRE ME</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
            {isLandingPage ? 'Featured Works' : 'Selected Works'}
          </h2>
        </div>

        {/* Project Display: 1-by-1 Stack on Landing Page, 2-by-2 Grid on Dedicated Works Page */}
        {isLandingPage ? (
          <div className="mt-12 sm:mt-16 space-y-16 sm:space-y-24 md:space-y-32">
            {selectedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={selectedProjects.length}
                onSelectProject={onSelectProject}
                isGridMode={false}
                disableImageChange={false}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {selectedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={selectedProjects.length}
                onSelectProject={onSelectProject}
                isGridMode={true}
                disableImageChange={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
