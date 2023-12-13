import { React, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  FormControl,
  FormLabel,
  IconButton,
  Text,
  Divider,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { addTeamMember } from "../../utils/crudOperations/crudOperations.js";

const AddPage = () => {
  const [adminBoolean, setAdminBoolean] = useState("false");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddingMember = () => {
    addTeamMember(firstName, lastName, adminBoolean, email, phoneNumber);
  };

  return (
    <Box p={6} boxShadow="sm" rounded="md" bg="white">
      <Stack spacing={4} direction="column" maxW="md" margin="0 auto">
        <Box textAlign="right">
          <Link to="/">
            <IconButton
              icon={<CloseIcon />}
              aria-label="Close Add Page"
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
          Add a Team Member
        </Heading>
        <Text fontSize="lg" mb={2} color="gray.500">
          Set email, location and role.
        </Text>
        <Divider my={2} />
        <Heading as="h1" size="md">
          Info
        </Heading>
        <FormControl id="first-name">
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="Charlene"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl id="last-name">
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Pham"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="char@instawork.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="phone-number">
          <FormLabel>Phone number</FormLabel>
          <Input
            placeholder="415-310-1619"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <FormControl as="fieldset">
          <Heading as="h1" size="md" mb="4">
            Role
          </Heading>
          <RadioGroup
            defaultValue="false"
            onChange={setAdminBoolean}
            value={adminBoolean}
          >
            <Stack direction="column">
              <Flex justify="space-between" align="center">
                <Text>Regular - Can't delete members</Text>
                <Radio value="false"></Radio>
              </Flex>
              <Divider my={2} />
              <Flex justify="space-between" align="center">
                <Text>Admin - Can delete members</Text>
                <Radio value="true"></Radio>
              </Flex>
            </Stack>
          </RadioGroup>
          <Divider my={4} />
        </FormControl>
        <Stack direction="row" spacing={4}>
          <Spacer />
          <Button colorScheme="blue" onClick={handleAddingMember}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddPage;
