import { redirect } from 'next/navigation';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { LoginForm } from '@/components/auth/login-form';

export default async function LoginPage() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-6 font-serif text-3xl">Log in</h1>
      <p className="mb-8 text-sm text-ink-soft">
        Welcome back. Enter your email and password to continue.
      </p>
      <LoginForm />
    </main>
  );
}
