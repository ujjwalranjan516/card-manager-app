const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Building Angular app...');
execSync('ng build --base-href /', { stdio: 'inherit' });

console.log('Looking for dist directory...');
const distPath = path.join(process.cwd(), 'dist');

if (fs.existsSync(distPath)) {
  console.log('Dist directory found at:', distPath);
  const indexPath = path.join(distPath, 'index.html');
  const notFoundPath = path.join(distPath, '404.html');

  if (fs.existsSync(indexPath)) {
    console.log('Copying index.html to 404.html...');
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('404.html created successfully!');
  } else {
    console.log('index.html not found in dist directory');
  }
} else {
  console.log('Dist directory not found');
}
