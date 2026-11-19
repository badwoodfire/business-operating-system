import { useId, type ReactNode } from 'react';
import Badge from './Badge';

interface SamplePanelProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** A panel whose header carries a "Sample data" label. */
export default function SamplePanel({
  title,
  description,
  children,
}: SamplePanelProps) {
  const titleId = useId();

  return (
    <section className="panel" aria-labelledby={titleId}>
      <div className="panel__header">
        <div>
          <h2 id={titleId} className="panel__title">
            {title}
          </h2>
          {description ? (
            <p className="panel__description">{description}</p>
          ) : null}
        </div>
        <Badge tone="warning">Sample data</Badge>
      </div>
      {children}
    </section>
  );
}
