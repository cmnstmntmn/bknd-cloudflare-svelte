import { createRuntimeApp } from "bknd/adapter";
import config from "../bknd.config";
import type { ApiOptions } from "bknd/client";
import type { App } from "bknd";

let app: App;
export async function getApp() {
  if (!app) {
    app = await createRuntimeApp(
      {
        ...config,
        adminOptions: {
          adminBasepath: "/admin",
          logoReturnPath: "/../",
        },
      },
      import.meta.env,
    );
  }
  return app;
}

export async function getApi(options: ApiOptions = {}, verify = false) {
  const app = await getApp();
  const api = app.getApi(options);

  if (verify && options.headers) {
    await api.verifyAuth();
  }
  return api;
}
