"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Search, Filter, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Theme } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccess, showError } from "@/utils/toast";

const themeCategories = [
  "categoria do produto",
  "urgência oculta",
  "situação de identificação",
  "tema livre",
];

const ITEMS_PER_PAGE = 10;

const Themes = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeCategory, setThemeCategory] = useState<Theme["category"]>("urgência oculta");
  const [currentPage, setCurrentPage] = useState(1);

  // Estados para pesquisa e filtro
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<Theme["category"] | "all">("all");
  const [appliedFilterCategory, setAppliedFilterCategory] = useState<Theme["category"] | "all">("all");

  // Efeito para resetar a página quando o termo de pesquisa ou filtro aplicado muda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, appliedFilterCategory]);

  const { data: themesData, isLoading, error } = useQuery<{ data: Theme[], count: number }>({
    queryKey: ["themes", currentPage, searchTerm, appliedFilterCategory],
    queryFn: async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from("themes")
        .select("*", { count: "exact" })
        .eq("user_id", user.user.id);

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }

      if (appliedFilterCategory !== "all") {
        query = query.eq("category", appliedFilterCategory);
      }

      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { data: data as Theme[], count: count || 0 };
    },
  });

  const themes = themesData?.data || [];
  const totalThemes = themesData?.count || 0;
  const totalPages = Math.ceil(totalThemes / ITEMS_PER_PAGE);

  const addThemeMutation = useMutation({
    mutationFn: async (newTheme: Omit<Theme, "id" | "user_id" | "other_category">) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("themes")
        .insert({ ...newTheme, user_id: user.user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      showSuccess("Tema adicionado com sucesso!");
    },
    onError: (err) => {
      showError(`Erro ao adicionar tema: ${err.message}`);
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: async (updatedTheme: Omit<Theme, "other_category">) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("themes")
        .update({ name: updatedTheme.name, category: updatedTheme.category })
        .eq("id", updatedTheme.id)
        .eq("user_id", user.user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      showSuccess("Tema atualizado com sucesso!");
    },
    onError: (err) => {
      showError(`Erro ao atualizar tema: ${err.message}`);
    },
  });

  const deleteThemeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { error } = await supabase
        .from("themes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.user.id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      showSuccess("Tema excluído com sucesso!");
    },
    onError: (err) => {
      showError(`Erro ao excluir tema: ${err.message}`);
    },
  });

  const handleSaveTheme = () => {
    if (!themeName || !themeCategory) {
      showError("Nome e Categoria são obrigatórios.");
      return;
    }

    if (editingTheme) {
      updateThemeMutation.mutate({
        ...editingTheme,
        name: themeName,
        category: themeCategory,
      });
    } else {
      addThemeMutation.mutate({
        name: themeName,
        category: themeCategory,
      });
    }
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (theme: Theme) => {
    setEditingTheme(theme);
    setThemeName(theme.name);
    setThemeCategory(theme.category);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteThemeMutation.mutate(id);
  };

  const resetForm = () => {
    setEditingTheme(null);
    setThemeName("");
    setThemeCategory("urgência oculta"); // Default to a new valid category
  };

  const handleApplyFilter = () => {
    setAppliedFilterCategory(selectedFilterCategory);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedFilterCategory("all");
    setAppliedFilterCategory("all");
    setCurrentPage(1); // Reset current page as well
  };

  if (isLoading) return <div className="text-center">Carregando temas...</div>;
  if (error) return <div className="text-center text-destructive">Erro ao carregar temas: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Temas ({totalThemes})</h1> {/* Display totalThemes here */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Tema
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTheme ? "Editar Tema" : "Adicionar Novo Tema"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Select value={themeCategory} onValueChange={(value: Theme["category"]) => setThemeCategory(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveTheme}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar tema por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={selectedFilterCategory} onValueChange={(value: Theme["category"] | "all") => setSelectedFilterCategory(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              {themeCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleApplyFilter} className="shrink-0">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
          <Button variant="outline" onClick={handleResetFilters} className="shrink-0">
            <RotateCcw className="mr-2 h-4 w-4" /> Resetar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Nenhum tema encontrado.
                </TableCell>
              </TableRow>
            ) : (
              themes.map((theme) => (
                <TableRow key={theme.id}>
                  <TableCell className="font-medium">{theme.name}</TableCell>
                  <TableCell>{theme.category}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(theme)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(theme.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                isActive={currentPage > 1}
                className="cursor-pointer"
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                isActive={currentPage < totalPages}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Themes;