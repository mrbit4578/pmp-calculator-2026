const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-River-Base');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url.startsWith('/api/river/')) {
    const targetPath = req.url.replace('/api/river', '/v1');
    const riverBase = req.headers['x-river-base'] || 'https://api.river.ai/v1';
    let hostname = 'api.river.ai';
    try {
      hostname = new URL(riverBase).hostname;
    } catch(e) {}

    const proxyOptions = {
      hostname: hostname,
      port: 443,
      path: targetPath,
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'Authorization': req.headers['authorization'] || '',
        'Host': hostname
      }
    };

    const proxyReq = https.request(proxyOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { message: 'Proxy error: ' + err.message } }));
    });

    req.pipe(proxyReq);
    return;
  }

  let file = req.url === '/' ? 'index.html' : req.url.slice(1).split('?')[0];
  let p = path.join(__dirname, file);
  if (fs.existsSync(p) && fs.statSync(p).isFile()) {
    let ext = path.extname(p);
    let mime = 'text/plain';
    if (ext === '.html') mime = 'text/html; charset=utf-8';
    else if (ext === '.js') mime = 'application/javascript; charset=utf-8';
    else if (ext === '.json') mime = 'application/json';
    else if (ext === '.css') mime = 'text/css';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(fs.readFileSync(p));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
