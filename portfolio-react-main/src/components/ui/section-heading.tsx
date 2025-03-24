
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {subtitle && (
        <p className="inline-block text-sm font-medium uppercase tracking-wider text-primary mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="relative text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
