import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}

export function StarRating({ value, onChange, size = 18, readOnly = false }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          disabled={readOnly}
          onClick={() => onChange?.(n === value ? 0 : n)}
          className={cn(
            "transition-colors",
            !readOnly && "hover:scale-110 cursor-pointer",
            readOnly && "cursor-default"
          )}
          aria-label={`${n} estrelas`}
        >
          <Star
            style={{ width: size, height: size }}
            className={cn(
              "transition-colors",
              n <= value ? "fill-accent text-accent" : "fill-transparent text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
}
