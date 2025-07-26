"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentHeader } from "@/components/payment/Header";
import { QRCodeSection } from "@/components/payment/QrCodeSection";
import { PixCopyPasteSection } from "@/components/payment/CopyPasteSection";
import { PaymentFooter } from "@/components/payment/Footer";
import ModernNavbar from "@/components/Hero/Navbar";

export default function PixPaymentPage() {
  const pixCode =
    "00020126580014BR.GOV.BCB.PIX0136a3e4b5c6-d7e8-f9a0-b1c2-d3e4f5a6b7c85204000053039865802BR5925FULANO DE TAL PAGADOR6008BRASILIA62070503***6304B1A2";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "Copied!" state after 2 seconds
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <ModernNavbar />
      <Card className="w-full max-w-md lg:max-w-3xl">
        <PaymentHeader />
        <CardContent className="space-y-8 lg:flex lg:flex-row lg:items-start lg:justify-center lg:space-y-0 lg:gap-x-12">
          <QRCodeSection />
          <PixCopyPasteSection
            pixCode={pixCode}
            copied={copied}
            onCopy={handleCopy}
          />
        </CardContent>
        <PaymentFooter />
      </Card>
    </div>
  );
}
