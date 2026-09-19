const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
};
http.createServer((request, response) => {
  const pathname = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const filePath = path.resolve(root, '.' + decodeURIComponent(pathname));
  if (!filePath.startsWith(root)) {
    response.statusCode = 403;
    response.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end('Not found');
      return;
    }
    const contentType = types[path.extname(filePath)] || 'application/octet-stream';
    const charset = contentType.startsWith('text/') || contentType === 'image/svg+xml';
    response.setHeader('Content-Type', contentType + (charset ? '; charset=utf-8' : ''));
    response.end(data);
  });
}).listen(4173, '127.0.0.1', () => {
  console.log('Preview ready: http://127.0.0.1:4173');
});
