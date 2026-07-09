interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

/** Heading + single paragraph block, used by long-form policy pages (Privacy, Terms). */
export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-foreground text-xl font-semibold">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
