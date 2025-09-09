import { getAllUsers } from "@/features/users/users-helper";
import React from "react";

const UsersPage = async () => {
  const users = await getAllUsers(7);
  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default UsersPage;
