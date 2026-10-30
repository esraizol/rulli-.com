export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  isExternal?: boolean;
  badge?: string;
  icon?: string;
}

export interface FooterColumn {
  title: string;
  links: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
