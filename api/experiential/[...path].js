const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-River-Base, X-Exp-Base');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let rawUrl = req.url || '';
  let sub = rawUrl.replace(/^\/api\/experiential/, '').replace(/^experiential/, '');
  if (!sub.startsWith('/')) sub = '/' + sub;
  const targetPath = '/v1' + sub;
  const targetHost = 'api.experientiallabs.ai';

  // In Vercel, req.body is already parsed
  let bodyData = Buffer.alloc(0);
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') bodyData = Buffer.from(req.body);
    else if (Buffer.isBuffer(req.body)) bodyData = req.body;
    else bodyData = Buffer.from(JSON.stringify(req.body));
  } else if (!req.readableEnded) {
    bodyData = await new Promise((resolve) => {
      let chunks = [];
      req.on('data', c => chunks.push(c));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', () => resolve(Buffer.alloc(0)));
    });
  }

  const headers = {
    'Content-Type': req.headers['content-type'] || 'application/json',
    'Authorization': req.headers['authorization'] || '',
    'Host': targetHost
  };
  if (bodyData.length > 0) {
    headers['Content-Length'] = bodyData.length;
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

  if (bodyData.length > 0) proxyReq.write(bodyData);
  proxyReq.end();
};
