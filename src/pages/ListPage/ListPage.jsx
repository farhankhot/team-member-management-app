import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  IconButton,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { getTeamMembers } from "../../utils/crudOperations/crudOperations";
import teamMemberJson from "../../dummy_data.json";

const ListPage = () => {
  // Fetch and display team members logic goes here
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const storedTeamMembers = getTeamMembers();
    const hasDataBeenLoaded = localStorage.getItem("hasDataBeenLoaded");

    if (storedTeamMembers.length === 0 && !hasDataBeenLoaded) {
      setTeamMembers(storedTeamMembers);
      localStorage.setItem("teamMembers", JSON.stringify(teamMemberJson));
      localStorage.setItem("hasDataBeenLoaded", "true");
    } else {
      setTeamMembers(storedTeamMembers);
    }
  }, []);

  return (
    <Box p={6} boxShadow="sm" rounded="md" bg="white">
      <Stack spacing={4} direction="column" maxW="md" margin="0 auto">
        <Box textAlign="right">
          <Link to="/add">
            <IconButton
              icon={<AddIcon />}
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
        <Heading as="h1" size="lg">
          Team Members
        </Heading>
        {teamMembers.length === 0 ? (
          <Text fontSize="lg" color="gray.500">No Team Members</Text>
        ) : (
          <>
            <Text fontSize="lg" mb={2} color="gray.500">
              You have {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}.    
            </Text>
            <Divider my={2} />
            <Box w="full">
              {teamMembers.map((member, index) => (
                <React.Fragment key={member.id}>
                  {index > 0 && <Divider my={4} />}
                  <Link to={`/edit/${member.id}`} key={member.id}>
                    <Flex align="center" p={3} mb={4} borderRadius="md" w="full">
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src={member.profilePicture}
                        alt={`Profile of ${member.name}`}
                        mr={4}
                      />
                      <Box flex="1">
                        <Text fontWeight="bold">
                          {member.firstName} {member.lastName}
                        </Text>
                        <Text>{member.phoneNumber}</Text>
                        <Text>{member.email}</Text>
                      </Box>
                      <Text fontSize="sm" color="gray.500">
                        {member.admin === "true" ? "Admin" : "Regular"}
                      </Text>
                    </Flex>
                  </Link>
                </React.Fragment>
              ))}
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ListPage;
