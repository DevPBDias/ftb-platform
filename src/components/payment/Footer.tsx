"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function PaymentFooter() {
  const route = useRouter();

  return (
    <CardFooter className="flex justify-center pt-6">
      <Button
        onClick={() => route.push("/")}
        variant="outline"
        className="cursor-pointer w-full bg-gradient-to-r from-[#162456] hover:text-white to-blue-600 hover:from-blue-600 hover:to-[#162456] text-white py-3 text-base"
      >
        Já Paguei
      </Button>
    </CardFooter>
  );
}
