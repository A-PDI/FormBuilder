// Minimal Express server that serves the work instruction builder app.
// Render runs `npm start` -> `node server.js` and binds to process.env.PORT.

const express = require('express');
const path = require('path');

const app = express();

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public'), {
  // Cache static assets for an hour. The HTML itself is also fingerprinted by
  // Render's deploy ID via the ETag, so users get fresh versions on redeploy.
  maxAge: '1h',
  extensions: ['html'],
}));

// Health check endpoint (Render hits this to confirm the service is healthy)
app.get('/healthz', (req, res) => {
  res.type('text/plain').send('ok');
});

// Fallback: any unknown route returns the app (single-page app pattern)
// Express 5 uses path-to-regexp@8 syntax: '/{*splat}' for wildcard.
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Render injects PORT; default 10000 (Render's documented default) for local dev
const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Work Instruction Builder listening on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown so deploys don't drop in-flight requests.
function shutdown(signal) {
  console.log(`Received ${signal}, closing server...`);
  server.close(() => {
    console.log('Server closed cleanly.');
    process.exit(0);
  });
  // Force-exit after 10s if something is hung
  setTimeout(() => {
    console.error('Forcing exit after 10s timeout');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
