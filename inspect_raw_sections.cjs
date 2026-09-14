const fs = require('fs');
const html = fs.readFileSync('produx_raw.html', 'utf8');

// Let's print out the sections or main structural elements
console.log('HTML length:', html.length);

// Extract all <section> or major divs
const sectionRegex = /<section[\s\S]*?<\/section>/gi;
const sections = html.match(sectionRegex);
console.log('Number of <section> tags:', sections ? sections.length : 0);

// Let's find all headings (h1, h2, h3, h4)
const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => `<${m[1]}> ${m[2].replace(/<[^>]+>/g, '').trim()}`);
console.log('Headings:\n', headings.join('\n'));

// Let's dump all text blocks
const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').trim()).filter(t => t.length > 10);
console.log('\nSample Paragraphs (first 15):\n', paragraphs.slice(0, 15).join('\n---\n'));
