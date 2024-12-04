import "./style.css";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Button = ({ children, type = "button", disabled }: Props) => {
  return (
    <button className="button" type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
