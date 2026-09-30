import { redirect } from 'next/navigation';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { RegisterForm } from '@/components/auth/register-form';

export default async function RegisterPage() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-6 font-serif text-3xl">Create your account</h1>
      <p className="mb-8 text-sm text-ink-soft">
        Use your email and a password to create a Timezone account.
      </p>
      <RegisterForm />
    </main>
  );
}
