import { useRef, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { useBusinessStore } from '../../store/BusinessStore';

export default function SettingsPage() {
  const store = useBusinessStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const downloadBackup = () => {
    const blob = new Blob([store.exportWorkspace()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `business-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click(); URL.revokeObjectURL(url); setMessage('Backup downloaded.');
  };
  const restoreBackup = async (file?: File) => {
    if (!file) return;
    try { store.importWorkspace(await file.text()); setMessage('Backup restored successfully.'); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not restore this backup.'); }
    if (fileRef.current) fileRef.current.value = '';
  };
  const reset = () => {
    if (window.confirm('Replace all current records with the original example workspace? Download a backup first if you need these records.')) { store.resetWorkspace(); setMessage('Starter example records restored.'); }
  };
  const clear = () => {
    if (window.confirm('Permanently clear all orders, products, customers, payments and expenses from this browser? Download a backup first if needed.')) { store.clearWorkspace(); setMessage('Workspace cleared. You can now enter your own business records.'); }
  };
  return <>
    <PageHeader title="Settings" description="Manage workspace data, backups and business configuration." />
    <section className="panel record-manager"><h2 className="panel__title">Workspace data</h2><p className="panel__description">Records are saved in this browser on this device. They are not synced to an online account or shared with other devices. Starter example records are preloaded; clear them before entering your own business information.</p>
      <div className="record-form__actions"><button className="btn btn--primary" type="button" onClick={downloadBackup}>Download backup</button><button className="btn btn--secondary" type="button" onClick={() => fileRef.current?.click()}>Restore backup</button><input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(event) => void restoreBackup(event.target.files?.[0])} /><button className="btn btn--secondary" type="button" onClick={clear}>Clear all records</button><button className="btn btn--secondary" type="button" onClick={reset}>Restore example records</button></div>
      {message && <p role="status" className="panel__description" style={{ marginTop: 12 }}>{message}</p>}
    </section>
    <section className="panel record-manager"><h2 className="panel__title">Team access and security</h2><p className="panel__description">Team invitations, employee accounts, role permissions and secure sign-in require a server-side database and authentication. They are not enabled in this local version. Do not use this browser-only workspace for confidential or regulated business records.</p></section>
    <section className="panel record-manager"><h2 className="panel__title">Payment methods</h2><p className="panel__description">Cash on delivery, bank transfer, Easypaisa, JazzCash and card payments can be recorded manually. The app does not connect to payment providers or automatically verify transfers.</p></section>
  </>;
}
