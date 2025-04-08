// worker.js - Entry point for Cloudflare Workers
import { createRequestHandler } from '@cloudflare/next-on-pages';
import app from './dist/index.js';

// Create a request handler for Cloudflare Workers
const handler = createRequestHandler({
  middleware: app
});

// Export the fetch handler
export default {
  fetch: async (request, env, ctx) => {
    try {
      return await handler(request, env, ctx);
    } catch (error) {
      return new Response(`Server Error: ${error.message}`, { status: 500 });
    }
  }
};