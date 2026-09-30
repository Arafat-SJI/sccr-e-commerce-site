'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session) {
        router.push('/');
        return;
      }

      // If for some reason there is no error and no session
      setError('Unable to sign in.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong while signing in.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form space-y-5" noValidate>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
      </div>

      {error && (
        <p role="alert" aria-live="polite" className="text-sm text-error">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <Link
          href="/register"
          className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          Create account
        </Link>
      </div>
    </form>
  );
}
