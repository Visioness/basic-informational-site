import http from 'node:http';
import fs from 'node:fs';

const hostname = 'localhost';
const port = 8080;
const pages = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact-me.html',
};

const server = http.createServer((req, res) => {
  const fileName = req.url in pages ? pages[req.url] : '404.html';
  const statusCode = req.url in pages ? 200 : 404;

  fs.readFile(`./${fileName}`, (err, content) => {
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(
        '<h1>500 - Internal Server Error</h1><p>Something went wrong on our end.</p>'
      );
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
