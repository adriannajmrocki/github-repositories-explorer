import { render, screen } from "@testing-library/react";
import Repo from "./Repo";
import { IRepo } from "../ReposList/ReposList";

jest.mock("../../../assets/icons/star.svg", () => ({
  ReactComponent: () => <svg data-testid="star-icon" />,
}));

describe("Repo Component", () => {
  const mockRepo: IRepo = {
    id: 1,
    name: "example-repo",
    description: "An example repository",
    stargazers_count: 42,
  };

  it("renders the repository name", () => {
    render(<Repo repo={mockRepo} />);
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
  });

  it("renders the repository description", () => {
    render(<Repo repo={mockRepo} />);
    expect(screen.getByText(mockRepo.description!)).toBeInTheDocument();
  });

  it("renders the correct number of stars", () => {
    render(<Repo repo={mockRepo} />);
    expect(
      screen.getByText(String(mockRepo.stargazers_count))
    ).toBeInTheDocument();
  });

  it("renders the star icon", () => {
    render(<Repo repo={mockRepo} />);
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("assigns the ref if provided", () => {
    const ref = jest.fn();
    render(<Repo repo={mockRepo} innerRef={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("renders without crashing when no ref is provided", () => {
    render(<Repo repo={mockRepo} />);
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
  });
});
