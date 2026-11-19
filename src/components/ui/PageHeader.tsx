import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Optional buttons shown on the right (e.g. an "Add order" action). */
  actions?: ReactNode;
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__text">
        <h1 className="page-header__title">{title}</h1>
        {description ? <p className="page-header__description">{description}</p> : null}
      </div>
      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </header>
  );
}
