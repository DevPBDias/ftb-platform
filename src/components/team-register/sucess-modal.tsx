"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export const SuccessModal = React.memo(function SuccessModal({
  isOpen,
  onClose,
}: SuccessModalProps) {
  const route = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-2xl font-bold">Sucesso!</DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Sua relação foi enviada com sucesso.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
          <Button
            onClick={() => route.push("/inscricao/pagamento")}
            type="button"
            variant="ftb"
          >
            Pagar inscrição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
