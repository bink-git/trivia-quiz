import { useEffect } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { Projects } from '@/components/home/projects';
import { Contact } from '@/components/home/contact';
import { Github, Heart, Linkedin, Mail } from 'lucide-react';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { Button } from '@/components/ui/button';

const Index = () => {
  // For revealing elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <footer className="bg-card py-8 border-t">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-lg font-medium mb-1">Ivan Bahniuk</p>
                <p className="text-muted-foreground">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                >
                  <a
                    href="https://github.com/bink-git"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                >
                  <a
                    href="https://www.linkedin.com/in/ivan-bahniuk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                >
                  <a href="mailto:bahniuk.dev@gmail.com" aria-label="Email">
                    <Mail size={20} />
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <span>Built with</span>
                <Heart size={14} className="text-primary fill-primary mx-1" />
                <span>using React & Tailwind</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
};

export default Index;
