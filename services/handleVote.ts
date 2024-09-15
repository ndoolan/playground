export async function handleVote(vote) {
  try {
    let value = await kv.get(`${vote}`);
    value += 1;
    await kv.set(`${vote}`, value);
  } catch (error) {
    console.error('KV connection failed posting vote:', error);
  }
}
