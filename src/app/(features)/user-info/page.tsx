import React from "react";
import { auth } from "@/lib/next-auth/auth";
import { getUserDatail } from "@/features/user-info/helper";

const UserInfo = async () => {
  const session = await auth();
  const user = await getUserDatail(session?.user?.email as string);
  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        {user && JSON.stringify(user, null, 2)}
      </main>
    </React.Fragment>
  );
};

export default UserInfo;
