"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  makeStyles,
  tokens,
  Text,
  Badge,
  mergeClasses,
} from "@fluentui/react-components";
import {
  ShieldCheckmark24Regular,
  ShieldCheckmark24Filled,
  Warning24Regular,
  Warning24Filled,
  People24Regular,
  People24Filled,
  LockClosed24Regular,
  LockClosed24Filled,
  ShieldKeyhole24Regular,
  ShieldKeyhole24Filled,
  PersonWarning24Regular,
  PersonWarning24Filled,
  Laptop24Regular,
  Laptop24Filled,
  AppGeneric24Regular,
  AppGeneric24Filled,
  Clipboard24Regular,
  Clipboard24Filled,
  DocumentSearch24Regular,
  DocumentSearch24Filled,
  ArrowDownload24Regular,
  ArrowDownload24Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  sidebar: {
    width: "260px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    overflowY: "auto",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 20px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  logoIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  logoText: {
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    flex: 1,
    padding: "8px 12px",
    overflowY: "auto",
  },
  group: {
    marginBottom: "8px",
  },
  groupTitle: {
    padding: "12px 8px 4px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
    color: tokens.colorNeutralForeground3,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    color: tokens.colorNeutralForeground2,
    fontSize: "13px",
    fontWeight: 400,
    transition: "all 0.15s ease",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: 600,
  },
  navItemIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    fontSize: "20px",
  },
  navItemLabel: {
    flex: 1,
  },
  badge: {
    marginLeft: "auto",
  },
});

interface NavItemConfig {
  label: string;
  href: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  badge?: number;
  badgeColor?: "danger" | "warning" | "important" | "informative" | "success";
}

interface NavGroupConfig {
  title: string;
  items: NavItemConfig[];
}

const navGroups: NavGroupConfig[] = [
  {
    title: "Übersicht",
    items: [
      {
        label: "Security Score",
        href: "/dashboard",
        icon: <ShieldCheckmark24Regular />,
        iconActive: <ShieldCheckmark24Filled />,
      },
      {
        label: "Alerts",
        href: "/dashboard/alerts",
        icon: <Warning24Regular />,
        iconActive: <Warning24Filled />,
        badge: 7,
        badgeColor: "danger",
      },
    ],
  },
  {
    title: "Identität",
    items: [
      {
        label: "Benutzer & Rollen",
        href: "/dashboard/users",
        icon: <People24Regular />,
        iconActive: <People24Filled />,
      },
      {
        label: "Conditional Access",
        href: "/dashboard/conditional-access",
        icon: <LockClosed24Regular />,
        iconActive: <LockClosed24Filled />,
        badge: 2,
        badgeColor: "informative",
      },
      {
        label: "MFA Status",
        href: "/dashboard/mfa-status",
        icon: <ShieldKeyhole24Regular />,
        iconActive: <ShieldKeyhole24Filled />,
        badge: 12,
        badgeColor: "danger",
      },
      {
        label: "Risiko-Benutzer",
        href: "/dashboard/risky-users",
        icon: <PersonWarning24Regular />,
        iconActive: <PersonWarning24Filled />,
        badge: 3,
        badgeColor: "danger",
      },
    ],
  },
  {
    title: "Geräte & Apps",
    items: [
      {
        label: "Intune Geräte",
        href: "/dashboard/devices",
        icon: <Laptop24Regular />,
        iconActive: <Laptop24Filled />,
        badge: 5,
        badgeColor: "warning",
      },
      {
        label: "App-Berechtigungen",
        href: "/dashboard/app-permissions",
        icon: <AppGeneric24Regular />,
        iconActive: <AppGeneric24Filled />,
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        label: "DSGVO Checkliste",
        href: "/dashboard/gdpr-checklist",
        icon: <Clipboard24Regular />,
        iconActive: <Clipboard24Filled />,
      },
      {
        label: "Audit Logs",
        href: "/dashboard/audit-logs",
        icon: <DocumentSearch24Regular />,
        iconActive: <DocumentSearch24Filled />,
        badge: 247,
        badgeColor: "informative",
      },
      {
        label: "Report Export",
        href: "/dashboard/report-export",
        icon: <ArrowDownload24Regular />,
        iconActive: <ArrowDownload24Filled />,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const styles = useStyles();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <ShieldCheckmark24Filled />
        </div>
        <div className={styles.logoText}>
          <Text weight="bold" size={400}>
            M365 Security
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Audit Dashboard
          </Text>
        </div>
      </div>

      <nav className={styles.nav}>
        {navGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <div className={styles.groupTitle}>{group.title}</div>
            {group.items.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mergeClasses(
                    styles.navItem,
                    isActive ? styles.navItemActive : undefined
                  )}
                >
                  <span className={styles.navItemIcon}>
                    {isActive ? item.iconActive : item.icon}
                  </span>
                  <span className={styles.navItemLabel}>{item.label}</span>
                  {item.badge !== undefined && (
                    <Badge
                      size="small"
                      appearance="filled"
                      color={item.badgeColor}
                      className={styles.badge}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
