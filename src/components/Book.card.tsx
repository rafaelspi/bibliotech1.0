import { Book, STATUS_COLORS, STATUS_LABELS } from "@/types/book";
import { StarRating } from "./StarRating";
import { cn } from "@/libs/utils";
import { BookOpen } from "lucide-react";

interface Props {
  book: Book;
  onClick?: () => void;
}

export function BookCard({ book, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer animate-fade-in"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary shadow-book transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_32px_-8px_hsl(25_25%_15%/0.25)]">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Capa de ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => ((e.currentTarget.style.display = "none"))}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <BookOpen className="h-12 w-12" />
          </div>
        )}
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            STATUS_COLORS[book.status]
          )}
        >
          {STATUS_LABELS[book.status]}
        </span>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-base font-semibold leading-tight line-clamp-2">{book.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
        {book.rating > 0 && <StarRating value={book.rating} readOnly size={14} />}
      </div>
    </article>
  );
}

