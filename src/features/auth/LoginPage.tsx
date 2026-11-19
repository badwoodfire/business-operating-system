import { useEffect } from 'react';
import Icon from '../../components/ui/Icon';
import { APP_NAME } from '../../config/app';
import './auth.css';

interface LoginPageProps {
  /** Returns to the read-only demo. */
  onBackToDemo: () => void;
}

/**
 * Sign-in screen for the future registered-user experience.
 *
 * There is no authentication yet, so this screen is a preview only: every field
 * is switched off, nothing can be typed, and nothing is sent, stored or checked.
 * When real sign-in is built, replace the disabled <fieldset> with a working form.
 */
export default function LoginPage({ onBackToDemo }: LoginPageProps) {
  useEffect(() => {
    document.title = `Sign in · ${APP_NAME}`;
  }, []);

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card__brand">
          <span className="sidebar__logo" aria-hidden="true">
            B
          </span>
          <strong>{APP_NAME}</strong>
        </div>

        <h1 id="auth-title" className="auth-card__title">
          Sign in
        </h1>
        <p className="auth-card__subtitle">
          Welcome back. Sign in to manage your own business.
        </p>

        <p id="auth-notice" className="auth-notice" role="note">
          <Icon name="lock" size={18} />
          <span>
            Accounts are not available yet. This is a preview of the sign-in
            screen: the fields are switched off, and nothing you do here is sent
            or saved.
          </span>
        </p>

        <form
          className="auth-form"
          aria-describedby="auth-notice"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <fieldset className="auth-form__fields" disabled>
            <legend className="visually-hidden">
              Sign-in form (not available yet)
            </legend>
            <div className="field">
              <label className="field__label" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                className="field__input"
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                className="field__input"
                type="password"
                placeholder="••••••••"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn--primary btn--block">
              Sign in
            </button>
          </fieldset>
        </form>

        <div className="auth-divider" role="separator">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={onBackToDemo}
        >
          Explore the demo
          <Icon name="arrowRight" size={16} />
        </button>
        <p className="auth-card__hint">
          No account needed. The demo uses sample data and is read-only.
        </p>
      </section>
    </main>
  );
}
