"use client";

import { makeStyles, Spinner, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    color: tokens.colorBrandForeground1,
  },
});

export function LoadingSpinner({ label = "Daten werden geladen..." }: { label?: string }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Spinner size="medium" label={label} />
    </div>
  );
}
