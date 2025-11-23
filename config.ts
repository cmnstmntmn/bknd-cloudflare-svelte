import { em, entity, text, boolean } from "bknd";
import {
  d1,
  devFsWrite,
  type CloudflareBkndConfig,
} from "bknd/adapter/cloudflare";
import { secureRandomString } from "bknd/utils";
import { syncTypes, cloudflareImageOptimization } from "bknd/plugins";

const schema = em({
  todos: entity("todos", {
    title: text(),
    done: boolean(),
  }),
});

export default {
  d1: {
    session: true,
  },
  buildConfig: {
    // this instructs the build command to always perform a db sync.
    // if you have CI/CD in place, you'd want to perform the sync on the CI/CD server instead using `npx bknd sync`
    sync: true,
  },
  app: (env) => {
    return {
      // in production mode, we use the appconfig.json file as static config
      config: {
        data: schema,
        server: {
          mcp: {
            enabled: true,
          },
        },
        auth: {
          enabled: false,
          jwt: {
            issuer: "domzz",
            secret: env.SECRET ?? secureRandomString(64),
          },
          guard: { enabled: env.ENVIRONMENT !== "development" },
          roles: {
            EDITOR: {
              is_default: true,
              implicit_allow: false,
              permissions: [
                "system.access.api",
                "media.file.read",
                "data.entity.read",
              ],
            },
            ADMIN: {
              implicit_allow: true,
            },
          },
        },
        media: {
          enabled: true,
          adapter: {
            type: "r2",
            config: {
              binding: "BUCKET",
            },
          },
        },
      },
      options: {
        mode: "code",
        plugins: [
          cloudflareImageOptimization({
            accessUrl: "/api/_plugin/image/optimize",
            explain: true,
          }),
        ],
      },
      onBuilt: async (app) => {
        console.log("On build");
      },
    };
  },

  // remove "<any>" once you added the env variables
  // wrangler types should properly type it
} satisfies CloudflareBkndConfig<any>;
