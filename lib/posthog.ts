import type { PostHog } from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let loading: Promise<PostHog> | undefined;
let warned = false;

// PostHog, downloaded and started the first time it is asked for. The
// library is a separate file, fetched once the page has loaded
// (`instrumentation-client.ts`) or when the first event is sent, so a page
// does not wait for it. Without both variables there is no analytics: this
// returns nothing, and every caller below does nothing.
export function loadPostHog(): Promise<PostHog> | undefined {
  if (typeof window === "undefined") return undefined;
  if (!projectToken || !host) {
    if (process.env.NODE_ENV === "development" && !warned) {
      warned = true;
      console.warn(
        "PostHog is off: set NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN and NEXT_PUBLIC_POSTHOG_HOST in .env.local to send events.",
      );
    }
    return undefined;
  }
  loading ??= import("posthog-js").then(({ default: posthog }) => {
    posthog.init(projectToken, {
      api_host: host,
      defaults: "2026-01-30",
      // No cookie and nothing kept in the browser's storage. Visitors are
      // counted by a hash made on PostHog's servers that changes every day.
      // It needs "Cookieless server hash mode" switched on in the PostHog
      // project, under Settings > Web analytics. The privacy policy says the
      // site sets no cookies: change that page if this line changes.
      cookieless_mode: "always",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
    return posthog;
  });
  return loading;
}

// A failed download of the library must not surface as an error on the page.
const ignore = () => {};

// Sends an event. Properties are fixed labels (a kind of enquiry, a document,
// a product), never anything a visitor typed.
export function capture(
  event: string,
  properties?: Record<string, string | undefined>,
) {
  loadPostHog()
    ?.then((posthog) => posthog.capture(event, properties))
    .catch(ignore);
}

export function captureException(error: unknown) {
  loadPostHog()
    ?.then((posthog) => posthog.captureException(error))
    .catch(ignore);
}
