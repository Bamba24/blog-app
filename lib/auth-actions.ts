// app/actions/auth-actions.ts
"use server"; // IMPORTANT : La directive doit être au sommet du fichier/fonction.

import { auth } from '@/lib/auth'; // Votre instance serveur Better Auth
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function logoutAction() {
    await auth.api.signOut({
        headers: await headers()
    });
    
    // Redirige après la déconnexion
    redirect('/auth/signIn');
}

