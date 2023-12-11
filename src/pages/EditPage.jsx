import { React, useEffect, useState } from 'react';
import { Box, Button, Heading, Input, Radio, RadioGroup, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import { DeleteIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { editTeamMember, deleteTeamMember } from '../utils/crud_operations.js';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    admin: "",
    email: "",
    phoneNumber: ""
  });

  // As soon as this page mounts, populate the fields
  useEffect(() => {
    const storedTeamMembers = JSON.parse(localStorage.getItem("teamMembers"));
    const currentMember = storedTeamMembers.find(member => member.id === Number(id));
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
      member.phoneNumber
    );
  };

  const handleDeleteMember = () => {
    deleteTeamMember(Number(id));
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box p={6} boxShadow="sm" rounded="md" bg="white">
      <Stack spacing={4} direction="column" maxW="md" margin="0 auto">
        <Box textAlign="right">
          <Link to="/">
            <CloseIcon w={6} h={6} />
          </Link>
        </Box>
        <Heading as="h1" size="lg" textAlign="center">
          Edit Team Member
        </Heading>
        <FormControl id="first-name" isRequired>
          <FormLabel>First name</FormLabel>
          <Input placeholder='First name' name="firstName" value={member.firstName} onChange={handleChange}/>
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input placeholder='Last name' name="lastName" value={member.lastName} onChange={handleChange}/>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder='Email' name="email" value={member.email} onChange={handleChange}/>
        </FormControl>
        <FormControl id="phone-number" isRequired>
          <FormLabel>Phone number</FormLabel>
          <Input placeholder='Phone number' name="phoneNumber" value={member.phoneNumber} onChange={handleChange}/>
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Role</FormLabel>
          <RadioGroup onChange={(value) => setMember({ ...member, admin: value })} value={member.admin}>
            <Stack direction="column">
              <Radio name="admin" value='false'>Regular - Can't delete members</Radio>
              <Radio name="admin" value='true'>Admin - Can delete members</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Stack direction="row" spacing={4}>
          <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={handleDeleteMember}>
            Delete
          </Button>
          <Button colorScheme="blue" onClick={handleEditingMember}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditPage;