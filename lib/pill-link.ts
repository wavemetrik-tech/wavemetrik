// Large pill-shaped links used for the main actions in a hero.
const base =
  "action-pill group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-[1rem]/6 font-medium text-center outline-none focus-visible:ring-3 focus-visible:ring-primary/40 active:scale-[0.98] sm:w-auto";

export const pillLink = {
  primary: `${base} bg-primary text-primary-foreground hover:bg-primary-hover`,
  outline: `${base} border border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/[0.05]`,
  inverse: `${base} bg-white text-brand hover:bg-white/90`,
};
