import { useEffect, useState } from "react";
import { Book, BookStatus } from "@/types/book";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarRating } from "./StarRating";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Book | null;
  onSave: (data: Omit<Book, "id" | "createdAt">) => void;
}

const empty: Omit<Book, "id" | "createdAt"> = {
  title: "", author: "", genre: "", year: new Date().getFullYear(),
  status: "quero_ler", rating: 0, review: "", coverUrl: "",
};

export function BookFormDialog({ open, onOpenChange, initial, onSave }: Props) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) {
      const { id, createdAt, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(empty);
    }
  }, [initial, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      toast.error("Título e autor são obrigatórios");
      return;
    }
    onSave(form);
    toast.success(initial ? "Livro atualizado" : "Livro adicionado");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {initial ? "Editar livro" : "Novo livro"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Autor *</Label>
            <Input id="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="genre">Gênero</Label>
              <Input id="genre" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input id="year" type="number" value={form.year}
                onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as BookStatus })}>
              <SelectTrigger id="status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="quero_ler">Quero ler</SelectItem>
                <SelectItem value="lendo">Lendo</SelectItem>
                <SelectItem value="lido">Lido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">URL da capa</Label>
            <Input id="cover" placeholder="https://..." value={form.coverUrl}
              onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Nota</Label>
            <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} size={24} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Resenha</Label>
            <Textarea id="review" rows={4} value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">{initial ? "Salvar" : "Adicionar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
