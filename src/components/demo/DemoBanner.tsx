import Icon from '../ui/Icon';

export default function DemoBanner() {
  return <div className="demo-banner" role="note"><Icon name="info" size={18} /><p><strong>Starter example records are preloaded.</strong> Clear them in Settings before entering your own business data. Records are saved only in this browser and are not synced to an account.</p></div>;
}