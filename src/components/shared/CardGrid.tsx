interface CardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function CardGrid({ children, columns = 3 }: CardGridProps) {
  const colClass = columns === 4
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    : columns === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-6 lg:gap-8`}>
      {children}
    </div>
  );
}
