import { useState } from 'react';
import { SectionHeading } from '../ui/section-heading';
import { ProjectCard, type Project } from '../ui/project-card';
import { Button } from '@/components/ui/button';
import { MotionDiv } from '../ui/motion-div';
import { Router } from 'lucide-react';

const ALL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Trivia Quiz App',
    description:
      'A quiz application with authorization, multiple choice questions, difficulty levels, and a global leaderboard.',
    image: '/images/quiz.png',
    tags: ['React', 'React Router', 'Firebase', 'Tailwind CSS'],
    liveUrl: 'https://trivia-quiz-develop.vercel.app/',
    githubUrl: 'https://github.com/bink-git/trivia-quiz',
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, task assignment, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    tags: ['React', 'Firebase', 'Material UI', 'React Query'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  {
    id: '3',
    title: 'Weather Forecast App',
    description:
      'A weather forecast application with detailed current conditions, hourly and daily forecasts, and location-based data.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    tags: ['React', 'API Integration', 'CSS Modules', 'Recharts'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  {
    id: '4',
    title: 'Personal Finance Tracker',
    description:
      'A personal finance application for tracking expenses, setting budgets, and visualizing spending patterns.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  {
    id: '5',
    title: 'Social Media Platform',
    description:
      'A social media platform with user profiles, post creation, interactions, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  {
    id: '6',
    title: 'Fitness Tracking App',
    description:
      'A fitness tracking application for logging workouts, tracking progress, and setting fitness goals.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    tags: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
];

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const hasMoreProjects = visibleProjects < ALL_PROJECTS.length;

  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, ALL_PROJECTS.length));
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          subtitle="My Work"
          title="Featured Projects"
          description="A selection of my recent projects showcasing my skills and experience in web development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {ALL_PROJECTS.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {hasMoreProjects && (
          <MotionDiv animation="fade-in" className="flex justify-center mt-10">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="rounded-full px-6"
            >
              Load More Projects
            </Button>
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
