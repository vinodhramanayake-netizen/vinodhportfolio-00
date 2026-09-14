const fs = require('fs');

async function run() {
  try {
    const res = await fetch('https://produx.design');
    const html = await res.text();
    fs.writeFileSync('produx_raw.html', html);
    console.log('Saved raw html, size:', html.length);

    // Let's also check CSS files
    const cssMatches = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map(m => m[1]);
    console.log('CSS files:', cssMatches);

    // Let's find images
    const imgMatches = [...html.matchAll(/(?:src|href|image)="?([^"\s>]+\.(?:png|jpg|jpeg|svg|webp|gif|webm|mp4)[^"\s>]*)"?/gi)].map(m => m[1]);
    console.log('Images:', [...new Set(imgMatches)]);
  } catch (err) {
    console.error(err);
  }
}

run();
