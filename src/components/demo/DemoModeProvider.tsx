import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  DEMO_ACCESS_MESSAGE,
  DEMO_ACCESS_TITLE,
  IS_DEMO_MODE,
} from '../../config/demo';
import Icon from '../ui/Icon';
import { DemoModeContext, type DemoModeContextValue } from './demoModeContext';

interface DemoModeProviderProps {
  /** Opens the sign-in screen. */
  onSignIn: () => void;
  children: ReactNode;
}

interface DialogState {
  isOpen: boolean;
  actionLabel: string;
}

/**
 * Makes demo mode available to the whole app and owns the single dialog that
 * explains why an action is unavailable. It uses the native <dialog> element,
 * so focus handling and the Escape key work without extra code or libraries.
 */
export default function DemoModeProvider({
  onSignIn,
  children,
}: DemoModeProviderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    actionLabel: '',
  });

  const blockAction = useCallback((actionLabel = '') => {
    setDialog({ isOpen: true, actionLabel });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog((current) => ({ ...current, isOpen: false }));
  }, []);

  // Keep the native dialog in sync with React state.
  useEffect(() => {
    const element = dialogRef.current;
    if (!element) return;
    if (dialog.isOpen && !element.open) {
      element.showModal();
    } else if (!dialog.isOpen && element.open) {
      element.close();
    }
  }, [dialog.isOpen]);

  const handleSignIn = () => {
    closeDialog();
    onSignIn();
  };

  const value = useMemo<DemoModeContextValue>(
    () => ({ isReadOnly: IS_DEMO_MODE, blockAction }),
    [blockAction],
  );

  return (
    <DemoModeContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className="demo-dialog"
        aria-labelledby="demo-dialog-title"
        aria-describedby="demo-dialog-text"
        onClose={closeDialog}
        onClick={(event) => {
          // A click on the backdrop targets the <dialog> itself.
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="demo-dialog__body">
          <span className="demo-dialog__icon" aria-hidden="true">
            <Icon name="lock" size={22} />
          </span>
          <h2 id="demo-dialog-title" className="demo-dialog__title">
            {DEMO_ACCESS_TITLE}
          </h2>
          <p id="demo-dialog-text" className="demo-dialog__text">
            {dialog.actionLabel ? (
              <>
                <strong>{dialog.actionLabel}</strong> is turned off in the demo.{' '}
              </>
            ) : null}
            {DEMO_ACCESS_MESSAGE}
          </p>
          <div className="demo-dialog__actions">
            <button type="button" className="btn btn--primary" onClick={closeDialog}>
              Keep exploring
            </button>
            <button type="button" className="btn btn--secondary" onClick={handleSignIn}>
              Go to sign-in
            </button>
          </div>
        </div>
      </dialog>
    </DemoModeContext.Provider>
  );
}
