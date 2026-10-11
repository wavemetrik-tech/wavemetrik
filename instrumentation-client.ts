import { loadPostHog } from "@/lib/posthog";

// Analytics starts once the page has loaded and the browser has a spare
// moment, so it never competes with the page itself. See `lib/posthog.ts`
// for how it is configured.
const start = () => {
  loadPostHog()?.catch(() => {});
};
const whenIdle = () => {
  if ("requestIdleCallback" in window)
    window.requestIdleCallback(start, { timeout: 3000 });
  else setTimeout(start, 1500);
};

if (document.readyState === "complete") whenIdle();
else window.addEventListener("load", whenIdle, { once: true });
