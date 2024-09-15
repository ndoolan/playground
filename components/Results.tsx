import { Text, Box } from '../ui.js';

// TODO: How to type unknown variables from DB
// interface ResultProps {
//   results: {
//     yes: string;
//     no: string;
//   };
// }

function Results({ results }) {
  console.log('inside results', results);
  return (
    <Box>
      <Text>This is the results component</Text>
      <Text>Yes Votes: {results.yes} </Text>
      <Text>No Votes: {results.no} </Text>
    </Box>
  );
}

export default Results;
