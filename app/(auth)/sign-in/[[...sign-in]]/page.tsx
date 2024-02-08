import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-secondary-foreground hover:bg-secondary-foreground",
        },
      }}
    />
  );
}
