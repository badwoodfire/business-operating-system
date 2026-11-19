import { useContext } from 'react';
import {
  DemoModeContext,
  type DemoModeContextValue,
} from '../components/demo/demoModeContext';

export function useDemoMode(): DemoModeContextValue {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used inside <DemoModeProvider>.');
  }
  return context;
}
