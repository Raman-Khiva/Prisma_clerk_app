import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex gap-10">
        <SignInButton />
        <UserButton />
      </div>
    </main>
  );
}
