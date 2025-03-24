
import { useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionDivProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-down" | "scale-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function MotionDiv({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  duration = 500,
  threshold = 0.1,
  once = true,
}: MotionDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            element.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
            
            if (once) {
              observer.unobserve(element);
            }
          }, delay);
        } else if (!once) {
          element.style.opacity = "0";
          
          switch(animation) {
            case "slide-up":
              element.style.transform = "translateY(20px)";
              break;
            case "slide-down":
              element.style.transform = "translateY(-20px)";
              break;
            case "scale-in":
              element.style.transform = "scale(0.95)";
              break;
            default:
              element.style.transform = "translateY(0)";
          }
        }
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [animation, delay, duration, once, threshold]);
  
  const getInitialStyles = () => {
    let styles = "opacity-0 ";
    
    switch(animation) {
      case "slide-up":
        styles += "translate-y-5";
        break;
      case "slide-down":
        styles += "-translate-y-5";
        break;
      case "scale-in":
        styles += "scale-95";
        break;
      default:
        styles += "translate-y-0";
    }
    
    return styles;
  };
  
  return (
    <div
      ref={ref}
      className={cn(getInitialStyles(), className)}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}
