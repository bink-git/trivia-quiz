
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "./motion-div";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <MotionDiv 
      animation="slide-up" 
      delay={100 * index} 
      className="h-full"
    >
      <div
        className={cn(
          "group relative flex flex-col h-full overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300",
          isHovered && "shadow-md scale-[1.01]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-opacity",
            isLoaded ? "opacity-0" : "opacity-100"
          )}>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
          
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700",
              isHovered ? "scale-105" : "scale-100",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
          />
          
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {project.githubUrl && (
                <Button 
                  size="icon" 
                  variant="secondary" 
                  asChild
                  className="h-9 w-9 rounded-full"
                >
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="View GitHub repository"
                  >
                    <Github size={18} />
                  </a>
                </Button>
              )}
              
              {project.liveUrl && (
                <Button 
                  size="icon" 
                  variant="default" 
                  asChild
                  className="h-9 w-9 rounded-full"
                >
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="View live project"
                  >
                    <ExternalLink size={18} />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 text-xl font-medium">{project.title}</h3>
          <p className="mb-4 text-muted-foreground flex-1">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
