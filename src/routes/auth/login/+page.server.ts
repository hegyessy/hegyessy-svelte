import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	// Redirect already-authenticated users away from the login page.
	if (user) throw redirect(303, '/dashboard');
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase }, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			// Surface Supabase's message as-is — it uses the same text for wrong
			// email and wrong password, preventing user enumeration.
			return fail(400, { error: error.message });
		}

		// Validate redirectTo to prevent open redirect attacks.
		const redirectTo = url.searchParams.get('redirectTo');
		const safeRedirect = redirectTo?.startsWith('/') ? redirectTo : '/dashboard';
		throw redirect(303, safeRedirect);
	}
};
