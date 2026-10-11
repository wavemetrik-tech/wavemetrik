import { NextResponse, type NextRequest } from "next/server";
import { GUIDES } from "@/app/resources/_data/guides";

const GUIDE_SLUGS = new Set(GUIDES.map((guide) => guide.slug));

// A guide address that matches no guide would otherwise be answered with
// the guide page's prerendered shell and a 200 status, with "not found"
// streamed into it. Checking the slug here, before anything is sent, gives
// those addresses the site's 404 page and a real 404 status.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (GUIDE_SLUGS.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url));
}

export const config = {
  matcher: "/resources/:slug",
};
