const fs = require("fs")
const path = require("path")

const BASE_URL = "https://bubbe.com.br"

// pasta do site
const ROOT = path.join(__dirname, "..")

// pegar todos html
const files = fs.readdirSync(ROOT)

const pages = files.filter(file => file.endsWith(".html"))

const today = new Date().toISOString()

const urls = pages.map(file => {

  const page = file === "index.html"
    ? ""
    : file.replace(".html", "")

  return `
  <url>
    <loc>${BASE_URL}/${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`

}).join("")

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap)

console.log("✅ Sitemap gerado!")