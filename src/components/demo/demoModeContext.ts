import { createContext } from 'react';

export interface DemoModeContextValue {
  /** True when create, edit and delete actions must stay switched off. */
  isReadOnly: boolean;
  /** Explains why an action is unavailable. Pass the action's name if known. */
  blockAction: (actionLabel?: string) => void;
}

export const DemoModeContext = createContext<DemoModeContextValue | null>(null);
