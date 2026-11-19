import { DEMO_WORKSPACE_LABEL } from '../../config/demo';
import { DEMO_DATA_NOTICE } from '../../data/demoData';
import Icon from '../ui/Icon';

/** Shown at the top of every page so demo data is never mistaken for real data. */
export default function DemoBanner() {
  return (
    <div className="demo-banner" role="note">
      <Icon name="lock" size={18} />
      <p>
        <strong>{DEMO_WORKSPACE_LABEL}.</strong> {DEMO_DATA_NOTICE}
      </p>
    </div>
  );
}
