import { kv } from '../db/kv-db.js';

export async function handleVote(vote: string) {
  try {
    console.log('vote', typeof vote);
    let value: number | null = await kv.get(`${vote}`);
    console.log('value', typeof value);
    // temp type guard until restructuring of DB
    if (value !== null) {
      value += 1;
      await kv.set(`${vote}`, value);
    } else {
      // theoretically we don't have any votes in the DB
      value = 1;
      await kv.set(`${vote}`, value);
    }
  } catch (error) {
    console.error('KV connection failed posting vote:', error);
  }
}
