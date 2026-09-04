import AdminShell from "@/components/admin/admin-shell";
import { requireAdminSession } from "@/lib/auth/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPanelLayout({ children }) {
  const user = await requireAdminSession();
  return <AdminShell user={user}>{children}</AdminShell>;
}
