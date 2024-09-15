import { Text, Box, VStack, Image } from '../ui.js';

// TODO: add alt tag to image?

function Poll() {
  return (
    <Box>
      <VStack>
        <Text>
          There will be over 10,000 Kramer predictions before 9/29 at midnight
        </Text>

        <Image src="seal" />
      </VStack>
    </Box>
  );
}

export default Poll;
