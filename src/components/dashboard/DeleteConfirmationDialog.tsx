import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { TeamData } from "@/types/teams";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  clubeToDelete: TeamData | null;
}

export function DeleteConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  clubeToDelete 
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o clube{" "}
            <span className="font-semibold text-gray-900">
              {clubeToDelete?.teamName}
            </span>
            ? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Excluir Clube
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 