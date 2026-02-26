import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
}

export function Breadcrumbs({ items, theme = "light" }: BreadcrumbsProps) {
  const isDark = theme === "dark";
  const baseColor = isDark ? "text-white/60" : "text-text-muted";
  const activeColor = isDark ? "text-white" : "text-text-primary";
  const hoverColor = isDark ? "hover:text-white" : "hover:text-primary";
  const separatorColor = isDark ? "text-white/40" : "";

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${baseColor}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className={separatorColor}>/</span>}
            {item.href ? (
              <Link href={item.href} className={hoverColor}>
                {item.label}
              </Link>
            ) : (
              <span className={activeColor}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
