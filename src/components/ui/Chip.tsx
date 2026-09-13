import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  className?: string;
}

export const Chip = ({ label, className }: ChipProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sage-tint text-brand-sage text-xs font-medium tracking-wide uppercase",
        className
      )}
    >
      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
      <span>{label}</span>
    </div>
  );
};
