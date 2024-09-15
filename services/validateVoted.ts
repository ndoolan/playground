import { kv } from '../db/kv-db.js';

export async function validateVote(id: number) {
  try {
    let user = await kv.get(`user${id}`);
    // if no user exists in database
    if (user === null) {
      // set a key to unique str + fid
      kv.set(`user${id}`, true);
      return false;
    } else {
      // we found a user, they can't vote again
      return true;
    }
  } catch (error) {
    console.error('KV connection failed checking for user:', error);
  }
}
