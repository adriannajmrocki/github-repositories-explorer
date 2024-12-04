import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const renderWithQueryClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("HomePage Component", () => {
  it("renders the form with search input and button", () => {
    renderWithQueryClient(<HomePage />);
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("disables the search button when the input is empty", () => {
    renderWithQueryClient(<HomePage />);
    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeDisabled();
  });

  it("enables the search button when input is filled", async () => {
    renderWithQueryClient(<HomePage />);

    const input = screen.getByPlaceholderText("Enter username");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "testuser" } });
    await waitFor(() => expect(button).toBeEnabled());
  });
});
