import type { RequestHandler } from "./$types";
import { getApp } from "../../../bknd";

const handler: RequestHandler = async ({ request }) => {
  const app = await getApp();
  return app.fetch(request);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
export const HEAD = handler;
