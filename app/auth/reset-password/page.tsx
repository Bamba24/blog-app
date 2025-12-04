import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
