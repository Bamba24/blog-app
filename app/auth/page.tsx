import { Suspense } from "react";
import InformationProfil from "./pageContent";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InformationProfil />
    </Suspense>
  );
}
