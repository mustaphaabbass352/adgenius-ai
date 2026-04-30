const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Read index.html
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace placeholders with environment variables
const replacements = {
  '__GROQ_API_KEY__': process.env.GROQ_API_KEY || '',
  '__HF_API_KEY__': process.env.HF_API_KEY || '',
  '__MH_API_KEY__': process.env.MH_API_KEY || ''
};

for (const [placeholder, value] of Object.entries(replacements)) {
  html = html.replace(new RegExp(placeholder, 'g'), value);
}

// Write to public/index.html
const outputPath = path.join(publicDir, 'index.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log('✅ Build complete! Output in public/ folder');
