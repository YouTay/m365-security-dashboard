"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebarPlaceholder: {
    width: "260px",
    flexShrink: 0,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
  },
});

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.sidebarPlaceholder} />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
