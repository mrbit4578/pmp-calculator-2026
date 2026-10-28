const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Exp-Base');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Strip /api/experiential and prepend /v1
  let subPath = (req.url || '').replace(/^\/api\/experiential/, '');
  if (!subPath.startsWith('/')) subPath = '/' + subPath;
  const targetPath = '/v1' + subPath;

  const targetHost = 'api.experientiallabs.ai';

  const proxyReq = https.request({
    hostname: targetHost,
    port: 443,
    path: targetPath,
    method: req.method,
    headers: {
      'Content-Type': req.headers['content-type'] || 'application/json',
      'Authorization': req.headers['authorization'] || '',
      'Host': targetHost
    }
  }, (proxyRes) => {
    res.status(proxyRes.statusCode);
    for (const [key, value] of Object.entries(proxyRes.headers)) {
      if (key.toLowerCase() !== 'access-control-allow-origin') {
        res.setHeader(key, value);
      }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    res.status(502).json({ error: { message: 'Experiential proxy error: ' + err.message } });
  });

  if (req.body) {
    const data = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    proxyReq.write(data);
    proxyReq.end();
  } else {
    req.pipe(proxyReq);
  }
};
