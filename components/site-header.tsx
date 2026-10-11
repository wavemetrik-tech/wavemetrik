"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
} from "lucide-react";
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
import { CtaArt } from "@/components/cta-art";
import { pillLink } from "@/lib/pill-link";
import styles from "./site-header.module.css";

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

function focusWhenVisible(target: () => HTMLElement | undefined | null) {
  let frame = 0;
  const focus = () => {
    const element = target();
    if (!element) return;
    if (getComputedStyle(element).visibility === "hidden") {
      frame = requestAnimationFrame(focus);
    } else {
      element.focus({ preventScroll: true });
    }
  };
  frame = requestAnimationFrame(focus);
  return () => cancelAnimationFrame(frame);
}

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
      className={styles.product}
    >
      <PartDrawing
        id={product.drawing}
        active={active}
        className={styles.productArt}
      />
      <span className="min-w-0">
        <span className={styles.productName}>{product.name}</span>
        <span className={styles.productRole}>{product.role}</span>
      </span>
      <span className={styles.arrow}>
        <ArrowRightIcon aria-hidden className="size-4" strokeWidth={1.5} />
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
  const pendingProductFocus = useRef<"first" | "last" | null>(null);
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

  useEffect(() => {
    if (!flyoutOpen || !pendingProductFocus.current) return;
    const last = pendingProductFocus.current === "last";
    pendingProductFocus.current = null;
    return focusWhenVisible(() => {
      const links = document
        .getElementById(flyoutId)
        ?.querySelectorAll<HTMLAnchorElement>("a");
      return last ? links?.[links.length - 1] : links?.[0];
    });
  }, [flyoutId, flyoutOpen]);

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
    const cancelFocus = focusWhenVisible(() =>
      mobileMenu.current?.querySelector<HTMLAnchorElement>("a"),
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
      cancelFocus();
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
        className={styles.header}
        onBlur={(event) => {
          // Tabbing out of the header closes the flyout.
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFlyoutOpen(false);
          }
        }}
      >
        <div className={styles.bar}>
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
              className="flex h-full items-stretch gap-6 xl:gap-8"
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
                    const last = event.key === "ArrowUp";
                    if (flyoutOpen) {
                      const links = document
                        .getElementById(flyoutId)
                        ?.querySelectorAll<HTMLAnchorElement>("a");
                      (last ? links?.[links.length - 1] : links?.[0])?.focus();
                    } else {
                      pendingProductFocus.current = last ? "last" : "first";
                      setFlyoutOpen(true);
                    }
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
              className={`hidden! whitespace-nowrap px-4! py-2! text-subhead! lg:inline-flex! ${pillLink.primary}`}
            >
              Contact sales{" "}
              <ArrowUpRightIcon
                aria-hidden
                className="size-3.5"
                strokeWidth={1.5}
              />
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
              <span
                aria-hidden
                className={styles.menuIcon}
                data-open={menuOpen}
              >
                <span />
                <span />
              </span>
            </button>
            <ThemeToggle
              variant="ghost"
              size="icon-lg"
              className="-mr-2 rounded-full text-muted-foreground"
            />
          </div>
        </div>

        {/* The scale and its needle. The scale fades out at both ends. */}
        <div aria-hidden className={styles.scale}>
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
          inert={!flyoutOpen}
          onPointerEnter={openFlyout}
          onPointerLeave={closeFlyoutSoon}
          className={`${styles.flyout} hidden lg:block ${FADE} ${flyoutOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"}`}
        >
          <div className={styles.flyoutPanel}>
            <div className={styles.intro}>
              <p className="text-caption-1 font-medium text-white/65">
                The Wavemetrik toolkit
              </p>
              <h2>Build your wireless test bench.</h2>
              <CtaArt className={styles.introArt} />
              <Link
                href="/products"
                onClick={closeAll}
                className={styles.introLink}
              >
                Explore all products{" "}
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-4"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
            <ul className={styles.productList}>
              {PRODUCTS.map((product) => (
                <li key={product.href}>
                  <ProductCard product={product} onNavigate={closeAll} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The phone menu fills the screen under the bar. */}
        <div
          id={menuId}
          ref={mobileMenu}
          inert={!menuOpen}
          className={`${styles.mobileMenu} absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-background px-5 pt-6 pb-10 sm:h-[calc(100dvh-4.5rem)] sm:px-8 lg:hidden ${FADE} ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0"
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
