/** SVG icon renderer for category string identifiers. */
export function CategoryIcon({ name, size = 40, className }: { name: string; size?: number; className?: string }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "music":
      return <svg {...p}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>;
    case "theater":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>;
    case "sports":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 000 20M2 12h20" /><path d="M12 2c2.5 3.5 4 7.5 4 10s-1.5 6.5-4 10" /><path d="M12 2c-2.5 3.5-4 7.5-4 10s1.5 6.5 4 10" /></svg>;
    case "palette":
      return <svg {...p}><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>;
    case "family":
      return <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>;
    case "kids":
      return <svg {...p}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    case "briefcase":
      return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>;
    case "gallery":
      return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
    case "landmark":
      return <svg {...p}><path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-5h6v5" /><path d="M3 8h18" /></svg>;
    case "museum":
      return <svg {...p}><path d="M3 21h18" /><path d="M3 7l9-4 9 4" /><path d="M6 7v10" /><path d="M10 7v10" /><path d="M14 7v10" /><path d="M18 7v10" /></svg>;
    case "tree":
      return <svg {...p}><path d="M12 22v-7" /><path d="M9 22h6" /><path d="M12 15l-5-6h3L7 3h10l-3 6h3l-5 6z" /></svg>;
    case "beach":
      return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>;
    case "waves":
      return <svg {...p}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>;
    case "sailboat":
      return <svg {...p}><path d="M2 21h20" /><path d="M3.5 18h17l-1-6H4.5l-1 6z" /><path d="M12 2v10" /><path d="M12 2l6 10" /><path d="M12 2L6 12" /></svg>;
    case "star":
      return <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case "hotel":
      return <svg {...p}><path d="M3 21V3h18v18" /><path d="M9 21V9h6v12" /><line x1="7" y1="7" x2="7" y2="7.01" /><line x1="11" y1="7" x2="11" y2="7.01" /><line x1="17" y1="7" x2="17" y2="7.01" /><line x1="17" y1="11" x2="17" y2="11.01" /><line x1="17" y1="15" x2="17" y2="15.01" /></svg>;
    case "coffee":
      return <svg {...p}><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>;
    case "utensils":
      return <svg {...p}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" /></svg>;
    case "moon":
      return <svg {...p}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>;
    case "bus":
      return <svg {...p}><path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4.8C3.6 6 2.5 6.8 2.1 7.8l-1.4 5C.6 13.2.5 13.6.5 14c0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
    case "map":
      return <svg {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
  }
}
