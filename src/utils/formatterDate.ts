export function formatDate(dateString: string): string {
  if (!dateString) return "Data a definir";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    return "Data inválida";
  }
}
