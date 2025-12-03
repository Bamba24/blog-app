"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Convertir le chemin en parties : /dashboard/users → ["dashboard", "users"]
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-gray-50">
        {/* --- Header --- */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* --- Breadcrumb dynamique --- */}
          <Breadcrumb>
            <BreadcrumbList>
              {pathParts.map((part, index) => {
                const href = "/" + pathParts.slice(0, index + 1).join("/");
                const isLast = index === pathParts.length - 1;

                // Met la première lettre en majuscule
                const label =
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();

                return (
                  <BreadcrumbItem key={href}>
                    {!isLast ? (
                      <>
                        <BreadcrumbLink asChild>
                          <Link href={href}>{label}</Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    ) : (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* --- Contenu principal --- */}
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
