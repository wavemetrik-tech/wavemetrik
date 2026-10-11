import { loadPostHog } from "@/lib/posthog";

type LogAttributes = Record<string, string | undefined>;

// This dedicated logger exports only the purpose-written lines in this file's
// call sites. Existing console output remains local to the browser.
export const posthogLog = {
  info(body: string, attributes?: LogAttributes) {
    loadPostHog()
      ?.then((posthog) => posthog.logger.info(body, attributes))
      .catch(() => {});
  },
};
