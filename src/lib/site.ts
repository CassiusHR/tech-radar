export function getSiteUrl(): string | undefined {
  // Canonical base URL for the public site (set this when the custom domain is ready)
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    // Normalize: strip trailing slash
    url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return undefined;
  }
}

export function isIndexable(): boolean {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return false;

  // Guard rails: don’t accidentally allow indexing for local/dev URLs.
  if (
    siteUrl.includes("localhost") ||
    siteUrl.includes("127.0.0.1") ||
    siteUrl.startsWith("http://")
  ) {
    return false;
  }

  return true;
}
