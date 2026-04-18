export type BookStatus = "lido" | "lendo" | "quero_ler";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: BookStatus;
  rating: number; // 0-5
  review: string;
  coverUrl: string;
  createdAt: string;
}

export const STATUS_LABELS: Record<BookStatus, string> = {
  lido: "Lido",
  lendo: "Lendo",
  quero_ler: "Quero ler",
};

export const STATUS_COLORS: Record<BookStatus, string> = {
  lido: "bg-primary text-primary-foreground",
  lendo: "bg-accent text-accent-foreground",
  quero_ler: "bg-secondary text-secondary-foreground",
};
