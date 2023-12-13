const LOCAL_STORAGE_KEY = "teamMembers";

// Retrieves team members from localStorage and returns them as an array.
export const getTeamMembers = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
};

// Saves the provided team members array to localStorage.
const setTeamMembers = (teamMembers) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teamMembers));
};

// Finds and returns the index of a team member based on the given id.
const findMemberIndex = (id) => {
  const teamMembers = getTeamMembers();
  return teamMembers.findIndex((member) => member.id === id);
};

// Adds a new team member with provided details to the team members list in localStorage.
export const addTeamMember = (
  firstName,
  lastName,
  adminBoolean,
  email,
  phoneNumber,
) => {
  const teamMembers = getTeamMembers();
  const lastMemberId =
    teamMembers.length > 0 ? teamMembers[teamMembers.length - 1].id : 0;

  const newMember = {
    id: lastMemberId + 1,
    firstName,
    lastName,
    admin: adminBoolean,
    email,
    phoneNumber,
    profilePicture: "https://via.placeholder.com/150",
  };

  teamMembers.push(newMember);
  setTeamMembers(teamMembers);
};

// Updates the details of an existing team member in the team members list in localStorage.
export const editTeamMember = (
  id,
  firstName,
  lastName,
  adminBoolean,
  email,
  phoneNumber,
) => {
  const teamMembers = getTeamMembers();
  const memberIndex = findMemberIndex(id);

  if (memberIndex !== -1) {
    teamMembers[memberIndex] = {
      id,
      firstName,
      lastName,
      admin: adminBoolean,
      email,
      phoneNumber,
      profilePicture: "https://via.placeholder.com/150",
    };
    setTeamMembers(teamMembers);
  } else {
    console.error("Member not found");
  }
};

// Removes a team member from the team members list in localStorage based on the given id.
export const deleteTeamMember = (id) => {
  const teamMembers = getTeamMembers();
  const memberIndex = findMemberIndex(id);

  if (memberIndex !== -1) {
    teamMembers.splice(memberIndex, 1);
    setTeamMembers(teamMembers);
  } else {
    console.error("Member not found");
  }
};
