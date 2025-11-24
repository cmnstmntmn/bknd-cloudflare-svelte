import type { RequestHandler } from "./$types";
import { getApp } from "../../../bknd";

const handler: RequestHandler = async ({ request, platform }) => {
  console.log(platform.evn);

  const app = await getApp(platform.env);
  return app.fetch(request);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
export const HEAD = handler;
