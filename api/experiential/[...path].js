const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-River-Base, X-Exp-Base');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Extract path after /api/experiential
  let rawUrl = req.url || '';
  let sub = rawUrl.replace(/^\/api\/experiential/, '').replace(/^experiential/, '');
  if (!sub.startsWith('/')) sub = '/' + sub;
  const targetPath = '/v1' + sub;
  const targetHost = 'api.experientiallabs.ai';

  let chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    let body = Buffer.concat(chunks);
    if (req.body && body.length === 0) {
      body = Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body));
    }

    const headers = {
      'Content-Type': req.headers['content-type'] || 'application/json',
      'Authorization': req.headers['authorization'] || '',
      'Host': targetHost
    };
    if (body.length > 0) {
      headers['Content-Length'] = body.length;
    }

    const proxyReq = https.request({
      hostname: targetHost,
      port: 443,
      path: targetPath,
      method: req.method,
      headers: headers
    }, (proxyRes) => {
      const respHeaders = Object.assign({}, proxyRes.headers, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, OPTIONS, PUT, DELETE',
        'access-control-allow-headers': 'Content-Type, Authorization, X-River-Base, X-Exp-Base'
      });
      res.writeHead(proxyRes.statusCode, respHeaders);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ error: { message: 'Experiential proxy error: ' + err.message } }));
    });

    if (body.length > 0) proxyReq.write(body);
    proxyReq.end();
  });
};
