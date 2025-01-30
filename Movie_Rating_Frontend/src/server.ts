import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { API_CONFIG } from '../src/app/config';
import fetch from 'node-fetch';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

// Proxy API requests to the backend
app.use('/api', async (req, res) => {
  try {
    const targetUrl = `${API_CONFIG.BASE_URL}${req.originalUrl}`;

    // Convert headers to the appropriate format
    const headers: HeadersInit = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') {
        headers[key] = value;
      } else if (Array.isArray(value)) {
        headers[key] = value.join(','); // Combine array headers into a single string
      }
    }

    const fetchResponse = await fetch(targetUrl, {
      method: req.method,
      headers, // Use the converted headers
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // Pass through headers and status code
    res.status(fetchResponse.status);
    fetchResponse.headers.forEach((value, key) => res.setHeader(key, value));

    // Pipe the response body to the client
    if (fetchResponse.body) {
      fetchResponse.body.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Error proxying API request:', error);
    res.status(500).send('Internal server error');
  }
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
