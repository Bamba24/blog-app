import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/auth-server';
import AccountForm from './account-form';

export default async function InformationProfil() {
  const user = await getUser();

  if (!user) {
    return <div>Please log in to view your profile information.</div>;
  }

  return (
    <Card className="w-full max-w-xl mx-auto mt-20">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Edit profile</CardDescription>
      </CardHeader>
      <CardContent>
        <AccountForm defaultValues={{
          name: user.name || "",
          image: user.image || ""
        }} />
      </CardContent>
    </Card>
  );
}
