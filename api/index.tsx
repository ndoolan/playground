import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel';
import { vars } from '../ui.js';
import { AlreadyVoted, Poll, Results } from '../components/index.js';
import { validateVote } from '../services/validateVoted.js';
import { getVotes } from '../services/getVotes.js';
import { handleVote } from '../services/handleVote.js';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  browserLocation: '/:path',
  ui: { vars },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
});

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    image: <Poll />,
    intents: [
      <Button action="/vote" value="yes">
        Yes
      </Button>,
      <Button action="/vote" value="no">
        No
      </Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame('/vote', async (c) => {
  const { buttonValue, status, frameData } = c;
  const fid = 199;
  // User has already voted
  const hasVoted = await validateVote(fid);
  if (hasVoted) {
    return c.res({
      image: <AlreadyVoted />,
      intents: [status === 'response' && <Button.Reset>Reset</Button.Reset>],
    });
  }
  // Cast Vote
  await handleVote(buttonValue);
  // Get All Votes to Pass Into Results Component
  const results = await getVotes();

  return c.res({
    // Traditional React Props Style - separating from 'c' (context) of Frog
    image: <Results results={results} />,
    intents: [status === 'response' && <Button.Reset>Reset</Button.Reset>],
  });
});

app.frame('/results', async (c) => {
  const { status } = c;
  const results = await getVotes();

  return c.res({
    image: <Results results={results} />,
    intents: [status === 'response' && <Button.Reset>Reset</Button.Reset>],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined';
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development';
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
