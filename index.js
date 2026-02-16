const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { middleware } = require('./lib');

const app = express();

// Security: disable x-powered-by header
app.disable('x-powered-by');

// Security: set protective response headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'none'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(cors());

// Security: only trust Cloudflare's proxy layer, not arbitrary X-Forwarded-For
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

// Rate limiter: 120 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  keyGenerator: (req) => {
    return req.headers['cf-connecting-ip'] || req.ip;
  },
  message: {
    status: 429,
    message: "Okay for real, you need to chill. Rate limit exceeded. (120 reqs/min/IP)"
  }
});

app.use(limiter);

// Mount the mock-responses routes at the root
app.use('/', middleware());

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`mock-responses is roasting on port ${PORT}`);
  });
}

module.exports = app;
