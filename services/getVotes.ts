import { kv } from '../db/kv-db.js';

export async function getVotes() {
  try {
    const noVotes = await kv.get('no');
    const yesVotes = await kv.get('yes');
    const results = {
      yes: yesVotes,
      no: noVotes,
    };
    return results;
  } catch (error) {
    console.error('KV connection failed getting votes:', error);
  }
}
