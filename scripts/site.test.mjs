// Checks a running build of the site from the outside: status codes,
// redirects, security headers, and each page's metadata, structured data
// and links.
//
//   npm run build && npm run start      (in one terminal)
//   npm run test:site                   (in another)
//
// SITE_URL names the server to check; it defaults to http://localhost:3000.
import assert from "node:assert/strict";
import test from "node:test";

const BASE = process.env.SITE_URL ?? "http://localhost:3000";

const get = (path) => fetch(BASE + path, { redirect: "manual" });
const attribute = (tag, name) =>
  tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1] ?? null;
const decode = (value) =>
  value
    ?.replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');

// A page's markup without its scripts, which repeat the markup as data.
// Structured data is kept.
async function read(path) {
  const response = await get(path);
  const html = await response.text();
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (script) =>
    script.includes("application/ld+json") ? script : "",
  );
  const tags = (name) =>
    [...markup.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((m) => m[0]);
  const meta = (key) => {
    const tag = tags("meta").find(
      (item) =>
        attribute(item, "name") === key || attribute(item, "property") === key,
    );
    return tag ? decode(attribute(tag, "content")) : null;
  };
  return {
    status: response.status,
    headers: response.headers,
    markup,
    meta,
    title: decode(markup.match(/<title>([^<]*)<\/title>/)?.[1] ?? null),
    canonical: attribute(
      tags("link").find((item) => attribute(item, "rel") === "canonical") ?? "",
      "href",
    ),
    headings: (level) =>
      [...markup.matchAll(new RegExp(`<h${level}\\b`, "g"))].length,
    ids: new Set([...markup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
    links: tags("a")
      .map((item) => decode(attribute(item, "href")))
      .filter(Boolean),
  };
}

const sitemap = await (await get("/sitemap.xml")).text();
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const pages = new Map();
for (const location of listed) {
  const path = new URL(location).pathname;
  pages.set(path, await read(path));
}

test("the sitemap lists the site's pages", () => {
  assert.ok(listed.length >= 12, `only ${listed.length} addresses listed`);
  for (const path of [
    "/",
    "/products",
    "/solutions",
    "/resources",
    "/privacy-policy",
    "/terms-conditions",
  ])
    assert.ok(pages.has(path), `${path} is missing from the sitemap`);
});

test("every listed page is served, described and indexable", () => {
  const titles = new Set();
  for (const [index, [path, page]] of [...pages].entries()) {
    assert.equal(page.status, 200, `${path} status`);
    assert.ok(page.title, `${path} has no title`);
    assert.ok(!titles.has(page.title), `${path} repeats the title "${page.title}"`);
    titles.add(page.title);
    assert.ok(page.meta("description")?.length >= 70, `${path} description`);
    assert.equal(
      page.canonical?.replace(/\/$/, ""),
      listed[index].replace(/\/$/, ""),
      `${path} canonical address`,
    );
    assert.match(page.meta("robots") ?? "", /^index/, `${path} robots`);
    assert.equal(page.headings(1), 1, `${path} should have one h1`);
    assert.ok(page.meta("og:title"), `${path} og:title`);
    assert.ok(page.meta("og:image"), `${path} og:image`);
    assert.equal(page.meta("twitter:card"), "summary_large_image", path);
  }
});

test("structured data parses and names the organization", () => {
  for (const [path, page] of pages) {
    const blocks = [
      ...page.markup.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => JSON.parse(m[1]));
    const types = blocks.flatMap((block) =>
      (block["@graph"] ?? [block]).map((node) => node["@type"]),
    );
    assert.ok(types.includes("Organization"), `${path} has no Organization`);
    if (path !== "/")
      assert.ok(types.includes("BreadcrumbList"), `${path} has no breadcrumb`);
  }
});

test("links between pages lead somewhere", async () => {
  const targets = new Map(pages);
  for (const [path, page] of pages) {
    for (const href of page.links) {
      if (/^(mailto:|tel:|https?:)/.test(href)) continue;
      const url = new URL(href, BASE + path);
      if (!targets.has(url.pathname))
        targets.set(url.pathname, await read(url.pathname));
      const target = targets.get(url.pathname);
      assert.equal(target.status, 200, `${path} links to ${href}`);
      if (url.hash)
        assert.ok(
          target.ids.has(decodeURIComponent(url.hash.slice(1))),
          `${path} links to ${href}, which has no such section`,
        );
    }
  }
});

test("addresses that match nothing answer 404", async () => {
  for (const path of ["/no-such-page", "/resources/no-such-guide", "/products/no-such-product"]) {
    const page = await read(path);
    assert.equal(page.status, 404, path);
    assert.match(page.meta("robots") ?? "", /noindex/, `${path} robots`);
  }
});

test("the previous site's addresses redirect", async () => {
  const moved = {
    "/about": [308, "/about-us"],
    "/contact": [308, "/contact-us"],
    "/privacy": [308, "/privacy-policy"],
    "/terms": [308, "/terms-conditions"],
    "/blog": [308, "/resources"],
    "/blog/2": [308, "/resources"],
    "/products/mt-c24": [308, "/products/client-emulators"],
    "/products/mt-wave": [308, "/products/interference-generators"],
  };
  for (const [path, [status, destination]] of Object.entries(moved)) {
    const response = await get(path);
    assert.equal(response.status, status, path);
    assert.equal(new URL(response.headers.get("location"), BASE).pathname, destination, path);
  }
});

test("request-only documents are not served", async () => {
  const documents = [
    "/resources/presentation",
    "/download/wavemetrik-technologies",
    "/download/mt-wave-interference-generator",
    "/Wavemetrik_Technologies.pdf",
    "/MT-Wave/MT-Wave-Interference-Generator.pdf",
  ];
  for (const path of documents) {
    const response = await get(path);
    assert.equal(response.status, 307, `${path} should lead to a request form`);
    const destination = new URL(response.headers.get("location"), BASE);
    assert.equal((await read(destination.pathname)).status, 200, path);
  }
  for (const path of ["/presentation.pptx", "/datasheets/MT-Wave_Datasheet.pdf"])
    assert.equal((await get(path)).status, 404, path);
});

test("unlisted documents download, and nothing points to them", async () => {
  for (const file of [
    "Wavemetrik-Test-Offerings.pdf",
    "MT-Wave-Datasheet.pdf",
    "MT-C-Series-Datasheet.pdf",
  ]) {
    const response = await get(`/documents/${file}`);
    assert.equal(response.status, 200, file);
    assert.equal(response.headers.get("content-type"), "application/pdf", file);
    assert.equal(response.headers.get("content-disposition"), "attachment", file);
    assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/, file);
    await response.arrayBuffer();
  }
  assert.ok(!sitemap.includes("/documents/"), "the sitemap lists a document");
  for (const [path, page] of pages)
    assert.ok(
      !page.markup.includes("/documents/"),
      `${path} mentions an unlisted document`,
    );
});

test("security headers are sent with pages and error pages", async () => {
  for (const path of ["/", "/contact-us", "/no-such-page"]) {
    const { headers } = await get(path);
    const policy = headers.get("content-security-policy") ?? "";
    for (const directive of [
      "default-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ])
      assert.ok(policy.includes(directive), `${path}: CSP lacks ${directive}`);
    assert.equal(headers.get("x-content-type-options"), "nosniff", path);
    assert.equal(headers.get("x-frame-options"), "DENY", path);
    assert.equal(headers.get("referrer-policy"), "strict-origin-when-cross-origin", path);
    assert.match(headers.get("strict-transport-security") ?? "", /max-age=\d{8}/, path);
    assert.ok(headers.get("permissions-policy"), `${path}: Permissions-Policy`);
    assert.equal(headers.get("x-powered-by"), null, `${path}: X-Powered-By`);
  }
});

test("robots.txt allows crawling and names the sitemap", async () => {
  const robots = await (await get("/robots.txt")).text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https?:\/\/\S+\/sitemap\.xml/);
});
