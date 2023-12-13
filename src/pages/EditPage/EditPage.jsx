import { React, useEffect, useState } from "react";
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
import { DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  editTeamMember,
  deleteTeamMember,
  getTeamMembers,
} from "../../utils/crudOperations/crudOperations.js";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    admin: "",
    email: "",
    phoneNumber: "",
  });

  // As soon as this page mounts, populate the fields
  useEffect(() => {
    const storedTeamMembers = getTeamMembers();
    const currentMember = storedTeamMembers.find(
      (member) => member.id === Number(id),
    );
    if (currentMember) {
      setMember(currentMember);
    }
  }, [id]);

  const handleEditingMember = () => {
    editTeamMember(
      Number(id),
      member.firstName,
      member.lastName,
      member.admin,
      member.email,
      member.phoneNumber,
    );
  };

  const handleDeleteMember = () => {
    deleteTeamMember(Number(id));
    navigate("/");
  };

  // Updates the state of a member's field based on the name and value of the input field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          Edit Team Member
        </Heading>
        <Text fontSize="lg" mb={2} color="gray.500">
          Edit contact info, location and role.
        </Text>
        <Divider my={2} />
        <Heading as="h1" size="md">
          Info
        </Heading>
        <FormControl id="first-name">
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="First name"
            name="firstName"
            value={member.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="last-name">
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Last name"
            name="lastName"
            value={member.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            name="email"
            value={member.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="phone-number">
          <FormLabel>Phone number</FormLabel>
          <Input
            placeholder="Phone number"
            name="phoneNumber"
            value={member.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl as="fieldset">
          <Heading as="h1" size="md" mb="4">
            Role
          </Heading>
          <RadioGroup
            onChange={(value) => setMember({ ...member, admin: value })}
            value={member.admin}
          >
            <Stack direction="column">
              <Flex justify="space-between" align="center">
                <Text>Regular - Can't delete members</Text>
                <Radio
                  name="regular"
                  value="false"
                  aria-label="Regular - Can't delete members"
                ></Radio>
              </Flex>
              <Divider my={2} />
              <Flex justify="space-between" align="center">
                <Text>Admin - Can delete members</Text>
                <Radio
                  name="admin"
                  value="true"
                  aria-label="Admin - Can delete members"
                ></Radio>
              </Flex>
              <Divider my={2} />
            </Stack>
          </RadioGroup>
        </FormControl>

        <Stack direction="row" spacing={4}>
          <Button
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            onClick={handleDeleteMember}
            variant="outline"
          >
            Delete
          </Button>
          <Spacer />
          <Button colorScheme="blue" onClick={handleEditingMember}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditPage;
