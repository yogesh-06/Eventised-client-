"use client";
import { Settings, CalendarDays, Flag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

// Menu items.
const items = [
  {
    title: "Events",
    url: "/admin/events",
    icon: CalendarDays,
  },
  {
    title: "Attendees",
    url: "/admin/attendees",
    icon: Flag,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute && (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-between items-center">
                <Link href="/" className="text-red-500 text-2xl ">
                  E-<span className="text-black text-lg">ventised</span>
                </Link>{" "}
                {/* <SidebarTrigger /> */}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="mt-6 w-full">
                  {items.map((item) => {
                    const isActive =
                      pathname === item.url ||
                      pathname.startsWith(item.url + "/");

                    return (
                      <SidebarMenuItem key={item.title} className="w-full mt-2">
                        <SidebarMenuButton asChild>
                          <Link href={item.url}>
                            <div
                              className={clsx(
                                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors w-full text-lg",
                                isActive
                                  ? "bg-gray-100 text-red-400 font-medium"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
                              )}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <item.icon className="w-5 h-5" />
                              <span className="ms-1">{item.title}</span>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
