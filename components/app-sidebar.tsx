"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  UserIcon,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"



// This is sample data.
const data = {
  teams: [
    {
      name: "Blog Dev",
      logo: GalleryVerticalEnd,
      plan: "Personal",
    },
  ],
  navMain: [
    {
      title: "Tableau de Bord",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Gestion des catégories",
      url: "/dashboard/categories",
      icon: BookOpen,
      items: [
        {
          title: "Les catégories",
          url: "/dashboard/categories",
        },
        {
          title: "Ajouter une catégorie",
          url: "/dashboard/categories/nouveau",
        },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Gestions des utilisateurs",
      url: "/dashboard/utilisateurs",
      icon: UserIcon,
      items: [
        {
          title: "Les utilisateurs",
          url: "/dashboard/utilisateurs",
        },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      ],
    },
    {
      title: "Gestion des articles",
      url: "/dasboard/Articles",
      icon: Settings2,
      items: [
        {
          title: "Les articles",
          url: "/dashboard/articles",
        },
        {
          title: "Ajouter un article",
          url: "/dashboard/articles/nouveau",
        },
        // {
        //   title: "Billing",
        //   url: "#",
        // },
        // {
        //   title: "Limits",
        //   url: "#",
        // },
      ],
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

const { data: session } = useSession()

  const user = session?.user

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
            name: user?.name,
            email: user?.email,
            avatar: user?.image ?? "avatar.png",
          }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
