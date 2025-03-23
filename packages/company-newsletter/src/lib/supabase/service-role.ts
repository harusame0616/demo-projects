import { createClient as supabaseJsCreateClient } from "@supabase/supabase-js";

export function createClientServiceRole() {
	return supabaseJsCreateClient(
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);
}
