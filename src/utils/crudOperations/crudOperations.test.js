import {
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
} from "./crudOperations";

describe("CRUD Operations", () => {
  beforeEach(() => {
    // Clear and initialize localStorage before each test
    window.localStorage.clear();
    window.localStorage.setItem("teamMembers", JSON.stringify([]));
  });

  test("addTeamMember adds a new team member", () => {
    addTeamMember("John", "Doe", "true", "john@instawork.com", "123-456-7890");

    const teamMembers = JSON.parse(localStorage.getItem("teamMembers"));
    expect(teamMembers).toHaveLength(1);
    expect(teamMembers[0]).toEqual({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      admin: "true",
      email: "john@instawork.com",
      phoneNumber: "123-456-7890",
      profilePicture: "https://via.placeholder.com/150",
    });
  });

  test("editTeamMember updates an existing team member", () => {
    // Add a member to edit
    window.localStorage.setItem(
      "teamMembers",
      JSON.stringify([
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          admin: "true",
          email: "john@instawork.com",
          phoneNumber: "123-456-7890",
          profilePicture: "https://via.placeholder.com/150",
        },
      ]),
    );

    editTeamMember(
      1,
      "Jane",
      "Doe",
      "true",
      "jane@instawork.com",
      "987-654-3210",
    );

    const teamMembers = JSON.parse(localStorage.getItem("teamMembers"));
    expect(teamMembers).toHaveLength(1);
    expect(teamMembers[0]).toEqual({
      id: 1,
      firstName: "Jane",
      lastName: "Doe",
      admin: "true",
      email: "jane@instawork.com",
      phoneNumber: "987-654-3210",
      profilePicture: "https://via.placeholder.com/150",
    });
  });

  test("deleteTeamMember removes a team member", () => {
    // Add a member to delete
    window.localStorage.setItem(
      "teamMembers",
      JSON.stringify([
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          admin: "true",
          email: "john@instawork.com",
          phoneNumber: "123-456-7890",
          profilePicture: "https://via.placeholder.com/150",
        },
      ]),
    );

    deleteTeamMember(1);

    const teamMembers = JSON.parse(localStorage.getItem("teamMembers"));
    expect(teamMembers).toHaveLength(0);
  });
});
