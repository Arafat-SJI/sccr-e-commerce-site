import { createClient as createServerClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/site-header';

export async function SiteHeaderWrapper() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SiteHeader user={user ?? null} />;
}
