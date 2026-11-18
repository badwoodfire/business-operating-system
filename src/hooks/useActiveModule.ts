import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_MODULE, isModuleId } from '../config/navigation';
import type { ModuleId } from '../types';

function readModuleFromHash(): ModuleId {
  const value = window.location.hash.replace(/^#\/?/, '');
  return isModuleId(value) ? value : DEFAULT_MODULE;
}

/**
 * Lightweight hash-based navigation (e.g. "#/orders") so every module has a
 * shareable URL without adding a routing dependency. Swap for a full router
 * later if the product needs nested routes.
 */
export function useActiveModule(): [ModuleId, (id: ModuleId) => void] {
  const [activeModule, setActiveModule] = useState<ModuleId>(readModuleFromHash);

  useEffect(() => {
    const handleHashChange = () => setActiveModule(readModuleFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((id: ModuleId) => {
    window.location.hash = `/${id}`;
  }, []);

  return [activeModule, navigate];
}
