import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import "./style.css";
import Button from "../../components/Button/Button";
import UsersList from "../../components/Users/UsersList/UsersList";
import { useUsers } from "../../hooks/users";

interface FormData {
  username: string;
}

export interface IUser {
  id: string;
  login: string;
}

const HomePage = () => {
  const [query, setQuery] = useState("");

  const {
    data: users,
    refetch,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useUsers(query, {
    queryOptions: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);

  const initialValues: FormData = {
    username: "",
  };

  return (
    <div className="home">
      <Formik
        initialValues={initialValues}
        onSubmit={({ username }) => {
          setQuery(username);
        }}
      >
        {({ values }) => {
          const { username } = values;

          return (
            <Form className="form">
              <Field
                name="username"
                placeholder="Enter username"
                className="input"
              />
              <Button type="submit" disabled={!username}>
                Search
              </Button>
            </Form>
          );
        }}
      </Formik>
      {isError ? <p className="info-text color-red">{error.message}</p> : null}
      {isLoading ? (
        <p className="info-text color-gray">Loading...</p>
      ) : isSuccess && users.length ? (
        <>
          <p className="info-text color-gray">Showing users for "{query}"</p>
          <UsersList users={users} />
        </>
      ) : isSuccess && !users.length ? (
        <p className="info-text color-red">No users found.</p>
      ) : null}
    </div>
  );
};

export default HomePage;
