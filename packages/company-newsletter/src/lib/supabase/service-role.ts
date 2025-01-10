import { createClient as supabaseJsCreateClient } from "@supabase/supabase-js";

export function createClientServiceRole() {
  return supabaseJsCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
