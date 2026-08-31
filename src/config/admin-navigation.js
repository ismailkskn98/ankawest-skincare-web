export const adminNavigation = [
  { href: "/admin", label: "Genel bakış", icon: "house", exact: true },
  { href: "/admin/products", label: "Ürünler", icon: "package" },
  { href: "/admin/categories", label: "Kategoriler", icon: "squares" },
  { href: "/admin/content", label: "Site içerikleri", icon: "article" },
  {
    href: "/admin/users",
    label: "Yöneticiler",
    icon: "users",
    adminOnly: true,
  },
];
