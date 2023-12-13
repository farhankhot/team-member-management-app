import { Heading, Stack, IconButton, Box } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box p={6} boxShadow="sm" rounded="md" bg="white">
      <Stack spacing={4} direction="column" maxW="md" margin="0 auto">
        <Box textAlign="right">
          <Link to="/add">
            <IconButton
              icon={<ArrowBackIcon />}
              aria-label="Add team member"
              colorScheme="blue"
              variant="ghost"
              size="lg"
              _hover={{
                bg: "blue.100",
                color: "blue.600",
              }}
              isRound="true"
            />
          </Link>
        </Box>
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Error 404 - Not Found
        </Heading>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
