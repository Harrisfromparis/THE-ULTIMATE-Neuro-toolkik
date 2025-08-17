import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory store for dev; replace with a database in production
const signatures: { name: string; email?: string; city?: string; createdAt: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, city } = req.body || {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const entry = { name: name.trim(), email, city, createdAt: new Date().toISOString() };
    signatures.push(entry);
    return res.status(200).json({ ok: true, count: signatures.length });
  } catch (e) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
