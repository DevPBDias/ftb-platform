export interface Person {
  id: string;
  name: string;
  document: string;
  role: "player" | "coach" | "assistant";
}
