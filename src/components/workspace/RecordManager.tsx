import { useState, type FormEvent } from 'react';

export interface RecordField { name: string; label: string; type?: 'text' | 'number' | 'date' | 'select'; required?: boolean; options?: { value: string; label: string }[]; }
export interface RecordColumn { key: string; label: string; }
export type ManagedRecord = { id: string };

interface RecordManagerProps<T extends ManagedRecord> {
  title: string; description: string; createLabel: string; fields: RecordField[]; columns: RecordColumn[];
  rows: T[]; onSave: (values: Record<string, string | number>, id?: string) => void; onDelete: (id: string) => void;
}

export default function RecordManager<T extends ManagedRecord>({ title, description, createLabel, fields, columns, rows, onSave, onDelete }: RecordManagerProps<T>) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | undefined>();
  const [values, setValues] = useState<Record<string, string>>({});
  const beginCreate = () => { setEditing(undefined); setValues(Object.fromEntries(fields.map((field) => [field.name, '']))); setOpen(true); };
  const beginEdit = (row: T) => {
    const record = row as Record<string, unknown>;
    setEditing(row.id);
    setValues(Object.fromEntries(fields.map((field) => [field.name, String(record[field.name] ?? '')])));
    setOpen(true);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result: Record<string, string | number> = {};
    for (const field of fields) { const value = values[field.name] ?? ''; result[field.name] = field.type === 'number' ? Number(value) : value; }
    onSave(result, editing); setOpen(false); setEditing(undefined);
  };
  return <section className="panel record-manager">
    <div className="panel__header"><div><h2 className="panel__title">{title}</h2><p className="panel__description">{description}</p></div><button className="btn btn--primary" type="button" onClick={beginCreate}>{createLabel}</button></div>
    {open && <form className="record-form" onSubmit={submit}>
      <h3>{editing ? 'Edit record' : createLabel}</h3>
      <div className="record-form__grid">{fields.map((field) => <label className="record-field" key={field.name}><span>{field.label}</span>
        {field.type === 'select' ? <select required={field.required !== false} value={values[field.name] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}><option value="">Choose…</option>{(field.options ?? []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input required={field.required !== false} type={field.type ?? 'text'} min={field.type === 'number' ? 0 : undefined} step={field.type === 'number' ? 'any' : undefined} value={values[field.name] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} />}
      </label>)}</div>
      <div className="record-form__actions"><button className="btn btn--primary" type="submit">{editing ? 'Save changes' : 'Save record'}</button><button className="btn btn--secondary" type="button" onClick={() => setOpen(false)}>Cancel</button></div>
    </form>}
    {rows.length === 0 ? <p className="empty-state">No records yet. Add your first one above.</p> : <div className="table-scroll"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Actions</th></tr></thead><tbody>{rows.map((row) => { const record = row as Record<string, unknown>; return <tr key={row.id}>{columns.map((column) => <td key={column.key} data-label={column.label}>{String(record[column.key] ?? '')}</td>)}<td className="data-table__actions"><div className="row-actions"><button className="btn btn--ghost btn--icon" type="button" aria-label={`Edit ${row.id}`} onClick={() => beginEdit(row)}>Edit</button><button className="btn btn--ghost btn--icon" type="button" aria-label={`Delete ${row.id}`} onClick={() => { if (window.confirm('Delete this record? This cannot be undone.')) onDelete(row.id); }}>Delete</button></div></td></tr>; })}</tbody></table></div>}
  </section>;
}
