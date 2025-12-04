"use client"

import * as React from "react"
import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useQuery } from "@tanstack/react-query"
import { Categories } from "@/app/types/type"
import Image from "next/image"


type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  href: string
  title: string
  image: string
  children?: React.ReactNode
}


export function NavigationMenuDemo() {
  const isMobile = useIsMobile()

  // 🚀 Récupération avec useQuery
    const { data = [] } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      }
    });

  return (
    <>
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explorer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <h2 className="font-serif mb-2">Categories</h2>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {data.map((component: Categories) => (
                <ListItem
                  image={component.image}
                  key={component.id}
                  title={component.titre}
                  href={`/categories/${component.slug}`}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </>
  )
}

function ListItem({ title, image, children, href, ...props }: ListItemProps) {
  return (
    <>
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className= "flex gap-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            <Image
              src={image || "/placeholder.png"}
              width={50}
              height={50}
              alt={title}
              className="rounded-md mb-2 border border-zinc-200 dark:border-zinc-800"
            />

            <div>
              <div className="text-sm leading-none font-medium">{title}</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
   </>
  )
}