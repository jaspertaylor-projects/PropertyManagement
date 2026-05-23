import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/actions";
import { ManagerSidebar } from "@/components/manager/sidebar";
import { ManagerMobileNav } from "@/components/manager/mobile-nav";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ManagerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ManagerMobileNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
