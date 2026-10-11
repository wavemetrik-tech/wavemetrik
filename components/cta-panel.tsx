import { SignalRings } from "@/components/signal-rings";
import styles from "./cta-panel.module.css";

export function CtaTile({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <div className={`signal-panel ${styles.panel}`} data-cta-panel>
      <SignalRings />
      <div className={styles.copy}>{children}</div>
      <div className={styles.actions} data-cta-actions>
        {actions}
      </div>
    </div>
  );
}

export function CtaPanel({
  headingId,
  eyebrow,
  title,
  children,
  actions,
  className = "page-section",
}: {
  headingId: string;
  eyebrow?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  actions: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={headingId} className={className}>
      <CtaTile actions={actions}>
        {eyebrow && (
          <p className={`eyebrow mb-4 ${styles.eyebrow}`}>{eyebrow}</p>
        )}
        <h2 id={headingId} className="section-heading max-w-xl">
          {title}
        </h2>
        <p className={styles.description}>{children}</p>
      </CtaTile>
    </section>
  );
}
