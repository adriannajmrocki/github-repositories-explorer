import { useState } from "react";
import { IUser } from "../../../pages/HomePage/HomePage";
import User from "../User/User";
import "./style.css";

interface Props {
  users: IUser[];
}

const UsersList = ({ users }: Props) => {
  const [activeUser, setActiveUser] = useState("");

  return (
    <div className="users-list">
      {users.map((user) => (
        <User
          key={user.id}
          username={user.login}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
        />
      ))}
    </div>
  );
};

export default UsersList;
