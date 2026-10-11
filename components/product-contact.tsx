import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { CtaPanel } from "@/components/cta-panel";
import { pillLink } from "@/lib/pill-link";

export function ProductContact({ product }: { product: string }) {
  return (
    <CtaPanel
      headingId="product-contact-heading"
      eyebrow="Build your test environment"
      title={<>Put {product} to work.</>}
      actions={
        <Link href="/contact-us" className={pillLink.primary}>
          Talk to our team <ArrowUpRightIcon aria-hidden className="size-4" />
        </Link>
      }
    >
      Tell us about your devices, test requirements and lab. We’ll help you
      find the right configuration.
    </CtaPanel>
  );
}
