const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact-me.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server is running at http://localhost:${PORT}`);
});

/*
import http from 'node:http';
import fs from 'node:fs';
import { URL } from 'node:url';

const hostname = 'localhost';
const port = 8080;
const pages = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact-me.html',
};

const server = http.createServer((req, res) => {
  const parsedURL = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedURL.pathname;

  if (pathname !== '/' && pathname.endsWith('/')) {
    const cleanPath = pathname.slice(0, -1);
    res.writeHead(301, { Location: cleanPath });
    res.end();
    return;
  }

  const fileName = pathname in pages ? pages[pathname] : '404.html';
  const statusCode = pathname in pages ? 200 : 404;

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
*/
