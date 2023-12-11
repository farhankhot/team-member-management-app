export const addTeamMember = (firstName, lastName, adminBoolean, email, phoneNumber) => {
  let currentTeamMembers = JSON.parse(localStorage.getItem("teamMembers"));
  const lastIdOfCurrentTeamMembers = currentTeamMembers[currentTeamMembers.length - 1].id;

  const newMember = {
    "id": lastIdOfCurrentTeamMembers + 1,
    "firstName": firstName,
    "lastName": lastName,
    "admin": adminBoolean,
    "email": email,
    "phoneNumber": phoneNumber,
    profilePicture: "https://via.placeholder.com/150"
  };

  currentTeamMembers.push(newMember);
  localStorage.setItem("teamMembers", JSON.stringify(currentTeamMembers));
}

export const editTeamMember = (id, firstName, lastName, adminBoolean, email, phoneNumber) => {
  let currentTeamMembers = JSON.parse(localStorage.getItem("teamMembers"));

  const editedMemberInfo = {
    "id": id,
    "firstName": firstName,
    "lastName": lastName,
    "admin": adminBoolean,
    "email": email,
    "phoneNumber": phoneNumber,
    profilePicture: "https://via.placeholder.com/150"
  };

  const memberIndex = currentTeamMembers.findIndex((member) => member.id === id);

  if (memberIndex !== -1) {
    currentTeamMembers[memberIndex] = editedMemberInfo;
  }
  else {
    console.error("Member not found");
  }
  localStorage.setItem("teamMembers", JSON.stringify(currentTeamMembers));
}

export const deleteTeamMember = (id) => {
  let currentTeamMembers = JSON.parse(localStorage.getItem("teamMembers"));

  const memberIndex = currentTeamMembers.findIndex((member) => member.id === id);

  if (memberIndex !== -1) {
    currentTeamMembers.splice(memberIndex, 1);
  }
  else {
    console.error("Member not found");
  }
  localStorage.setItem("teamMembers", JSON.stringify(currentTeamMembers));
}