# Theme summary
Next.js 16.4, React 19.3, Tailwind 4; custom SVG drawings and shadcn/Base UI controls.
Brand/logo/buttons #115aa9; hover brand mixed 88% with black; white button text.
Light: white background, #1d1d1f foreground, #f5f5f7 muted panels, #515154 secondary text.
Dark: black background, #f5f5f7 foreground, #1d1d1f panels, #aeaeb2 secondary text; links use brand 55% mixed with white.
Fonts: Apple system sans, Inter fallback; system monospace for technical annotations.
Type: body 17px, subhead 15px, footnote 13px, caption 12px; headings use tight tracking.
Spacing: 4px increments; page content max-width 1120px; responsive section padding.
Radii: 28px outer tiles, 18px nested surfaces; no heavy shadows. Breakpoints: 640, 768, 1024, 1280px.
Motion: existing PageFrame handles viewport reveals; respect reduced motion; no added client JS needed.

# Raw theme sources
## app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/* Apple HIG text styles (iOS default sizes), in rem so they follow the reader's text size. */
@theme {
  --text-large-title: 2.125rem;
  --text-large-title--line-height: 2.5625rem;
  --text-title-1: 1.75rem;
  --text-title-1--line-height: 2.125rem;
  --text-title-2: 1.375rem;
  --text-title-2--line-height: 1.75rem;
  --text-title-3: 1.25rem;
  --text-title-3--line-height: 1.5625rem;
  --text-headline: 1.0625rem;
  --text-headline--line-height: 1.375rem;
  --text-headline--font-weight: 600;
  --text-body: 1.0625rem;
  --text-body--line-height: 1.375rem;
  --text-callout: 1rem;
  --text-callout--line-height: 1.3125rem;
  --text-subhead: 0.9375rem;
  --text-subhead--line-height: 1.25rem;
  --text-footnote: 0.8125rem;
  --text-footnote--line-height: 1.125rem;
  --text-caption-1: 0.75rem;
  --text-caption-1--line-height: 1rem;
  --text-caption-2: 0.6875rem;
  --text-caption-2--line-height: 0.8125rem;

  /* Moves a dashed stroke along its path. Dash patterns must repeat every 12. */
  --animate-signal: signal 1.8s linear infinite;

  @keyframes signal {
    to {
      stroke-dashoffset: -24;
    }
  }

  /* One carrier lighting up at a time. Stagger with animation-delay. */
  --animate-hop: hop 2.8s ease-in-out infinite;

  @keyframes hop {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
}

@keyframes frames {
  to {
    transform: translateX(calc(-1 * var(--frames-period)));
  }
}

@theme inline {
  /* A row of evenly spaced items sliding past. On the row, set
     --frames-period to the distance from one item to the next and
     --frames-duration to the time that takes. The row stands still until
     --frames-state is set to running. It is inline so that those are read
     from the row and not from the root. */
  --animate-frames: frames var(--frames-duration, 1s) linear infinite
    var(--frames-state, paused);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* SF Pro on Apple devices; Inter (with optical sizing) everywhere else. */
  --font-sans:
    -apple-system, BlinkMacSystemFont, var(--font-inter), "Helvetica Neue",
    Arial, sans-serif;
  --font-mono:
    ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
  --font-heading:
    -apple-system, BlinkMacSystemFont, var(--font-inter), "Helvetica Neue",
    Arial, sans-serif;
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-tertiary-foreground: var(--tertiary-foreground);
  --color-surface-tint: var(--surface-tint);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-brand: var(--brand);
  --color-link: var(--link);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  /* Tiles are rounded-3xl (28px); what sits inside a tile is rounded-2xl. */
  --radius-2xl: 1.125rem;
  --radius-3xl: 1.75rem;
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  /* Text and surfaces follow Apple's label/background hierarchy. */
  /* The page is white and tiles are one step off it (1.09:1), as on
     apple.com. On the tile: foreground 15.5:1, muted-foreground 7.3:1. */
  --background: #ffffff;
  --foreground: #1d1d1f;
  --card: #ffffff;
  --card-foreground: #1d1d1f;
  --popover: #ffffff;
  --popover-foreground: #1d1d1f;
  /* The logo blue is shared by buttons, links, and illustration accents. */
  --brand: #115aa9;
  --link: var(--brand);
  --surface-outline: #e0e0e5;
  --surface-tint: var(--muted);
  --control-border: #86868b;
  --tertiary-foreground: #68686d;

  --primary: var(--brand);
  --primary-hover: color-mix(in srgb, var(--brand) 88%, #000000);
  --primary-foreground: #ffffff;
  --secondary: #f5f5f7;
  --secondary-foreground: #1d1d1f;
  --muted: #f5f5f7;
  --muted-foreground: #515154;
  --accent: #f5f5f7;
  --accent-foreground: #1d1d1f;
  --destructive: oklch(0.577 0.245 27.325);
  --border: #d8d8dd;
  --input: #d1d1d6;
  --ring: oklch(0.708 0 0);
  --chart-1: var(--brand);
  --chart-2: #eb6834;
  --chart-3: #1baf7a;
  --chart-4: #eda100;
  --chart-5: oklch(0.269 0 0);
  /* One-hue steps for series that have an order (attenuation, client count):
     1 is the least, 5 the most. Each step is at least 0.06 OKLCH lightness
     from the next and the lightest is 2.3:1 on --muted, where charts sit. */
  --ramp-1: #6da7ec;
  --ramp-2: #3987e5;
  --ramp-3: #256abf;
  --ramp-4: #184f95;
  --ramp-5: #0d366b;
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: var(--brand);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  /* A lighter tint of the logo blue keeps links readable on dark surfaces. */
  --link: color-mix(in srgb, var(--brand) 55%, #ffffff);
  --surface-outline: #2c2c2e;
  --surface-tint: var(--muted);
  --control-border: #747478;
  --tertiary-foreground: #8e8e93;

  /* Contrast on --background: foreground 19.3:1, muted-foreground 9.5:1.
     On the tile (--muted): 15.5:1 and 7.6:1. */
  --background: #000000;
  --foreground: #f5f5f7;
  --card: #161617;
  --card-foreground: #f5f5f7;
  --popover: #1c1c1e;
  --popover-foreground: #f5f5f7;
  --primary: var(--brand);
  --primary-foreground: #ffffff;
  --secondary: #2c2c2e;
  --secondary-foreground: #f5f5f7;
  --muted: #1d1d1f;
  --muted-foreground: #aeaeb2;
  --accent: #2c2c2e;
  --accent-foreground: #f5f5f7;
  --destructive: oklch(0.704 0.191 22.216);
  --border: #343437;
  --input: #3a3a3c;
  --ring: oklch(0.556 0 0);
  --chart-1: var(--brand);
  --chart-2: #d95926;
  --chart-3: #199e70;
  --chart-4: #c98500;
  --chart-5: oklch(0.269 0 0);
  /* In the dark the order runs dark to light, and the darkest step is 2.6:1
     on --muted. */
  --ramp-1: #256abf;
  --ramp-2: #3987e5;
  --ramp-3: #6da7ec;
  --ramp-4: #9ec5f4;
  --ramp-5: #cde2fb;
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: var(--brand);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
    /* Links to a place on the page stop below the sticky header. */
    scroll-padding-top: 9.5rem;
  }
}

@layer base {
  body {
    font-optical-sizing: auto;
    -webkit-tap-highlight-color: transparent;
  }
  :where(a, button, input, select, textarea, [tabindex]):focus-visible {
    outline: 2px solid var(--link);
    outline-offset: 4px;
  }
  ::selection {
    background: color-mix(in srgb, var(--brand) 22%, transparent);
  }
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }
}

@layer components {
  .page-container,
  .page-section,
  .page-hero {
    width: 100%;
    max-width: 76rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4vw, 3rem);
  }
  .page-section {
    padding-block: clamp(3.5rem, 7vw, 6.5rem);
    scroll-margin-top: 1rem;
  }
  .page-hero {
    padding-top: clamp(3rem, 6vw, 5.5rem);
    padding-bottom: clamp(3.5rem, 6vw, 5.5rem);
  }
  .section-flush-top {
    padding-top: 0;
  }
  .page-shell {
    min-width: 0;
  }
  .page-shell :where(h1, h2, h3) {
    overflow-wrap: break-word;
  }
  .page-title {
    font-size: clamp(2.75rem, 6.5vw, 5.25rem);
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.035em;
    text-wrap: balance;
  }
  .product-title {
    font-size: clamp(2.375rem, 4.4vw, 3.75rem);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.035em;
  }
  .product-subtitle {
    max-width: 23ch;
    font-size: clamp(1.375rem, 2.25vw, 1.875rem);
    line-height: 1.3;
    letter-spacing: -0.025em;
    font-weight: 500;
    text-wrap: balance;
  }
  .section-heading {
    font-size: clamp(1.875rem, 3.2vw, 2.75rem);
    line-height: 1.12;
    letter-spacing: -0.028em;
    font-weight: 600;
    text-wrap: balance;
  }
  /* The small label above a heading: a quiet grey, never a color. */
  .eyebrow {
    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.01em;
    color: var(--tertiary-foreground);
  }
  .surface-panel {
    border: 1px solid transparent;
    transition: border-color 0.25s ease;
  }
  .surface-panel:focus-within {
    border-color: color-mix(in srgb, var(--brand) 50%, var(--surface-outline));
  }
  .product-page > .page-section + .page-section {
    border-top: 1px solid color-mix(in srgb, var(--border) 65%, transparent);
  }
  .product-page .page-hero > .grid > figure {
    background: var(--muted);
  }
  .headline-specs {
    border-radius: 1.75rem;
    background: var(--muted);
    overflow: hidden;
    --surface-outline: var(--border);
  }
  .headline-specs > div {
    min-width: 0;
    padding: 1.25rem;
  }
  .headline-specs > div:nth-child(even) {
    border-left: 1px solid var(--surface-outline);
  }
  .headline-specs > div:nth-child(n + 3) {
    border-top: 1px solid var(--surface-outline);
  }
  .product-nav {
    position: sticky;
    top: 4rem;
    z-index: 20;
    border-block: 1px solid var(--border);
    background: color-mix(in srgb, var(--background) 94%, transparent);
    backdrop-filter: blur(16px);
  }
  .product-nav-link {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 3.5rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--muted-foreground);
    transition: color 0.2s;
  }
  .product-nav-link::after {
    content: "";
    position: absolute;
    inset: auto 0 -1px;
    height: 2px;
    background: var(--link);
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }
  .product-nav-link:hover,
  .product-nav-link.is-active {
    color: var(--link);
  }
  .product-nav-link.is-active::after {
    transform: scaleX(1);
  }
  .signal-panel > svg {
    pointer-events: none;
    transform-origin: top right;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .signal-panel:hover > svg {
    transform: scale(1.035);
  }
  .signal-panel.bg-muted > svg circle {
    stroke: color-mix(in srgb, var(--brand) 32%, transparent);
  }
  .illustration-art > svg {
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .illustration-art:hover > svg {
      transform: translateY(-3px);
    }
  }
  .expertise-card {
    min-width: 0;
    border-radius: 1.75rem;
    padding: 0.75rem;
    background: var(--muted);
  }
  /* Its drawing sits on a white plate inside the tile. */
  .expertise-card .illustration-art {
    background: var(--background);
  }
  /* A tile that is a link grows a touch under the pointer, as a card you
     could pick up. */
  :is(
      .home-product-card,
      .home-guide,
      .resource-card,
      .solution-card:not(.home-application)
    ) {
    transition:
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.3s ease;
  }
  @media (hover: hover) and (pointer: fine) {
    :is(
        .home-product-card,
        .home-guide,
        .resource-card,
        .solution-card:not(.home-application)
      ):hover {
      transform: scale(1.012);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    :is(.home-product-card, .home-guide, .resource-card, .solution-card) {
      transform: none !important;
    }
  }
  .contact-form-panel {
    padding: clamp(1.5rem, 4vw, 2.5rem);
    border-radius: 1.75rem;
    background: var(--muted);
  }
  /* Form fields (components/form-field.tsx), after Apple's: the label rests inside the
     field and moves to its top edge on focus or once there is a value. */
  .input-field {
    position: relative;
    min-width: 0;
  }
  .input-control {
    display: block;
    width: 100%;
    height: 3.5rem;
    padding: 1.5rem 1rem 0.375rem;
    border: 1px solid var(--control-border);
    border-radius: 0.75rem;
    background: var(--background);
    color: var(--foreground);
    font-size: 1.0625rem;
    line-height: 1.375rem;
    appearance: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }
  .input-area {
    height: auto;
    min-height: 9.5rem;
    padding-top: 1.75rem;
    resize: vertical;
  }
  .input-label {
    position: absolute;
    top: 1.0625rem;
    left: 1rem;
    max-width: calc(100% - 2rem);
    overflow: hidden;
    color: var(--tertiary-foreground);
    font-size: 1.0625rem;
    line-height: 1.375rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    transform-origin: left top;
    transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .input-control:focus + .input-label,
  .input-control:not(:placeholder-shown) + .input-label,
  .input-control:autofill + .input-label,
  .input-field[data-filled] .input-label {
    max-width: calc((100% - 2rem) / 0.706);
    transform: translateY(-0.5625rem) scale(0.706);
  }
  @media (hover: hover) {
    .input-control:hover {
      border-color: var(--muted-foreground);
    }
  }
  .input-control:focus {
    border-color: var(--primary);
    box-shadow:
      0 0 0 1px var(--primary),
      0 0 0 4px color-mix(in srgb, var(--primary) 22%, transparent);
    outline: none;
  }
  .input-control:user-invalid {
    border-color: var(--destructive);
  }
  .input-control:user-invalid + .input-label {
    color: var(--destructive);
  }
  .contact-method {
    padding: clamp(1.5rem, 3vw, 2rem);
    border-radius: 1.75rem;
    background: var(--muted);
  }
  .contact-method-icon {
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    color: var(--link);
    border-radius: 0.75rem;
    background: var(--background);
  }
  .site-footer {
    margin-top: 2rem;
    background: var(--muted);
  }
  .footer-link {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    border-radius: 0.25rem;
    transition: color 0.2s;
  }
  .footer-link:hover {
    color: var(--link);
  }
  .skip-link {
    position: fixed;
    top: 0.75rem;
    left: 1rem;
    z-index: 100;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    background: var(--foreground);
    color: var(--background);
    transform: translateY(-200%);
  }
  .skip-link:focus {
    transform: translateY(0);
  }
  @media (min-width: 640px) {
    .product-nav {
      top: 4.5rem;
    }
    .headline-specs > div {
      padding: 1.5rem;
    }
  }
  @media (min-width: 1024px) {
    .headline-specs > div + div {
      border-left: 1px solid var(--surface-outline);
    }
    .headline-specs > div:nth-child(n + 3) {
      border-top: 0;
    }
  }
}

/* Continuous RF signals run only while their section is near the viewport. */
.page-shell [data-in-view="false"] *,
.site-footer[data-in-view="false"] * {
  animation-play-state: paused !important;
}

/* Motion shared by the drawings. Each is a slow, low-contrast loop that says
   the equipment is on; pointing at a drawing speeds its loops up (see
   PageFrame) and none of them carries information. */
@keyframes fx-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
@keyframes fx-ripple {
  0%,
  100% {
    opacity: var(--fx-rest, 0.35);
  }
  35% {
    opacity: 1;
  }
}
@keyframes fx-drift {
  to {
    transform: translateX(var(--fx-drift, -28px));
  }
}
@keyframes fx-draw {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes fx-rise {
  from {
    opacity: 0;
    transform: translateY(var(--fx-rise, 18px));
  }
}
@keyframes fx-fade {
  from {
    opacity: 0;
  }
}
@keyframes fx-grow {
  from {
    transform: scaleY(0.25);
    opacity: 0.4;
  }
}
@keyframes fx-sweep {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  12%,
  88% {
    opacity: 1;
  }
  100% {
    transform: translateX(var(--fx-sweep, 100px));
    opacity: 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  /* A status light. */
  .fx-pulse {
    animation: fx-pulse 3.2s ease-in-out infinite;
    animation-delay: var(--fx-delay, 0s);
  }
  /* Signal rings or arcs: give each one a later --fx-delay, innermost
     first, and they brighten outward in turn. */
  .fx-ripple {
    animation: fx-ripple 4s ease-in-out infinite both;
    animation-delay: var(--fx-delay, 0s);
  }
  /* A waveform sliding by one period inside a clipping viewport. */
  .fx-drift {
    animation: fx-drift 2.4s linear infinite;
  }
  /* A line with pathLength="1" that draws itself once, when its section
     first comes into view (PageFrame marks the section as seen). In a hero,
     which is on screen from the start, use fx-draw-now. */
  [data-seen] .fx-draw,
  .fx-draw-now {
    stroke-dasharray: 1;
    animation: fx-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--fx-delay, 0.2s);
  }
  /* A part that fades in once, with the same timing rules. */
  [data-seen] .fx-appear,
  .fx-appear-now {
    animation: fx-fade 0.7s ease-out both;
    animation-delay: var(--fx-delay, 0.2s);
  }
  /* A marker crossing a timeline. */
  .fx-sweep {
    animation: fx-sweep 5s linear infinite;
    animation-delay: var(--fx-delay, 0s);
  }
  /* Heroes arrive in reading order as the page opens. It is CSS so nothing
     flashes before it starts. */
  .page-hero .hero-copy > *,
  .page-hero > .grid > :first-child:not(figure) > *,
  .page-hero > :is(p, h1, nav) {
    animation: fx-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  }
  .page-hero .hero-copy > :nth-child(2),
  .page-hero > .grid > :first-child:not(figure) > :nth-child(2),
  .page-hero > :is(p, h1, nav):nth-child(2) {
    animation-delay: 0.07s;
  }
  .page-hero .hero-copy > :nth-child(3),
  .page-hero > .grid > :first-child:not(figure) > :nth-child(3),
  .page-hero > :is(p, h1, nav):nth-child(3) {
    animation-delay: 0.14s;
  }
  .page-hero .hero-copy > :nth-child(4),
  .page-hero > .grid > :first-child:not(figure) > :nth-child(4),
  .page-hero > :is(p, h1, nav):nth-child(4) {
    animation-delay: 0.21s;
  }
  .page-hero .hero-copy > :nth-child(n + 5),
  .page-hero > .grid > :first-child:not(figure) > :nth-child(n + 5) {
    animation-delay: 0.28s;
  }
  .page-hero > .grid > :nth-child(2),
  .page-hero .hero-art {
    --fx-rise: 28px;
    animation: fx-rise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s backwards;
  }
  .page-hero > :is(dl, .grid ~ *),
  .page-hero .hero-foot {
    animation: fx-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s backwards;
  }
}

/* Tiles and cards answer the pointer the same way everywhere: the outline
   takes a little brand color and the drawing inside rises 3px. */
@layer components {
  .fx-tile {
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease,
      background-color 0.3s ease;
  }
  .fx-lift {
    transform-box: fill-box;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .fx-tile:hover {
      border-color: color-mix(in srgb, var(--foreground) 18%, transparent);
    }
    .fx-tile:hover .fx-lift,
    .fx-lift-self:hover {
      transform: translateY(-3px);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .fx-lift,
  .fx-lift-self {
    transform: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .page-shell *,
  .site-footer *,
  header * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .illustration-art > svg,
  .signal-panel > svg {
    transform: none !important;
  }
}
@media (prefers-reduced-transparency: reduce) {
  header,
  .product-nav {
    background: var(--background) !important;
    backdrop-filter: none !important;
  }
}
@media (prefers-contrast: more) {
  :root {
    --surface-outline: var(--muted-foreground);
  }
  .surface-panel {
    border-color: var(--muted-foreground);
  }
}

@layer components {
  .solution-trace {
    transform-box: fill-box;
    transform-origin: center bottom;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .solution-question summary::-webkit-details-marker {
    display: none;
  }
  /* The needle of the About page's dial, never quite still. */
  .dial-needle {
    animation: dial-needle 3.6s ease-in-out infinite;
  }
  @keyframes dial-needle {
    0%,
    100% {
      transform: rotate(-0.9deg);
    }
    50% {
      transform: rotate(0.9deg);
    }
  }
  /* A signal around the device in the solutions hero. The one in focus
     grows a little and takes the brand color; the others step back. */
  .air-node {
    cursor: pointer;
  }
  .air-node-body {
    transform-box: fill-box;
    transform-origin: center;
    transition:
      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.3s ease;
  }
  .air-node-ring {
    transition: stroke 0.3s ease;
  }
  .air-node[data-active="true"] .air-node-body {
    transform: scale(1.12);
  }
  .air-node[data-active="true"] .air-node-ring,
  .air-node:focus-visible .air-node-ring {
    stroke: var(--brand);
  }
  .air-node[data-dimmed="true"] .air-node-body {
    opacity: 0.45;
  }
  @media (hover: hover) and (pointer: fine) {
    .solution-card:hover .solution-trace {
      transform: translateY(-3px);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .input-label {
    transition: none;
  }
  .solution-trace,
  .air-node-body {
    transform: none !important;
  }
  .dial-needle {
    animation: none;
  }
}

@layer components {
  .resource-graphic-part {
    transform-box: fill-box;
    transform-origin: center;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .resource-contents summary::-webkit-details-marker {
    display: none;
  }
  @media (hover: hover) and (pointer: fine) {
    .resource-card:hover .resource-graphic-part,
    .resource-guide-graphic:hover .resource-graphic-part {
      transform: translateY(-3px);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .resource-graphic-part {
    transform: none !important;
  }
}

/* Home: a quiet editorial layout with a connected, hover-only test bench. */
@layer components {
  /* The hero stands on a measurement graticule that continues the header's
     frequency scale and fades out before the first section. */
  .home-hero-band {
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }
  .home-hero-band::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(
        to right,
        color-mix(in srgb, var(--foreground) 5%, transparent) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        color-mix(in srgb, var(--foreground) 5%, transparent) 1px,
        transparent 1px
      );
    background-size: 50px 50px;
    background-position: center top;
    mask-image: radial-gradient(
      ellipse 75% 95% at 72% 0%,
      #000 25%,
      transparent 78%
    );
  }
  .home-hero {
    padding-top: clamp(2.5rem, 5vw, 5rem);
    padding-bottom: clamp(3rem, 5vw, 4.5rem);
  }
  .home-hero-grid {
    display: grid;
    align-items: center;
    gap: 3rem;
  }
  .home-title {
    font-size: clamp(2.5rem, 4.9vw, 4.25rem);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.038em;
    text-wrap: balance;
  }
  .home-title .eyebrow {
    display: block;
    margin-bottom: 1.25rem;
  }
  .home-lab {
    min-width: 0;
  }
  .home-lab-stage {
    position: relative;
  }
  .home-lab-hit {
    fill: transparent;
    stroke: none;
  }
  .home-lab-part {
    transition:
      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.3s ease;
  }
  .home-lab-part[data-dimmed="true"],
  .home-lab-label[data-dimmed="true"] {
    opacity: 0.45;
  }
  .home-lab-cable {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  .home-lab-cable[data-active="true"] {
    opacity: 1;
  }
  .home-lab-cable[data-dimmed="true"] {
    opacity: 0.25;
  }
  .home-lab-label {
    position: absolute;
    pointer-events: none;
    white-space: nowrap;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
    color: var(--muted-foreground);
    transition:
      color 0.3s ease,
      opacity 0.3s ease;
  }
  .home-lab-label[data-active="true"] {
    color: var(--foreground);
  }
  .home-lab-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
    margin-top: 1.75rem;
  }
  .home-lab-chips {
    display: inline-flex;
    max-width: 100%;
    gap: 0.125rem;
    padding: 0.25rem;
    border-radius: 999px;
    background: var(--muted);
  }
  .home-lab-chip {
    min-height: 2.75rem;
    padding-inline: 0.625rem;
    border-radius: 999px;
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 500;
    color: var(--muted-foreground);
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      box-shadow 0.2s ease;
  }
  .home-lab-chip[aria-pressed="true"] {
    color: var(--foreground);
    background: var(--card);
    box-shadow:
      0 0 0 1px var(--surface-outline),
      0 1px 3px color-mix(in srgb, var(--foreground) 10%, transparent);
  }
  .home-lab-caption {
    min-height: 2.5rem;
    max-width: 26rem;
    text-align: center;
    text-wrap: balance;
    font-size: 0.9375rem;
    line-height: 1.25rem;
    color: var(--muted-foreground);
  }
  .home-lab-part[data-active="true"] {
    transform: translateY(-5px);
  }
  .home-specs {
    margin-top: clamp(2.5rem, 5vw, 4rem);
  }
  /* The bench is put together as the page opens: each part in turn, then
     the cables between them. */
  @media (prefers-reduced-motion: no-preference) {
    .home-lab-part {
      animation: fx-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards;
      animation-delay: calc(var(--i, 0) * 0.11s + 0.15s);
    }
    .home-lab-cables,
    .home-lab-label {
      animation: fx-fade 0.8s ease-out 0.8s backwards;
    }
    .home-lab-bar {
      animation: fx-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s backwards;
    }
  }
  .home-hardware,
  .home-evidence-sheet,
  .home-evidence-record {
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .home-section-header {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .home-product-card,
  .home-guide {
    overflow: hidden;
    border-radius: 1.75rem;
    background: var(--muted);
    outline: none;
    transition: background-color 0.3s ease;
  }
  .home-product-card:focus-visible,
  .home-guide:focus-visible,
  .home-application:focus-visible,
  .home-text-link:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 5px;
  }
  .home-system-card {
    display: grid;
  }
  .home-system-copy {
    padding: clamp(1.5rem, 4vw, 3rem);
  }
  .home-system-art {
    display: flex;
    align-items: center;
  }
  .home-product-svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .home-instrument-art {
    padding: 0.5rem 1rem 0;
  }
  .home-instrument-copy {
    padding: 1.5rem clamp(1.5rem, 3vw, 2rem) 2rem;
  }
  .home-card-link,
  .home-text-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9375rem;
    line-height: 1.5rem;
    font-weight: 500;
    color: var(--link);
  }
  .home-text-link {
    min-height: 2.75rem;
    border-radius: 0.25rem;
  }
  .home-card-arrow,
  .home-card-link svg,
  .home-text-link svg {
    transition: transform 0.25s ease;
  }
  .home-application {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 10.5rem;
    padding: 1.75rem 0;
    border-top: 1px solid var(--surface-outline);
    border-radius: 0.25rem;
    outline: none;
  }
  .home-application-motif {
    display: none;
    width: 7rem;
    flex-shrink: 0;
  }
  .home-application-motif svg {
    height: auto;
  }
  .home-evidence-grid {
    display: grid;
    align-items: center;
    gap: 2.5rem;
  }
  .home-evidence-art {
    overflow: hidden;
    border-radius: 1.75rem;
    background: var(--muted);
  }
  .home-evidence-svg {
    display: block;
    width: 100%;
    height: auto;
    max-height: 31rem;
  }
  .home-step-number {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    flex-shrink: 0;
    border: 1px solid var(--surface-outline);
    border-radius: 100%;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--link);
    background: var(--card);
  }
  .home-guide-art {
    padding: 1.25rem 1.25rem 0;
  }


  @media (min-width: 640px) {
    .home-lab-chip {
      min-height: 2.25rem;
      padding-inline: 1rem;
    }
  }
  @media (min-width: 768px) {
    .home-section-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: end;
      gap: 3rem;
    }
    .home-system-card {
      grid-template-columns: 1fr 1.1fr;
    }
    .home-evidence-grid {
      grid-template-columns: 1fr 1fr;
      gap: clamp(2rem, 5vw, 4.5rem);
    }
  }
  @media (min-width: 1024px) {
    .home-hero-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr);
      gap: 3rem;
    }
    .home-application-motif {
      display: block;
    }
  }
  @media (hover: hover) and (pointer: fine) {
    .home-lab-chip:hover {
      color: var(--foreground);
    }
    .home-product-card:hover,
    .home-guide:hover {
      background-color: color-mix(in srgb, var(--foreground) 3%, var(--muted));
    }
    .home-product-card:hover .home-hardware {
      transform: translateY(-5px);
    }
    .home-product-card:hover .home-card-arrow,
    .home-product-card:hover .home-card-link svg,
    .home-application:hover .home-card-arrow,
    .home-guide:hover .home-card-link svg,
    .home-text-link:hover svg {
      transform: translate(2px, -2px);
    }
    .home-evidence-art:hover .home-evidence-sheet {
      transform: translateY(-4px);
    }
    .home-evidence-art:hover .home-evidence-record {
      transform: translateY(3px);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .home-lab-part,
  .home-hardware,
  .home-evidence-sheet,
  .home-evidence-record,
  .home-card-arrow,
  .home-card-link svg,
  .home-text-link svg {
    transform: none !important;
  }
}

```
## components/theme-provider.tsx

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export { ThemeProvider };

```
