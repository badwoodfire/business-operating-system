/**
 * Demo-mode settings.
 *
 * Business OS currently ships as a public, read-only demo: there are no
 * accounts and no database, and every figure on screen is sample data.
 *
 * `IS_DEMO_MODE` is the single switch the UI checks. When real authentication
 * exists, replace it with "is this a signed-in user's real workspace?" and the
 * locked buttons (see components/demo/ActionButton.tsx) become normal buttons.
 */
export const IS_DEMO_MODE = true;

export const DEMO_WORKSPACE_LABEL = 'Demo workspace';

export const DEMO_ACCESS_TITLE = 'Full access needs an account';

export const DEMO_ACCESS_MESSAGE =
  'Full access, including creating, editing and deleting, will be available with an account. This demo is read-only and uses sample data.';
