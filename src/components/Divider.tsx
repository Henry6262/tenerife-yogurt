interface DividerProps {
  numeral: string;
  kicker: string;
  tone?: "dark" | "light";
}

export function Divider({ numeral, kicker, tone = "dark" }: DividerProps) {
  const bg = tone === "dark" ? "bg-ink" : "bg-obsidian";
  const line = tone === "dark" ? "bg-cream/10" : "bg-cream/5";

  return (
    <div className={`${bg} py-8`}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 md:px-10">
        <span className="font-display text-2xl font-bold text-flame/20">{numeral}</span>
        <div className={`h-px flex-1 ${line}`} />
        <span className="label text-cream/30">{kicker}</span>
        <div className={`h-px flex-1 ${line}`} />
        <span className="font-display text-2xl font-bold text-flame/20">{numeral}</span>
      </div>
    </div>
  );
}
