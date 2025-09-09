import React from "react";
import { auth } from "@/lib/next-auth/auth";
import { getUserDatail } from "@/features/user-info/userInfo-helper";
import TestUseAuth from "@/components/tests/test-useSession";
import { SessionProvider } from "next-auth/react";

const UserInfo = async () => {
  const session = await auth();
  const user = await getUserDatail(session?.user?.email as string);
  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <pre>{user && JSON.stringify(user, null, 2)}</pre>
      </main>

      {/* test useSession */}
      {/* <SessionProvider>
        <TestUseAuth />
      </SessionProvider> */}
    </React.Fragment>
  );
};

export default UserInfo;
