import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const distDir = "./dist";
const assetsDir = join(distDir, "assets");

let html = readFileSync(join(distDir, "index.html"), "utf-8");

const cssFile = readdirSync(assetsDir).find((f) => f.endsWith(".css"));
const jsFile = readdirSync(assetsDir).find((f) => f.endsWith(".js"));

let css = readFileSync(join(assetsDir, cssFile), "utf-8");

// Inline every font asset referenced in the CSS as a base64 data URI.
const fontFiles = readdirSync(assetsDir).filter((f) => f.endsWith(".woff2") || f.endsWith(".woff"));
for (const font of fontFiles) {
  const bytes = readFileSync(join(assetsDir, font));
  const mime = font.endsWith(".woff2") ? "font/woff2" : "font/woff";
  const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;
  css = css.split(`/assets/${font}`).join(dataUri);
}

let js = readFileSync(join(assetsDir, jsFile), "utf-8");

// Inline the real portrait photos + resume PDF as base64 data URIs so the
// standalone preview has no dependency on /images/... or the PDF being
// served from a real origin. These paths only ever appear as string
// literals inside the bundle (from src/data/profile.ts), so a plain
// split/join is safe — same reasoning as the font inlining above, and it
// sidesteps the String.replace() "$"-pattern pitfall entirely.
const publicDir = "./public";
const imageFiles = readdirSync(join(publicDir, "images")).filter((f) => f.endsWith(".jpg") || f.endsWith(".png"));
for (const img of imageFiles) {
  const bytes = readFileSync(join(publicDir, "images", img));
  const mime = img.endsWith(".png") ? "image/png" : "image/jpeg";
  const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;
  js = js.split(`/images/${img}`).join(dataUri);
}

// Company logos (Experience section) live one level deeper, at
// public/images/logos/*, and are referenced in the bundle as
// /images/logos/<file> — inline those too.
const logosDir = join(publicDir, "images", "logos");
const logoFiles = readdirSync(logosDir).filter((f) => f.endsWith(".jpg") || f.endsWith(".png"));
for (const logo of logoFiles) {
  const bytes = readFileSync(join(logosDir, logo));
  const mime = logo.endsWith(".png") ? "image/png" : "image/jpeg";
  const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;
  js = js.split(`/images/logos/${logo}`).join(dataUri);
}

try {
  const resumeBytes = readFileSync(join(publicDir, "Yash-Mishra-Resume.pdf"));
  const resumeDataUri = `data:application/pdf;base64,${resumeBytes.toString("base64")}`;
  js = js.split("/Yash-Mishra-Resume.pdf").join(resumeDataUri);
} catch {
  console.warn("No resume PDF found at public/Yash-Mishra-Resume.pdf — resume links will 404 in the standalone preview.");
}

// Escape a literal "</script" inside the bundle so it can't prematurely
// close our inline <script> tag when parsed as HTML.
js = js.replace(/<\/script/gi, "<\\/script");
css = css.replace(/<\/style/gi, "<\\/style");

// Strip the built <link rel="stylesheet"> and <script type="module" src="..."> tags.
html = html.replace(/<link rel="stylesheet"[^>]*>/g, "");
html = html.replace(/<script type="module"[^>]*src="[^"]*"[^>]*><\/script>/g, "");

// IMPORTANT: use a replacer *function* here, not a string. String.replace()
// treats "$"-sequences ($&, $`, $', $$, $1...) specially when the replacement
// is a string — and a minified bundle reliably contains stray "$" sequences
// that get reinterpreted as those special patterns, silently duplicating
// huge chunks of the surrounding document. A function return value is
// inserted verbatim with no such interpretation.
html = html.replace("</head>", () => `<style>${css}</style>\n</head>`);
html = html.replace("</body>", () => `<script type="module">${js}</script>\n</body>`);

writeFileSync("./dist/preview-inline.html", html);
console.log("Wrote dist/preview-inline.html —", (Buffer.byteLength(html) / 1024 / 1024).toFixed(2), "MB");
