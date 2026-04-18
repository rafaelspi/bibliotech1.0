import { Book } from "@/types/book";
import { Card } from "@/components/ui/card";
import { BookMarked, BookOpen, Bookmark, Star } from "lucide-react";

export function StatsCards({ books }: { books: Book[] }) {
  const lidos = books.filter((b) => b.status === "lido").length;
  const lendo = books.filter((b) => b.status === "lendo").length;
  const queroLer = books.filter((b) => b.status === "quero_ler").length;
  const rated = books.filter((b) => b.rating > 0);
  const avg = rated.length ? (rated.reduce((s, b) => s + b.rating, 0) / rated.length).toFixed(1) : "—";

  const items = [
    { label: "Lidos", value: lidos, Icon: BookMarked, color: "text-primary" },
    { label: "Lendo", value: lendo, Icon: BookOpen, color: "text-accent" },
    { label: "Quero ler", value: queroLer, Icon: Bookmark, color: "text-muted-foreground" },
    { label: "Nota média", value: avg, Icon: Star, color: "text-accent" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {items.map(({ label, value, Icon, color }) => (
        <Card key={label} className="p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold">{value}</p>
        </Card>
      ))}
    </div>
  );
}
