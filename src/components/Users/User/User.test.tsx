import { render, screen, fireEvent } from "@testing-library/react";
import User from "./User";

// Mockowanie komponentu ReposList
jest.mock("../../Repos/ReposList/ReposList", () => ({
  __esModule: true,
  default: ({ username }: { username: string }) => (
    <div data-testid="repos-list">Repositories of {username}</div>
  ),
}));

describe("User Component", () => {
  const mockSetActiveUser = jest.fn();
  const mockUsername = "testuser";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the username", () => {
    render(
      <User
        username={mockUsername}
        activeUser=""
        setActiveUser={mockSetActiveUser}
      />
    );

    expect(screen.getByText(mockUsername)).toBeInTheDocument();
  });

  it("does not render ReposList when user is inactive", () => {
    render(
      <User
        username={mockUsername}
        activeUser=""
        setActiveUser={mockSetActiveUser}
      />
    );

    expect(screen.queryByTestId("repos-list")).not.toBeInTheDocument();
  });

  it("renders ReposList when user is active", () => {
    render(
      <User
        username={mockUsername}
        activeUser={mockUsername}
        setActiveUser={mockSetActiveUser}
      />
    );

    expect(screen.getByTestId("repos-list")).toBeInTheDocument();
    expect(
      screen.getByText(`Repositories of ${mockUsername}`)
    ).toBeInTheDocument();
  });

  it("calls setActiveUser with username when ChevronDownIcon is clicked and user is inactive", () => {
    render(
      <User
        username={mockUsername}
        activeUser=""
        setActiveUser={mockSetActiveUser}
      />
    );

    const chevronIcon = screen.getByTestId("chevron-icon");
    fireEvent.click(chevronIcon);

    expect(mockSetActiveUser).toHaveBeenCalledTimes(1);
    expect(mockSetActiveUser).toHaveBeenCalledWith(mockUsername);
  });

  it("calls setActiveUser with an empty string when ChevronDownIcon is clicked and user is active", () => {
    render(
      <User
        username={mockUsername}
        activeUser={mockUsername}
        setActiveUser={mockSetActiveUser}
      />
    );

    const chevronIcon = screen.getByTestId("chevron-icon");
    fireEvent.click(chevronIcon);

    expect(mockSetActiveUser).toHaveBeenCalledTimes(1);
    expect(mockSetActiveUser).toHaveBeenCalledWith("");
  });

  it("applies the 'icon-rotate' class to ChevronDownIcon when the user is active", () => {
    render(
      <User
        username={mockUsername}
        activeUser={mockUsername}
        setActiveUser={mockSetActiveUser}
      />
    );

    const chevronIcon = screen.getByTestId("chevron-icon");
    expect(chevronIcon).toHaveClass("icon-rotate");
  });

  it("does not apply the 'icon-rotate' class to ChevronDownIcon when the user is inactive", () => {
    render(
      <User
        username={mockUsername}
        activeUser=""
        setActiveUser={mockSetActiveUser}
      />
    );

    const chevronIcon = screen.getByTestId("chevron-icon");
    expect(chevronIcon).not.toHaveClass("icon-rotate");
  });
});
