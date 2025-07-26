"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

interface PixCopyPasteSectionProps {
  pixCode: string;
  copied: boolean;
  onCopy: () => void;
}

export function PixCopyPasteSection({
  pixCode,
  copied,
  onCopy,
}: PixCopyPasteSectionProps) {
  return (
    <div className="space-y-4 lg:w-1/2">
      <Label
        htmlFor="pix-code"
        className="text-xl font-semibold text-gray-800 dark:text-gray-200"
      >
        Copie e Pague
      </Label>
      <div className="flex flex-col items-start justify-start gap-3">
        <Textarea
          id="pix-code"
          value={pixCode}
          readOnly
          rows={5}
          className="w-full resize-none font-mono text-sm p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm"
        />
        <Button
          onClick={onCopy}
          className={cn(
            "w-full transition-all duration-300 ease-in-out py-3 text-base bg-gradient-to-r text-white",
            copied
              ? "bg-gradient-to-r from-green-500/90 to-emerald-600/90 scale-[1.01]"
              : "from-[#162456] to-blue-600 hover:from-blue-600 hover:to-[#162456]"
          )}
          aria-label="Copiar código Pix"
        >
          {copied ? (
            <>
              <CheckIcon className="mr-2 h-5 w-5" /> Copiado!
            </>
          ) : (
            <>
              <CopyIcon className="mr-2 h-5 w-5" /> Copiar
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Cole este código na opção Pix &quot;Copia e Cola&quot; do seu aplicativo
        bancário.
      </p>
    </div>
  );
}
