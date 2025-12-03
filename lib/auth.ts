import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import {resend} from "./resend";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    additionalFields: {
      role: {
        type: "string",
        required: true,
        public: true,        // 👈 IMPORTANT : rendu dans session.user
        mutable: false,
      }
    },
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: false, //defaults to true
     sendResetPassword: async ({ user, url}) => {
            await resend.emails.send({
                to: user.email,
                subject: 'Reset your password',
                text: `Click the link to reset your password: ${url}`,
                from: process.env.EMAIL_FROM as string,
            })
        }
  }, 

  socialProviders: {
    
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
         google: {
        prompt: "select_account", 
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
       },
  },
 
});