const fs = require('fs');

async function findQuotes() {
  const chunks = ["0m9vh1vcfsnp5.js", "0y3-82-~kdn8h.js", "0~m4xxjepii0t.js", "0jwuwbsy8x5gc.js", "05c8kg8sj4jl5.js", "03y93_txr~m5q.js", "0d3shmwh5_nmn.js"];
  for (const c of chunks) {
    try {
      const res = await fetch("https://www.produx.design/_next/static/chunks/" + c);
      const text = await res.text();
      const headshots = [...text.matchAll(/ClientHeadshots\/([^"'\s]+)/g)].map(m => m[1]);
      if (headshots.length > 0) {
        console.log("Found headshots in", c, headshots);
        const idx = text.indexOf("ClientHeadshots");
        console.log("Snippet around headshot:\n", text.substring(Math.max(0, idx - 400), idx + 800));
        fs.writeFileSync("testimonials_chunk.txt", text);
      }
    } catch(e) {
      console.error(e);
    }
  }
}
findQuotes();
