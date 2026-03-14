export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  badgeColor?: "danger" | "warning" | "success" | "informative";
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
