import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    headers: locals?.headers
      ? Object.fromEntries(locals.headers.entries())
      : {},
  };
};
