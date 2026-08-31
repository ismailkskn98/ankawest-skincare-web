import PageHeader from "@/components/admin/page-header";
import UserManager from "@/components/admin/users/user-manager";
import { getAdminList } from "@/lib/admin/data";
import { requireAdministrator } from "@/lib/auth/dal";

export const metadata = { title: "Yönetici Kullanıcıları" };

export default async function UsersPage() {
  const currentUser = await requireAdministrator();
  const users = await getAdminList("users", {
    page: 1,
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <main className="admin-page">
      <PageHeader
        title="Yönetici kullanıcıları"
        description="Panel erişimini, kullanıcı rollerini ve iki aşamalı doğrulama durumunu yönetin."
      />
      <UserManager currentUserId={currentUser.id} initialRecords={users.records} />
    </main>
  );
}
