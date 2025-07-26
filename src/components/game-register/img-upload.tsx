import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormValues } from "@/schemas/game-register.schema";

interface ImageUploadSectionProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export function ImageUploadSection({
  register,
  errors,
}: ImageUploadSectionProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="gameImage">Imagem da Partida (Opcional)</Label>
      <Input
        id="gameImage"
        type="file"
        accept="image/*"
        {...register("gameImage", {
          setValueAs: (value) =>
            value && value.length > 0 ? value[0] : undefined,
        })}
      />
      {errors.gameImage && (
        <p className="text-red-500 text-sm">{errors.gameImage.message}</p>
      )}
    </div>
  );
}
