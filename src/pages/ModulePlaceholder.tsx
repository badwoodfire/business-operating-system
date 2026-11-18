import { getNavItem } from '../config/navigation';
import PageHeader from '../components/ui/PageHeader';
import type { ModuleId } from '../types';

interface ModulePlaceholderProps {
  moduleId: ModuleId;
}

/** Shown for modules that are part of the roadmap but not built yet. */
export default function ModulePlaceholder({ moduleId }: ModulePlaceholderProps) {
  const item = getNavItem(moduleId);

  return (
    <>
      <PageHeader title={item.label} description={item.description} />
      <section className="panel placeholder" aria-labelledby="placeholder-title">
        <h2 id="placeholder-title" className="panel__title">
          Coming soon
        </h2>
        <p className="placeholder__text">
          This module is not built yet. It is planned to include:
        </p>
        <ul className="placeholder__list">
          {item.plannedFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
