"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Trash2 } from "lucide-react"; // Adicionado Trash2
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Importar AlertDialog
import { Sequence, Theme } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccess, showError } from "@/utils/toast";

const sequenceTypes = [
  "Engajamento puro",
  "Geração de consciência",
  "Venda de produto digital",
  "Venda de produto físico",
  "Publicidade",
  "Promoção de parceiro",
  "Aquecimento pico de vendas",
  "Pré-abertura",
  "Caixinha de pergunta por tema",
  "Caixinha geral",
  "Evento",
  "Divulgação de conteúdo",
];

const ITEMS_PER_PAGE = 10;

const Sequences = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sequenceName, setSequenceName] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState<string>("");
  const [sequenceType, setSequenceType] = useState<Sequence["type"]>("Engajamento puro");
  const [sequenceDate, setSequenceDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Estados para o diálogo de confirmação de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<string | null>(null);

  const { data: sequencesData, isLoading: isLoadingSequences, error: sequencesError } = useQuery<{ data: Sequence[], count: number }>({
    queryKey: ["sequences", currentPage],
    queryFn: async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("sequences")
        .select("*", { count: "exact" })
        .eq("user_id", user.user.id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { data: data as Sequence[], count: count || 0 };
    },
  });

  const sequences = sequencesData?.data || [];
  const totalSequences = sequencesData?.count || 0;
  const totalPages = Math.ceil(totalSequences / ITEMS_PER_PAGE);

  const { data: themes, isLoading: isLoadingThemes, error: themesError } = useQuery<Theme[]>({
    queryKey: ["themes"],
    queryFn: async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("themes")
        .select("*")
        .eq("user_id", user.user.id);
      if (error) throw error;
      return data as Theme[];
    },
  });

  // Efeito para definir o tema padrão quando os temas são carregados
  useEffect(() => {
    if (!isLoadingThemes && themes && themes.length > 0 && !selectedThemeId) {
      setSelectedThemeId(themes[0].id);
    }
  }, [themes, isLoadingThemes, selectedThemeId]);

  const addSequenceMutation = useMutation({
    mutationFn: async (newSequence: Omit<Sequence, "id" | "user_id" | "views_primeiro" | "views_ultimo" | "respostas_totais" | "retencao">) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("sequences")
        .insert({ ...newSequence, user_id: user.user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (newSequence) => {
      queryClient.invalidateQueries({ queryKey: ["sequences"] });
      showSuccess("Sequência criada com sucesso!");
      navigate(`/sequences/${newSequence.id}`);
    },
    onError: (err) => {
      showError(`Erro ao criar sequência: ${err.message}`);
    },
  });

  const deleteSequenceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { error } = await supabase
        .from("sequences")
        .delete()
        .eq("id", id)
        .eq("user_id", user.user.id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sequences"] });
      showSuccess("Sequência excluída com sucesso!");
      setSequenceToDelete(null);
      setIsDeleteDialogOpen(false);
    },
    onError: (err) => {
      showError(`Erro ao excluir sequência: ${err.message}`);
    },
  });

  const handleCreateSequence = () => {
    if (!sequenceName || !selectedThemeId || !sequenceType || !sequenceDate) {
      showError("Todos os campos são obrigatórios.");
      return;
    }

    addSequenceMutation.mutate({
      name: sequenceName,
      theme_id: selectedThemeId,
      type: sequenceType,
      date: sequenceDate,
    });
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteClick = (sequenceId: string) => {
    setSequenceToDelete(sequenceId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (sequenceToDelete) {
      deleteSequenceMutation.mutate(sequenceToDelete);
    }
  };

  const resetForm = () => {
    setSequenceName("");
    setSelectedThemeId(themes && themes.length > 0 ? themes[0].id : ""); // Define o primeiro tema como padrão se houver temas
    setSequenceType("Engajamento puro");
    setSequenceDate("");
  };

  const getThemeName = (themeId: string) => {
    const theme = themes?.find((t) => t.id === themeId);
    return theme ? theme.name : "N/A";
  };

  if (isLoadingSequences || isLoadingThemes) return <div className="text-center">Carregando sequências...</div>;
  if (sequencesError) return <div className="text-center text-destructive">Erro ao carregar sequências: {sequencesError.message}</div>;
  if (themesError) return <div className="text-center text-destructive">Erro ao carregar temas: {themesError.message}</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sequências</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <PlusCircle className="mr-2 h-4 w-4" /> Criar nova Sequência
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Sequência</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={sequenceName}
                  onChange={(e) => setSequenceName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="theme" className="text-right">
                  Tema
                </Label>
                <Select value={selectedThemeId} onValueChange={setSelectedThemeId}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes?.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select value={sequenceType} onValueChange={(value: Sequence["type"]) => setSequenceType(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo de sequência" />
                  </SelectTrigger>
                  <SelectContent>
                    {sequenceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={sequenceDate}
                  onChange={(e) => setSequenceDate(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateSequence}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tema</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Retenção (%)</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sequences?.map((sequence) => (
              <TableRow key={sequence.id}>
                <TableCell className="font-medium">{sequence.name}</TableCell>
                <TableCell>{getThemeName(sequence.theme_id)}</TableCell>
                <TableCell>{sequence.type}</TableCell>
                <TableCell>{new Date(sequence.date).toLocaleDateString()}</TableCell>
                <TableCell>{sequence.retencao.toFixed(1)}%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/sequences/${sequence.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(sequence.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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

      {/* AlertDialog for delete confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente esta sequência e todos os stories associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sequences;