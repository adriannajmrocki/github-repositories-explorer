import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with provided children", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the button with default type "button"', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it('sets the button type to "submit" when specified', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it('disables the button when the "disabled" prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("calls the onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <button className="button" onClick={onClick}>
        Click me
      </button>
    );
    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders with the correct className", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button");
  });
});
