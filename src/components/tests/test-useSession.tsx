"use client";

import { useSession } from "next-auth/react";
import React from "react";

const TestUseAuth = () => {
  const { data, status } = useSession();
  console.log({ user: data?.user, status });

  return (
    <React.Fragment>
      <main>
        {status === "authenticated" ? (
          <>
            <p className="text-base text-red-600">
              You are authenticated user!{" "}
              <strong>{data?.user?.name ?? data?.user?.email}</strong>
            </p>
          </>
        ) : (
          <>
            <p className="text-red-600">Your are not unauthenticated user!</p>
          </>
        )}
      </main>
    </React.Fragment>
  );
};

export default TestUseAuth;
