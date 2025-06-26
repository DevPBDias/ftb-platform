import loginBG from "@/assets/bg-login2.jpg";
import logoFTB from "@/assets/logo_ftb.png";
import { LoginForm } from "@/components/Login/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-12 items-center justify-center rounded-md">
              <Image
                src={logoFTB}
                alt="Logo FTB"
                className="h-10 w-10 object-cover"
                priority
              />
            </div>
            Federação Tocantinense de Basketball
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </section>
      <section className="bg-muted relative hidden lg:block">
        <Image
          src={loginBG}
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </section>
    </main>
  );
}
