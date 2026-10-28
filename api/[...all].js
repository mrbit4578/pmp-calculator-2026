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

  const rawUrl = req.url || '';
  let targetHost = '';
  let targetPath = '';

  if (rawUrl.includes('/river')) {
    targetHost = 'api.river.ai';
    let sub = rawUrl.replace(/.*\/river/, '');
    if (!sub.startsWith('/')) sub = '/' + sub;
    targetPath = '/v1' + sub;
  } else if (rawUrl.includes('/experiential')) {
    targetHost = 'api.experientiallabs.ai';
    let sub = rawUrl.replace(/.*\/experiential/, '');
    if (!sub.startsWith('/')) sub = '/' + sub;
    targetPath = '/v1' + sub;
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ error: { message: 'Route not mapped: ' + rawUrl } }));
    return;
  }

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
      res.end(JSON.stringify({ error: { message: 'Gateway forwarding error: ' + err.message } }));
    });

    if (body.length > 0) proxyReq.write(body);
    proxyReq.end();
  });
};
