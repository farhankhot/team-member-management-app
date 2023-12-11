import { React, useState } from 'react';
import { Box, Button, Heading, Input, Radio, RadioGroup, Stack, FormControl, FormLabel, Icon } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { addTeamMember } from '../utils/crud_operations.js';

const AddPage = () => {
  const [adminBoolean, setAdminBoolean] = useState('false');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddingMember = () => {
    addTeamMember(firstName, lastName, adminBoolean, email, phoneNumber);
  };

  return (
    <Box p={6} boxShadow="sm" rounded="md" bg="white">
      <Stack spacing={4} direction="column" maxW="md" margin="0 auto">
        <Box textAlign="right">
          <Link to="/">
            <Icon as={CloseIcon} w={6} h={6} />
          </Link>
        </Box>
        <Heading as="h1" size="lg" textAlign="center">
          Add a Team Member
        </Heading>
        <FormControl id="first-name">
          <FormLabel>First name</FormLabel>
          <Input placeholder='Charlene' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>
        <FormControl id="last-name">
          <FormLabel>Last name</FormLabel>
          <Input placeholder='Pham' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input placeholder='charlene@instawork.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="phone-number">
          <FormLabel>Phone number</FormLabel>
          <Input placeholder='415-310-1619' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Role</FormLabel>
          <RadioGroup defaultValue='false' onChange={setAdminBoolean} value={adminBoolean}>
            <Stack direction="column">
              <Radio value="false">Regular - Can't delete members</Radio>
              <Radio value="true">Admin - Can delete members</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Button colorScheme="blue" onClick={handleAddingMember}>Save</Button>
      </Stack>
    </Box>
  );
};

export default AddPage;
