import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, Flex, IconButton, Spacer, Container } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import teamMemberJson from '../dummy_data.json';

const ListPage = () => {
  // Fetch and display team members logic goes here
  const [teamMembers, setTeamMembers] = useState([]);

  // When the component first mounts, get the dummy_data.json and store in a state

  useEffect(() => {
    // Check if localStorage is populated, if it is, use localStorage
    const storedTeamMembers = localStorage.getItem("teamMembers");

    if (storedTeamMembers) {
      setTeamMembers(JSON.parse(storedTeamMembers));
    }
    else {
      // If not, populate localStorage with dummy_data.json
      localStorage.setItem("teamMembers", JSON.stringify(teamMemberJson));
      setTeamMembers(teamMemberJson);
    }
  }, []);

  return (
    <Container maxW="container.md" centerContent p={5}>
      <Flex w="full" justifyContent="flex-end" mb={4}>
        <Link to="/add">
          <IconButton
            icon={<AddIcon />}
            aria-label="Add team member"
            colorScheme="teal"
            size="lg"
            isRound={true}
          />
        </Link>
      </Flex>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Team Members
      </Heading>
      <Text fontSize="lg" mb={4}>
        You have {teamMembers.length} team members
      </Text>
      <Box w="full">
        {teamMembers.map((member) => (
          <Link to={`/edit/${member.id}`} key={member.id}>
            <Flex
              align="center"
              p={3}
              boxShadow="md"
              mb={4}
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
              w="full"
            >
              <Image
                borderRadius="full"
                boxSize="50px"
                src={member.profilePicture}
                alt={`Profile of ${member.name}`}
                mr={4}
              />
              <Box flex="1">
                <Text fontWeight="bold">{member.firstName} {member.lastName}</Text>
                <Text>{member.phoneNumber}</Text>
                <Text>{member.email}</Text>
              </Box>
              <Text fontSize="sm" color="gray.500">
                {member.admin === 'true' ? "Admin" : "Regular"}
              </Text>
            </Flex>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default ListPage;
