import { Link } from "react-router-dom";
import "./style.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-message">Page not found</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default ErrorPage;
