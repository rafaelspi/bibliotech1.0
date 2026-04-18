import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Book } from "@/types/book";
import { toast } from "sonner";

const API_BASE = "http://localhost:3000/api";

export function useBooks() {
  const queryClient = useQueryClient();

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: async (): Promise<Book[]> => {
      const response = await fetch(`${API_BASE}/books`);
      if (!response.ok) throw new Error("Failed to fetch books");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (book: Omit<Book, "id" | "createdAt">): Promise<Book> => {
      const response = await fetch(`${API_BASE}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!response.ok) throw new Error("Failed to create book");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro adicionado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao adicionar livro");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (book: Book): Promise<Book> => {
      const response = await fetch(`${API_BASE}/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!response.ok) throw new Error("Failed to update book");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar livro");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE}/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete book");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover livro");
    },
  });

  return {
    books,
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
  };
}
