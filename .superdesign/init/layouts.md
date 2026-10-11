# Shared layouts
## app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

// Stand-in for SF Pro on non-Apple devices; see --font-sans in globals.css.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Each page sets its own title, description and canonical address through
// `pageMetadata`; these are the values every page shares.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Wavemetrik | Wi-Fi test and measurement systems",
    template: "%s | Wavemetrik",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: "Wavemetrik | Wi-Fi test and measurement systems",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      // In-page links scroll smoothly (globals.css); this lets the router
      // switch that off while it changes page, so a new page opens at its
      // top instead of gliding up from the old scroll position.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </body>
    </html>
  );
}

```
## components/page-frame.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(.22, 1, .36, 1)";
// Blocks of a section that arrive as the reader reaches them.
const REVEALED =
  ".page-section > header, .page-section > h2, .page-section > p, .page-section > div, .page-section > ul, .page-section > ol, .page-section > dl, .page-section > figure, [data-reveal]";
// Drawings whose loops run faster while the pointer is on them.
const LIVELY = "figure, .fx-tile, .illustration-art, [data-tile]";

// The parts of a block that arrive one after another: the cells of a grid of
// up to twelve, or the block itself.
function parts(element: HTMLElement) {
  const children = Array.from(element.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const isGrid = getComputedStyle(element).display.includes("grid");
  return isGrid && children.length > 1 && children.length <= 12
    ? children
    : [element];
}

// Server-rendered children stay visible without JavaScript. Motion is only
// added to content entering the viewport after the initial render.
export function PageFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    const candidates = root.querySelectorAll<HTMLElement>(REVEALED);
    // Do not replay a reveal when the reader returns to a section.
    candidates.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight)
        revealed.add(element);
    });
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || revealed.has(entry.target)) continue;
          revealed.add(entry.target);
          reveals.unobserve(entry.target);
          if (preference.matches) continue;
          parts(entry.target as HTMLElement).forEach((part, index) => {
            const animation = part.animate(
              [
                { opacity: 0, transform: "translateY(28px) scale(0.985)" },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ],
              {
                duration: 800,
                delay: index * 80,
                easing: EASE,
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.finished
              .then(() => animations.delete(animation))
              .catch(() => {});
          });
        }
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" },
    );
    candidates.forEach((element) => reveals.observe(element));

    // `data-in-view` pauses a section's loops while it is off screen;
    // `data-seen` starts its one-time line drawings the first time it shows.
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target as HTMLElement;
          section.dataset.inView = String(entry.isIntersecting);
          if (entry.isIntersecting) section.dataset.seen = "true";
        }
      },
      { rootMargin: "100px" },
    );
    root
      .querySelectorAll(".page-section, .page-hero")
      .forEach((section) => visibility.observe(section));
    const footer = document.querySelector(".site-footer");
    if (footer) visibility.observe(footer);

    // Pointing at a drawing runs its loops at twice the pace. The rate eases
    // without restarting them.
    let lively: Element | null = null;
    const pace = (element: Element | null, rate: number) => {
      element?.getAnimations({ subtree: true }).forEach((animation) => {
        if (animation.effect?.getComputedTiming().iterations === Infinity)
          animation.updatePlaybackRate(rate);
      });
    };
    const point = (event: PointerEvent) => {
      if (event.pointerType === "touch" || preference.matches) return;
      const next = (event.target as Element).closest?.(LIVELY) ?? null;
      if (next === lively) return;
      pace(lively, 1);
      pace(next, 2);
      lively = next;
    };
    const release = () => {
      pace(lively, 1);
      lively = null;
    };
    document.addEventListener("pointerover", point);
    document.documentElement.addEventListener("pointerleave", release);

    const finish = () => animations.forEach((animation) => animation.finish());
    preference.addEventListener("change", finish);
    root.addEventListener("focusin", finish);
    return () => {
      reveals.disconnect();
      visibility.disconnect();
      animations.forEach((animation) => animation.cancel());
      release();
      document.removeEventListener("pointerover", point);
      document.documentElement.removeEventListener("pointerleave", release);
      preference.removeEventListener("change", finish);
      root.removeEventListener("focusin", finish);
    };
  }, []);

  return (
    <main
      id="main-content"
      ref={ref}
      className={cn("page-shell flex-1", className)}
    >
      {children}
    </main>
  );
}

```
## components/site-header.tsx

```tsx
"use client";

import { ArrowRightIcon, ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import {
  PartDrawing,
  type PartDrawingId,
} from "@/components/diagrams/part-drawings";
import { FrequencyScale } from "@/components/frequency-scale";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const PRODUCTS: {
  name: string;
  role: string;
  href: string;
  drawing: PartDrawingId;
}[] = [
  {
    name: "MT-C24",
    role: "Wi-Fi 7 client emulators",
    href: "/products/client-emulators",
    drawing: "clients",
  },
  {
    name: "MT-Wave",
    role: "Wi-Fi and non-Wi-Fi interference generator",
    href: "/products/interference-generators",
    drawing: "wave",
  },
  {
    name: "MT-SYS",
    role: "Wi-Fi test systems",
    href: "/products/wifi-test-systems",
    drawing: "system",
  },
];

const LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about-us" },
];

// What the needle can point at: the Products button or one of the links.
const PRODUCTS_KEY = "products";

// Items are as tall as the bar, so each one stands directly over its stretch
// of the scale.
const NAV_ITEM =
  "flex h-full items-center gap-1 rounded-sm text-subhead font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";
const FADE =
  "transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none";

// One product in the flyout: its line drawing, which is outlined while the
// link is pointed at or focused, with its name and what it is.
function ProductCard({
  product,
  onNavigate,
}: {
  product: (typeof PRODUCTS)[number];
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  return (
    <Link
      href={product.href}
      aria-current={pathname === product.href ? "page" : undefined}
      onClick={onNavigate}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group/card flex h-full flex-col rounded-2xl p-4 outline-none transition-colors duration-200 hover:bg-muted aria-[current=page]:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <PartDrawing
        id={product.drawing}
        active={active}
        className="rounded-3xl px-10 py-2"
      />
      <span className="mt-4 flex items-center gap-1.5 text-title-3 font-semibold">
        {product.name}
        <ArrowRightIcon
          aria-hidden
          className="size-4 text-muted-foreground transition-[translate,color] duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-foreground motion-reduce:transition-none"
        />
      </span>
      <span className="mt-0.5 text-subhead/[1.375rem] text-muted-foreground">
        {product.role}
      </span>
    </Link>
  );
}

// The site header. Its bottom edge is a frequency scale, and a needle on the
// scale marks the page you are on; pointing at another item tunes the needle
// to it.
export function SiteHeader() {
  const pathname = usePathname();
  const flyoutId = useId();
  const menuId = useId();
  const productsButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const pressedWith = useRef("");
  const scale = useRef<HTMLDivElement>(null);
  const needle = useRef<HTMLSpanElement>(null);
  const items = useRef(new Map<string, HTMLElement>());
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pointed, setPointed] = useState<string | null>(null);

  const here = pathname.startsWith("/products")
    ? PRODUCTS_KEY
    : (LINKS.find((link) => pathname.startsWith(link.href))?.href ?? null);
  const tuned = flyoutOpen ? PRODUCTS_KEY : (pointed ?? here);
  const solid = flyoutOpen || menuOpen;

  // Put the needle under the item it is tuned to. It is moved directly, not
  // through state, because the position comes from measuring the layout.
  useEffect(() => {
    const place = () => {
      const mark = needle.current;
      const rail = scale.current;
      const item = tuned ? items.current.get(tuned) : undefined;
      if (!mark || !rail) return;
      if (!item || item.offsetParent === null) {
        // Parked at the start, so a hidden needle cannot widen the page.
        mark.style.transitionProperty = "opacity";
        mark.style.opacity = "0";
        mark.style.translate = "0 0";
        return;
      }
      const target = item.getBoundingClientRect();
      const x =
        target.left + target.width / 2 - rail.getBoundingClientRect().left;
      // Coming out of hiding it appears in place; it only slides between items.
      if (mark.style.opacity !== "1") mark.style.transitionProperty = "opacity";
      else mark.style.transitionProperty = "";
      mark.style.translate = `${Math.round(x)}px 0`;
      mark.style.opacity = "1";
    };
    place();
    window.addEventListener("resize", place);
    document.fonts.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [tuned]);

  // Keep focus in the navigation while the mobile menu covers the page.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const background = [
      ...document.querySelectorAll<HTMLElement>("main, footer"),
    ];
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    const frame = requestAnimationFrame(() =>
      mobileMenu.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
    );
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = [
        ...(headerRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button, input",
        ) ?? []),
      ].filter(
        (element) =>
          element.offsetParent !== null &&
          getComputedStyle(element).visibility !== "hidden" &&
          !element.hasAttribute("disabled"),
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", trap);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = previousOverflow;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      window.removeEventListener("keydown", trap);
    };
  }, [menuOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const closeOnResize = () => {
      setMenuOpen(false);
      setFlyoutOpen(false);
    };
    breakpoint.addEventListener("change", closeOnResize);
    return () => {
      breakpoint.removeEventListener("change", closeOnResize);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!flyoutOpen && !menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (flyoutOpen) productsButton.current?.focus();
      if (menuOpen) menuButton.current?.focus();
      setFlyoutOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [flyoutOpen, menuOpen]);

  // With a mouse the flyout opens on the way in and closes a moment after
  // the pointer leaves, so crossing the gap to it does not shut it.
  const openFlyout = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setFlyoutOpen(true);
  };
  const closeFlyoutSoon = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setFlyoutOpen(false), 140);
  };
  const closeAll = () => {
    window.clearTimeout(closeTimer.current);
    setFlyoutOpen(false);
    setMenuOpen(false);
  };

  const register = (key: string) => (element: HTMLElement | null) => {
    if (element) items.current.set(key, element);
    else items.current.delete(key);
  };
  const tone = (key: string) =>
    tuned === key || here === key
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 border-b border-border/60 transition-colors duration-200 motion-reduce:transition-none ${
          solid
            ? "bg-background"
            : "bg-background/80 backdrop-blur-xl backdrop-saturate-150"
        }`}
        onBlur={(event) => {
          // Tabbing out of the header closes the flyout.
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFlyoutOpen(false);
          }
        }}
      >
        <div className="page-container flex h-16 items-center gap-6 sm:h-18">
          <Link
            href="/"
            aria-label="Wavemetrik home"
            onClick={closeAll}
            className="h-5 shrink-0 rounded-sm text-brand outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-6 dark:text-foreground"
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="mx-auto hidden h-full lg:block">
            <ul
              className="flex h-full items-stretch gap-8 lg:gap-10"
              onPointerLeave={() => setPointed(null)}
            >
              <li
                onPointerEnter={(event) => {
                  setPointed(PRODUCTS_KEY);
                  openFlyout(event);
                }}
                onPointerLeave={closeFlyoutSoon}
              >
                <button
                  ref={(element) => {
                    productsButton.current = element;
                    register(PRODUCTS_KEY)(element);
                  }}
                  type="button"
                  aria-expanded={flyoutOpen}
                  aria-controls={flyoutId}
                  onFocus={() => setPointed(PRODUCTS_KEY)}
                  onBlur={() => setPointed(null)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp")
                      return;
                    event.preventDefault();
                    setFlyoutOpen(true);
                    const last = event.key === "ArrowUp";
                    requestAnimationFrame(() => {
                      const links = document
                        .getElementById(flyoutId)
                        ?.querySelectorAll<HTMLAnchorElement>("a");
                      (last ? links?.[links.length - 1] : links?.[0])?.focus();
                    });
                  }}
                  onPointerDown={(event) => {
                    pressedWith.current = event.pointerType;
                  }}
                  onClick={(event) => {
                    // A mouse has already opened the flyout by pointing, so
                    // its click must not shut it again. Keyboard and touch
                    // have no hover, so for them the button toggles.
                    const byMouse =
                      event.detail > 0 && pressedWith.current === "mouse";
                    setFlyoutOpen((open) => (byMouse ? true : !open));
                  }}
                  className={`${NAV_ITEM} cursor-pointer ${tone(PRODUCTS_KEY)}`}
                >
                  Products
                  <ChevronDownIcon
                    aria-hidden
                    className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                      flyoutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </li>
              {LINKS.map((link) => (
                <li
                  key={link.href}
                  onPointerEnter={() => setPointed(link.href)}
                >
                  <Link
                    ref={register(link.href)}
                    href={link.href}
                    aria-current={here === link.href ? "page" : undefined}
                    onClick={closeAll}
                    onFocus={() => setPointed(link.href)}
                    onBlur={() => setPointed(null)}
                    className={`${NAV_ITEM} ${tone(link.href)}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions, with the theme button last so it sits at the far right. */}
          <div className="ml-auto flex items-center gap-1.5 lg:ml-0 lg:gap-3">
            <Link
              href="/contact-us"
              onClick={closeAll}
              className="hidden min-h-11 items-center rounded-full bg-primary px-5 text-subhead font-medium whitespace-nowrap text-primary-foreground outline-none transition-[background-color,scale] duration-200 hover:bg-primary-hover focus-visible:ring-3 focus-visible:ring-primary/40 active:scale-[0.98] motion-reduce:transition-none lg:flex"
            >
              Contact sales
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              {menuOpen ? (
                <XIcon aria-hidden className="size-5" />
              ) : (
                <MenuIcon aria-hidden className="size-5" />
              )}
            </button>
            <ThemeToggle
              variant="ghost"
              size="icon-lg"
              className="-mr-2 rounded-full text-muted-foreground"
            />
          </div>
        </div>

        {/* The scale and its needle. The scale fades out at both ends. */}
        <div
          aria-hidden
          className="page-container pointer-events-none absolute inset-x-0 bottom-0"
        >
          <div ref={scale} className="relative h-2">
            <FrequencyScale className="absolute inset-0" />
            <span
              ref={needle}
              className="absolute bottom-0 left-0 -ml-px h-4 w-0.5 rounded-full bg-brand opacity-0 transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none"
            />
          </div>
        </div>

        {/* The Products flyout: the bar's own surface carried down the page,
            with the three instruments drawn in it. */}
        <div
          id={flyoutId}
          onPointerEnter={openFlyout}
          onPointerLeave={closeFlyoutSoon}
          className={`absolute inset-x-0 top-full hidden border-b bg-background lg:block ${FADE} ${
            flyoutOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="page-container pt-7 pb-2">
            <Link
              href="/products"
              onClick={closeAll}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm text-footnote font-medium text-link hover:underline underline-offset-4"
            >
              Explore all products{" "}
              <ArrowRightIcon aria-hidden className="size-3.5" />
            </Link>
          </div>
          <ul className="page-container grid grid-cols-3 gap-5 pb-8">
            {PRODUCTS.map((product) => (
              <li key={product.href}>
                <ProductCard product={product} onNavigate={closeAll} />
              </li>
            ))}
          </ul>
        </div>

        {/* The phone menu fills the screen under the bar. */}
        <div
          id={menuId}
          ref={mobileMenu}
          className={`absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-background px-5 pt-6 pb-10 sm:h-[calc(100dvh-4.5rem)] sm:px-8 lg:hidden ${FADE} ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <nav aria-label="Main">
            <p className="text-footnote text-muted-foreground">Products</p>
            <ul className="mt-3 flex flex-col gap-3">
              {PRODUCTS.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    aria-current={
                      pathname === product.href ? "page" : undefined
                    }
                    onClick={closeAll}
                    className="flex items-center gap-4 rounded-2xl p-2 outline-none transition-colors hover:bg-muted aria-[current=page]:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="w-28 shrink-0">
                      <PartDrawing
                        id={product.drawing}
                        active={false}
                        className="rounded-2xl p-1.5"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-title-3 font-semibold">
                        {product.name}
                      </span>
                      <span className="block text-subhead/[1.375rem] text-muted-foreground">
                        {product.role}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-8 border-b">
              {LINKS.map((link) => (
                <li key={link.href} className="border-t">
                  <Link
                    href={link.href}
                    aria-current={here === link.href ? "page" : undefined}
                    onClick={closeAll}
                    className="flex items-center justify-between py-4 text-title-3 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 text-muted-foreground"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact-us"
              onClick={closeAll}
              className="mt-8 flex h-12 items-center justify-center rounded-full bg-primary text-[1.0625rem] font-medium text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            >
              Contact sales
            </Link>
          </nav>
        </div>
      </header>

      {/* The page dims behind the open flyout; a click on it closes it. */}
      <div
        aria-hidden
        onClick={closeAll}
        className={`fixed inset-0 z-30 hidden bg-black/30 lg:block ${FADE} ${
          flyoutOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
    </>
  );
}

```
## components/site-footer.tsx

```tsx
import Link from "next/link";

import { FooterSpectrum } from "@/components/footer-spectrum";
import { ArrowUpRightIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { pillLink } from "@/lib/pill-link";

// Reading the clock is not allowed while a page is prerendered, so the year
// is written out. Update it each January.
const YEAR = 2026;

const PRODUCTS = [
  {
    name: "MT-C24",
    role: "Client emulators",
    href: "/products/client-emulators",
  },
  {
    name: "MT-Wave",
    role: "Interference generator",
    href: "/products/interference-generators",
  },
  { name: "MT-SYS", role: "Test systems", href: "/products/wifi-test-systems" },
];

const COMPANY = [
  { label: "About", href: "/about-us" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact-us" },
];

const HEADING =
  "text-footnote font-semibold tracking-wide text-muted-foreground";
const LINK =
  "footer-link outline-none underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container pt-10 sm:pt-14">
        <FooterSpectrum />

        <div className="mt-10 grid gap-x-12 gap-y-12 border-t pt-10 sm:mt-12 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Link
              href="/"
              aria-label="Wavemetrik home"
              className="block h-6 w-fit rounded-sm text-brand outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:text-foreground"
            >
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs text-title-1 font-semibold tracking-tight text-balance">
              Precision at every frequency.
            </p>
            <div className="mt-6 flex">
              <Link href="/contact-us" className={pillLink.outline}>
                Get in touch <ArrowUpRightIcon aria-hidden className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-subhead/[1.375rem] sm:grid-cols-3">
            <nav aria-labelledby="footer-products">
              <h2 id="footer-products" className={HEADING}>
                Products
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {PRODUCTS.map((product) => (
                  <li key={product.href}>
                    <Link
                      href={product.href}
                      className={`font-medium [overflow-wrap:anywhere] ${LINK}`}
                    >
                      {product.name}
                    </Link>
                    <span className="block text-muted-foreground">
                      {product.role}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <h2 id="footer-company" className={HEADING}>
                Company
              </h2>
              <ul className="mt-4 flex flex-col gap-2">
                {COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`font-medium [overflow-wrap:anywhere] ${LINK}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-2 sm:col-span-1">
              <h2 className={HEADING}>Get in touch</h2>
              <ul className="mt-4 flex flex-col gap-2">
                <li>
                  <a
                    href="mailto:sales@wavemetrik.com"
                    className={`font-medium [overflow-wrap:anywhere] ${LINK}`}
                  >
                    sales@wavemetrik.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@wavemetrik.com"
                    className={`font-medium [overflow-wrap:anywhere] ${LINK}`}
                  >
                    support@wavemetrik.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917899669501"
                    className={`font-medium tabular-nums ${LINK}`}
                  >
                    +91 78996 69501
                  </a>
                </li>
                <li>
                  <address className="text-muted-foreground not-italic">
                    Northstar, Galleria Ambedkar Colony
                    <br />
                    Yelahanka, Bangalore 560064
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t py-6 text-footnote/5 text-muted-foreground sm:mt-16">
          <p>© {YEAR} Wavemetrik Technologies Pvt. Ltd. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className={LINK}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className={LINK}>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

```
## components/product-nav.tsx

```tsx
"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ProductNav({
  product,
  items,
}: {
  product: string;
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0].id);
  const nav = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element) => element !== null);
    const update = () => {
      frame = 0;
      const offset = (nav.current?.getBoundingClientRect().bottom ?? 140) + 80;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (current) setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  useEffect(() => {
    const track = rail.current;
    const current = track?.querySelector<HTMLElement>(
      'a[aria-current="location"]',
    );
    if (!track || !current) return;
    const bounds = track.getBoundingClientRect();
    const item = current.getBoundingClientRect();
    if (item.left < bounds.left || item.right > bounds.right) {
      track.scrollTo({
        left: track.scrollLeft + item.left - bounds.left - 16,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [active]);

  return (
    <nav ref={nav} aria-label={`${product} sections`} className="product-nav">
      <div className="page-container flex min-h-14 items-center gap-6">
        <a
          href="#hero"
          className="hidden shrink-0 text-subhead font-semibold sm:block"
        >
          {product}
        </a>
        <div
          ref={rail}
          className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
        >
          <ul className="flex w-max items-center gap-5 sm:gap-7">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "product-nav-link",
                    active === item.id && "is-active",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/contact-us"
          className="hidden shrink-0 items-center gap-1 text-footnote font-semibold text-link sm:flex"
        >
          Talk to us <ArrowUpRightIcon aria-hidden className="size-4" />
        </Link>
      </div>
    </nav>
  );
}

```
