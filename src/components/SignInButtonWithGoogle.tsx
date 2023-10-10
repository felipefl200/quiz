"use client";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./ui/icons";

type Props = {
  text: string;
};

export function SignInButtonWithGoogle({ text }: Props) {
  return (
    <Button
      onClick={() => {
        signIn("google").catch(console.error);
      }}
      variant="outline"
    >
      <Icons.google className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
}
