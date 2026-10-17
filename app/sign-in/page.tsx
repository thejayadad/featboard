import Link from "next/link";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to share feedback and follow the ideas you support."
      footer={
        <>
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-orange-600 hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <AuthForm mode="sign-in" />
    </AuthCard>
  );
}