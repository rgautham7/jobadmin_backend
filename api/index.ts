// api/index.ts
import { createServer, proxy } from 'vercel-http-proxy';
import app from '../vercel-server';

export default createServer(async (req, res) => {
  await app(req, res);
});
