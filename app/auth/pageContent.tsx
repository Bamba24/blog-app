import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/auth-server';
import { Mail, User, Edit } from 'lucide-react';
import Link from 'next/link';

export default async function InformationProfil() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="w-full flex justify-center mt-20 text-lg text-muted-foreground">
        Please log in to view your profile information.
      </div>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto mt-24 shadow-md rounded-2xl">
      <CardHeader className="flex flex-col items-center gap-3">
        
        {/* Avatar */}
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-xl">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
          {user.image && <AvatarImage src={user.image} alt={user.name ?? "User"} />}
        </Avatar>

        {/* Title */}
        <div className="flex flex-col items-center">
          <CardTitle className="text-2xl font-semibold">
            Profile Information
          </CardTitle>
        </div>

        {/* Edit button */}
        <Link href="/auth/edit">
          <Button variant="outline" className="flex items-center gap-2 mt-1">
            <Edit size={16} />
            Edit Profile
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-5 mt-5">

        {/* Name */}
        <div className="flex items-center gap-3">
          <User className="text-gray-500" size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="text-lg font-medium">{user.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="text-gray-500" size={20} />
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
