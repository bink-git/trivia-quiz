
import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (!anchor) return;

      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
