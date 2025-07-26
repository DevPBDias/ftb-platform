import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function PaymentHeader() {
  return (
    <CardHeader className="text-center space-y-2">
      <CardTitle className="text-3xl font-bold">
        Pagamento de Inscrição
      </CardTitle>
      <CardDescription className="text-md text-gray-600 dark:text-gray-400">
        Escaneie o QR Code ou copie o código Pix para completar seu pagamento.
      </CardDescription>
    </CardHeader>
  );
}
