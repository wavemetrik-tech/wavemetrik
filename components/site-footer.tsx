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
              className="block h-6 w-fit rounded-sm text-brand outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
