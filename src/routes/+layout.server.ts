import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, locals: { supabase } }) => {
	// Declare a dependency so onAuthStateChange can invalidate this load.
	depends('supabase:auth');

	// getSession() is safe here — hooks.server.ts has already validated the JWT
	// via getUser() before this load runs.
	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { session };
};
