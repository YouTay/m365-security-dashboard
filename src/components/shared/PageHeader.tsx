"use client";

import { makeStyles, Text, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    marginBottom: "24px",
  },
  title: {
    marginBottom: "4px",
  },
  description: {
    color: tokens.colorNeutralForeground3,
  },
});

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Text as="h1" size={700} weight="bold" block className={styles.title}>
        {title}
      </Text>
      {description && (
        <Text size={300} className={styles.description}>
          {description}
        </Text>
      )}
    </div>
  );
}
