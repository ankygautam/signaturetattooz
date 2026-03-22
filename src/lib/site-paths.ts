const EXTERNAL_PATH_PATTERN = /^(?:[a-z]+:)?\/\//i;

function getSiteBasePath(pathname: string) {
  const normalizedPath = pathname || "/";

  if (normalizedPath.includes("/ourgallery/")) {
    return `${normalizedPath.slice(0, normalizedPath.indexOf("/ourgallery/") + 1)}`;
  }

  if (normalizedPath.endsWith("/school.html")) {
    return normalizedPath.replace(/school\.html$/, "");
  }

  if (normalizedPath.endsWith("/admin.html")) {
    return normalizedPath.replace(/admin\.html$/, "");
  }

  if (normalizedPath.endsWith("/index.html")) {
    return normalizedPath.replace(/index\.html$/, "");
  }

  if (normalizedPath.endsWith("/")) {
    return normalizedPath;
  }

  return normalizedPath.replace(/[^/]*$/, "");
}

export function resolveSiteAssetPath(assetPath: string) {
  const trimmedPath = assetPath.trim();

  if (!trimmedPath) {
    return trimmedPath;
  }

  if (
    EXTERNAL_PATH_PATTERN.test(trimmedPath) ||
    trimmedPath.startsWith("data:") ||
    trimmedPath.startsWith("blob:")
  ) {
    return trimmedPath;
  }

  const normalizedPath = trimmedPath.replace(/^\.\//, "").replace(/^\/+/, "");

  if (typeof window === "undefined") {
    return `/${normalizedPath}`;
  }

  const siteBasePath = getSiteBasePath(window.location.pathname);
  return `${siteBasePath}${normalizedPath}`;
}
