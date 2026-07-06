interface PageHeaderProps {
  title: string;
  description?: string;
}

/** Consistent heading block for interior pages. */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {description ? <p className="text-muted-foreground max-w-[720px]">{description}</p> : null}
    </div>
  );
}
