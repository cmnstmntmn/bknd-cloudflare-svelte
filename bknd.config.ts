import { withPlatformProxy } from "bknd/adapter/cloudflare/proxy";
import config from "./config";

// export default withPlatformProxy(config);

export default withPlatformProxy(config, {
  useProxy: true,
  proxyOptions: {
    environment: import.meta.env.CLOUDFLARE_ENV,
  },
});
