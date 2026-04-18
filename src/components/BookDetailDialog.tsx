import { Book, STATUS_COLORS, STATUS_LABELS } from "@/types/book";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, Star } from "lucide-react";

interface Props {
  book: Book | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function BookDetailDialog({ book, open, onOpenChange }: Props) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{book.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Image */}
          <div className="flex justify-center">
            <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-lg bg-secondary shadow-book">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`Capa de ${book.title}`}
                  className="h-full w-full object-cover"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <BookOpen className="h-16 w-16" />
                </div>
              )}
              <Badge
                className={`absolute left-3 top-3 ${STATUS_COLORS[book.status]}`}
              >
                {STATUS_LABELS[book.status]}
              </Badge>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Autor:</span>
                <span className="text-sm">{book.author}</span>
              </div>

              {book.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Ano:</span>
                  <span className="text-sm">{book.year}</span>
                </div>
              )}

              {book.genre && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Gênero:</span>
                  <span className="text-sm">{book.genre}</span>
                </div>
              )}

              {book.rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Avaliação:</span>
                  <StarRating value={book.rating} readOnly size={16} />
                </div>
              )}
            </div>

            {book.review && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Resenha:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{book.review}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

