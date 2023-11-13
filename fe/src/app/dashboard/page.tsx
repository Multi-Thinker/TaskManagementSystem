"use client";

import Container from "@/src/component/Container";
import DashboardWithRecords from "@/src/component/DashboardWithRecords";
import NavbarContainer from "@/src/component/Navbar";
import { SessionProvider } from "@/src/hooks/use-session";
import { TaskProvider } from "@/src/hooks/use-tasks";

export default function Dashboard() {
  return (
    <SessionProvider>
      <TaskProvider>
        <>
          <NavbarContainer />
          <Container>
            <DashboardWithRecords />
          </Container>
        </>
      </TaskProvider>
    </SessionProvider>
  );
}
