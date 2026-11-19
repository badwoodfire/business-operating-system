import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  numeric?: boolean;
  strong?: boolean;
  /** Right-aligned cell for row buttons; the header is visually hidden. */
  actions?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

/**
 * Read-only table. Reuses the `.data-table` styles, which turn each row into a
 * labelled card on small screens.
 */
export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'Nothing to show yet.',
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={column.numeric ? 'data-table__numeric' : undefined}
              >
                {column.actions ? (
                  <span className="visually-hidden">{column.header}</span>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => {
                const classes = [
                  column.numeric ? 'data-table__numeric' : '',
                  column.strong ? 'data-table__strong' : '',
                  column.actions ? 'data-table__actions' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <td
                    key={column.key}
                    data-label={column.actions ? undefined : column.header}
                    className={classes || undefined}
                  >
                    {column.render(row)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
