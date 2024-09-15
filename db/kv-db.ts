import { config } from '../config.js';
import { createClient } from '@vercel/kv';

export const kv = createClient({
  url: config.RestApiUrl,
  token: config.token,
});
