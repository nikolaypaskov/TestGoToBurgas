import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: string;
  variant?: "solid" | "outline";
}

export function Badge({ label, color = "#0A6EBD", variant = "solid" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold",
        variant === "outline" && "border"
      )}
      style={
        variant === "solid"
          ? { backgroundColor: color, color: "#fff" }
          : { borderColor: color, color }
      }
    >
      {label}
    </span>
  );
}
