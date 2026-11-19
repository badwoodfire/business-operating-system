interface BarListItem {
  id: string;
  label: string;
  value: number;
  /** Text shown next to the label, e.g. a formatted amount. */
  display: string;
}

interface BarListProps {
  items: BarListItem[];
}

/** Simple horizontal bars drawn with CSS, so no chart library is needed. */
export default function BarList({ items }: BarListProps) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="bar-list">
      {items.map((item) => (
        <li key={item.id}>
          <div className="bar-list__row">
            <span className="bar-list__label">{item.label}</span>
            <span className="bar-list__value">{item.display}</span>
          </div>
          <div className="bar-list__track" aria-hidden="true">
            <div
              className="bar-list__bar"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
