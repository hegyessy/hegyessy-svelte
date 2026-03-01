import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (!code) throw redirect(303, '/auth/login?error=missing_code');

	// @supabase/ssr uses PKCE by default — exchangeCodeForSession validates
	// the state param and prevents CSRF. Do not change the default flowType.
	const { error } = await supabase.auth.exchangeCodeForSession(code);
	if (error) throw redirect(303, '/auth/login?error=auth_failed');

	throw redirect(303, '/dashboard');
};
