import { render, screen, fireEvent } from "@testing-library/react";
import UsersList from "./UsersList";
import { IUser } from "../../../pages/HomePage/HomePage";

jest.mock("../User/User", () => ({
  __esModule: true,
  default: ({
    username,
    activeUser,
    setActiveUser,
  }: {
    username: string;
    activeUser: string;
    setActiveUser: (username: string) => void;
  }) => (
    <div
      data-testid="user-item"
      data-active={activeUser === username}
      onClick={() => setActiveUser(username)}
    >
      {username}
    </div>
  ),
}));

describe("UsersList Component", () => {
  const mockUsers: IUser[] = [
    { id: "1", login: "user1" },
    { id: "2", login: "user2" },
    { id: "3", login: "user3" },
  ];

  it("renders a list of users", () => {
    render(<UsersList users={mockUsers} />);

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.login)).toBeInTheDocument();
    });
  });

  it("renders the correct number of User components", () => {
    render(<UsersList users={mockUsers} />);
    const userItems = screen.getAllByTestId("user-item");
    expect(userItems).toHaveLength(mockUsers.length);
  });

  it("handles setting the active user", () => {
    render(<UsersList users={mockUsers} />);

    const userItems = screen.getAllByTestId("user-item");

    fireEvent.click(userItems[0]);
    expect(userItems[0]).toHaveAttribute("data-active", "true");

    fireEvent.click(userItems[1]);
    expect(userItems[1]).toHaveAttribute("data-active", "true");
    expect(userItems[0]).toHaveAttribute("data-active", "false");
  });

  it("does not crash when the users list is empty", () => {
    render(<UsersList users={[]} />);
    expect(screen.queryByTestId("user-item")).not.toBeInTheDocument();
  });
});
