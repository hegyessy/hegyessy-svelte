import { createSupabaseServerClient } from '$lib/server/supabase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event.cookies);

	// getUser() validates the JWT with Supabase's servers — safe for auth checks.
	// Never use getSession() server-side for authorization decisions.
	const {
		data: { user }
	} = await event.locals.supabase.auth.getUser();
	event.locals.user = user;

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
