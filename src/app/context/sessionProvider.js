"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const SessionProvider = ({ session, children }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProvider;
