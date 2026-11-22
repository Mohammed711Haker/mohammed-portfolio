/**
 * Single place for absolute URLs and site-wide settings.
 *
 * The production URL will change when the Vercel project is renamed, so it is
 * resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL           (set it in Vercel → Settings → Environment Variables)
 *   2. VERCEL_PROJECT_PRODUCTION_URL  (provided automatically by Vercel, no protocol)
 *   3. VERCEL_URL                     (preview deployments)
 *   4. http://localhost:3000          (local dev)
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Mohammed Humaidhah";
export const SITE_TITLE = "Mohammed Humaidhah (Abu Hilal) — IT Student & Developer";
export const SITE_DESCRIPTION =
  "Portfolio of Mohammed Humaidhah (Abu Hilal), a Yemeni IT student at UIN Salatiga, Indonesia: Flutter, Python, IoT, cloud and cybersecurity projects, written as case studies.";

/** Social preview image (relative to SITE_URL). */
export const OG_IMAGE = "/mohammed-humaidhah.jpg";

/**
 * CV download. Put the PDF at public/cv/Mohammed-Humaidhah-CV.pdf.
 * The button checks that the file exists and shows "coming soon" until it does.
 * TODO(owner): add the CV PDF (without date of birth, phone, ID or passport numbers).
 */
export const CV_PATH = "/cv/Mohammed-Humaidhah-CV.pdf";
