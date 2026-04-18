import { useMemo, useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { Book, BookStatus, STATUS_LABELS } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { BookFormDialog } from "@/components/BookFormDialog";
import { BookDetailDialog } from "@/components/BookDetailDialog";
import { StatsCards } from "@/components/StatsCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { BookOpen, Plus, Search } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { books, create, update, remove } = useBooks();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookStatus>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [detail, setDetail] = useState<Book | null>(null);
  const [toDelete, setToDelete] = useState<Book | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter((b) => {
      const matchesQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q);
      const matchesS = statusFilter === "all" || b.status === statusFilter;
      return matchesQ && matchesS;
    });
  }, [books, search, statusFilter]);

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (b: Book) => { setDetail(null); setEditing(b); setFormOpen(true); };
  const handleSave = (data: Omit<Book, "id" | "createdAt">) => {
    if (editing) update(editing.id, data); else create(data);
  };
  const confirmDelete = () => {
    if (toDelete) {
      remove(toDelete.id);
      toast.success("Livro removido");
      setToDelete(null);
      setDetail(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <header className="border-b border-border/60 bg-background/70 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary text-primary-foreground shadow-soft">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold leading-none">BiblioTech</h1>
              <p className="text-xs text-muted-foreground">Sua biblioteca pessoal</p>
            </div>
          </div>
          <Button onClick={openCreate} className="shadow-soft">
            <Plus />Novo livro
          </Button>
        </div>
      </header>

      <main className="container space-y-8 py-8">
        <section aria-labelledby="hero-title" className="space-y-2">
          <h2 id="hero-title" className="font-serif text-3xl font-semibold sm:text-4xl">Sua estante, organizada.</h2>
          <p className="max-w-xl text-muted-foreground">
            Acompanhe o que você leu, está lendo e quer ler. Avalie, escreva resenhas e veja sua jornada de leitura.
          </p>
        </section>

        <StatsCards books={books} />

        <section aria-labelledby="lib-title" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 id="lib-title" className="font-serif text-2xl font-semibold">Minha Biblioteca</h3>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar título, autor, gênero…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 sm:w-72"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="lido">{STATUS_LABELS.lido}</SelectItem>
                  <SelectItem value="lendo">{STATUS_LABELS.lendo}</SelectItem>
                  <SelectItem value="quero_ler">{STATUS_LABELS.quero_ler}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 py-16 text-center">
              <BookOpen className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="font-serif text-lg">Nenhum livro encontrado</p>
              <p className="mt-1 text-sm text-muted-foreground">Ajuste a busca ou adicione um novo livro.</p>
              <Button onClick={openCreate} className="mt-4"><Plus />Adicionar livro</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((b) => (
                <BookCard key={b.id} book={b} onClick={() => setDetail(b)} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        BiblioTech © {new Date().getFullYear()} — Projeto acadêmico DevOps
      </footer>

      <BookFormDialog open={formOpen} onOpenChange={setFormOpen} initial={editing} onSave={handleSave} />
      <BookDetailDialog
        book={detail}
        open={!!detail}
        onOpenChange={(v) => !v && setDetail(null)}
        onEdit={openEdit}
        onDelete={(b) => setToDelete(b)}
      />
      <AlertDialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover este livro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. "{toDelete?.title}" será removido da sua biblioteca.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
