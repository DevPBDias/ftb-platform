import Image from "next/image";
import { Label } from "@/components/ui/label";

export function QRCodeSection() {
  return (
    <div className="flex flex-col items-center space-y-5 lg:w-1/2">
      <Label
        htmlFor="qr-code"
        className="text-xl font-semibold text-gray-800 dark:text-gray-200"
      >
        Escaneie para Pagar
      </Label>
      <div className="relative w-56 h-56 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/placeholder.svg?height=224&width=224"
          alt="QR Code Pix"
          layout="fill"
          objectFit="contain"
          className="p-3"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Abra seu aplicativo bancário e escaneie o QR Code acima para realizar o
        pagamento.
      </p>
    </div>
  );
}
