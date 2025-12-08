          
import { getUser } from "@/lib/auth-server";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Button } from "./button";
import { LogOut, User2 } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import {logoutAction} from "@/lib/auth-actions"
import { Suspense } from "react";
import {NavigationMenuDemo} from "@/components/navigation-menu";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white px-6 sm:px-6 lg:px-8">
      <nav className="flex w-full max-w-5xl justify-between items-center mx-auto py-4">
        <span className="font-bold">Blog Dev</span>

        <div className="flex items-center gap-4">

        <NavigationMenuDemo />

          <Link href="/articles" className="text-black font-bold px-4 py-2">
            Articles
          </Link>

          <Suspense
            fallback={<div className="text-black font-bold px-4 py-2">Loading...</div>}
          >
            <AuthButton />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}

export async function AuthButton() {
  const user = await getUser();

  if (!user) {
    return (
      <Link href="/auth/signIn" className="text-black  font-bold px-4 py-2">
        S&apos;inscrire
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Avatar className="size-6">
            {user.image && <AvatarImage src={user.image} alt={user.name ?? "User"} />}
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p>{user.name}</p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/auth" className="flex items-center gap-2">
            <User2 className="size-3" />
            Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <form>
            <button
              formAction={logoutAction}
              >
              <div className="flex items-center gap-2">
                <LogOut size={6} />
                logout
              </div>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
