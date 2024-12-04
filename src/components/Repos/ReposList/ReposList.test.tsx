import { render, screen } from "@testing-library/react";
import ReposList, { IRepo } from "./ReposList";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("../../../hooks/repos", () => ({
  useInfiniteRepos: jest.fn(),
}));

jest.mock("../Repo/Repo", () => ({
  __esModule: true,
  default: ({ repo, innerRef }: { repo: IRepo; innerRef: any }) => (
    <div data-testid="repo-item" ref={innerRef}>
      {repo.name}
    </div>
  ),
}));

describe("ReposList Component", () => {
  const mockUseInView = require("react-intersection-observer").useInView;
  const mockUseInfiniteRepos = require("../../../hooks/repos").useInfiniteRepos;

  const mockRepos: IRepo[] = [
    { id: 1, name: "Repo 1", stargazers_count: 10 },
    { id: 2, name: "Repo 2", stargazers_count: 20 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: false });
    mockUseInfiniteRepos.mockReturnValue({
      data: { pages: [mockRepos] },
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });
  });

  it("renders loading text when `isLoading` is true", () => {
    mockUseInfiniteRepos.mockReturnValueOnce({
      ...mockUseInfiniteRepos(),
      isLoading: true,
    });

    render(<ReposList username="testuser" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders an error message when `isError` is true", () => {
    mockUseInfiniteRepos.mockReturnValueOnce({
      ...mockUseInfiniteRepos(),
      isError: true,
      error: { message: "Failed to fetch repos" },
    });

    render(<ReposList username="testuser" />);
    expect(screen.getByText("Failed to fetch repos")).toBeInTheDocument();
  });

  it("renders 'No repos found' when there are no repositories", () => {
    mockUseInfiniteRepos.mockReturnValueOnce({
      ...mockUseInfiniteRepos(),
      data: { pages: [] },
    });

    render(<ReposList username="testuser" />);
    expect(screen.getByText("No repos found.")).toBeInTheDocument();
  });

  it("renders a list of repositories", () => {
    render(<ReposList username="testuser" />);

    const repoItems = screen.getAllByTestId("repo-item");
    expect(repoItems).toHaveLength(mockRepos.length);
    expect(repoItems[0]).toHaveTextContent("Repo 1");
    expect(repoItems[1]).toHaveTextContent("Repo 2");
  });

  it("renders 'Loading more...' when `isFetchingNextPage` is true", () => {
    mockUseInfiniteRepos.mockReturnValueOnce({
      ...mockUseInfiniteRepos(),
      isFetchingNextPage: true,
    });

    render(<ReposList username="testuser" />);
    expect(screen.getByText("Loading more...")).toBeInTheDocument();
  });

  it("calls `fetchNextPage` when inView is true and hasNextPage is true", () => {
    const mockFetchNextPage = jest.fn();
    mockUseInfiniteRepos.mockReturnValueOnce({
      ...mockUseInfiniteRepos(),
      fetchNextPage: mockFetchNextPage,
    });
    mockUseInView.mockReturnValueOnce({ ref: jest.fn(), inView: true });

    render(<ReposList username="testuser" />);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("does not call `fetchNextPage` when inView is true and hasNextPage is false", () => {
    const mockFetchNextPage = jest.fn();
    mockUseInfiniteRepos.mockReturnValueOnce({
      ...mockUseInfiniteRepos(),
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
    });
    mockUseInView.mockReturnValueOnce({ ref: jest.fn(), inView: true });

    render(<ReposList username="testuser" />);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });
});
