"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sequence, Story, Theme } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccess, showError } from "@/utils/toast";

const deviceOptions = [
  "Combustível extra", "Desafio curto com promessa de análise", "Conversa sem privacidade",
  "Hotseat", "Meta coletiva", "História com gancho", "Cultura de resultado", "Piada interna",
  "Pânico pelo conteúdo", "Ansiedade pela abertura", "Abertura de carrinho", "Ativador de notificações",
  "Alerta para voltar", "B.I Apurado", "Print valioso", "Identidade do comunicador",
  "Identidade do produto/serviço", "Identidade do consumidor", "Desabafo", "Opinião de quem comprou",
  "Peça compartilhamento", "Nome esquisito", "Espetacularização", "Você sabia?",
  "Micro influência", "Presente difícil", "Resposta escondida", "Tarja de curiosidade",
  "Psicologia reversa", "Resumo", "Os 7 erros", "Diário", "Crítica", "Demonstração curta",
  "Enquete com curiosidade real", "Link oculto", "Indicação pretensiosa", "Levante a mão",
];

const ctaOptions = [
  "Nenhum", "Inbox", "Caixinha de perguntas", "Enquete", "Link direto de venda",
  "Compartilhar", "Print valioso", "Reagir com emoji", "Outro",
];

const SequenceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [isStoryDialogOpen, setIsStoryDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [storyOrder, setStoryOrder] = useState(0);
  const [storyText, setStoryText] = useState("");
  const [storyDevice, setStoryDevice] = useState<Story["device"]>("Combustível extra");
  const [storyCta, setStoryCta] = useState<Story["cta"]>("Nenhum");
  const [otherCta, setOtherCta] = useState("");

  const { data: sequence, isLoading: isLoadingSequence, error: sequenceError } = useQuery<Sequence>({
    queryKey: ["sequence", id],
    queryFn: async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("sequences")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.user.id)
        .single();
      if (error) throw error;
      return data as Sequence;
    },
    enabled: !!id,
  });

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

  const { data: stories, isLoading: isLoadingStories, error: storiesError } = useQuery<Story[]>({
    queryKey: ["stories", id],
    queryFn: async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("sequence_id", id)
        .eq("user_id", user.user.id)
        .order("order", { ascending: true });
      if (error) throw error;
      return data as Story[];
    },
    enabled: !!id,
  });

  const updateSequenceMetricsMutation = useMutation({
    mutationFn: async (updatedMetrics: { views_primeiro: number; views_ultimo: number; respostas_totais: number; retencao: number }) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("sequences")
        .update(updatedMetrics)
        .eq("id", id)
        .eq("user_id", user.user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sequence", id] });
      showSuccess("Métricas da sequência atualizadas!");
    },
    onError: (err) => {
      showError(`Erro ao atualizar métricas: ${err.message}`);
    },
  });

  const addStoryMutation = useMutation({
    mutationFn: async (newStory: Omit<Story, "id" | "user_id">) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("stories")
        .insert({ ...newStory, user_id: user.user.id, sequence_id: id! })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories", id] });
      showSuccess("Story adicionado com sucesso!");
    },
    onError: (err) => {
      showError(`Erro ao adicionar story: ${err.message}`);
    },
  });

  const updateStoryMutation = useMutation({
    mutationFn: async (updatedStory: Story) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("stories")
        .update({ order: updatedStory.order, text: updatedStory.text, device: updatedStory.device, cta: updatedStory.cta, other_cta: updatedStory.other_cta })
        .eq("id", updatedStory.id)
        .eq("user_id", user.user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories", id] });
      showSuccess("Story atualizado com sucesso!");
    },
    onError: (err) => {
      showError(`Erro ao atualizar story: ${err.message}`);
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: async (storyId: string) => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user?.id) {
        throw new Error("User not authenticated");
      }
      const { error } = await supabase
        .from("stories")
        .delete()
        .eq("id", storyId)
        .eq("user_id", user.user.id);
      if (error) throw error;
      return storyId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories", id] });
      showSuccess("Story excluído com sucesso!");
    },
    onError: (err) => {
      showError(`Erro ao excluir story: ${err.message}`);
    },
  });

  const [viewsPrimeiro, setViewsPrimeiro] = useState(sequence?.views_primeiro || 0);
  const [viewsUltimo, setViewsUltimo] = useState(sequence?.views_ultimo || 0);
  const [respostasTotais, setRespostasTotais] = useState(sequence?.respostas_totais || 0);
  const [retencao, setRetencao] = useState(sequence?.retencao || 0);

  useEffect(() => {
    if (sequence) {
      setViewsPrimeiro(sequence.views_primeiro);
      setViewsUltimo(sequence.views_ultimo);
      setRespostasTotais(sequence.respostas_totais);
      setRetencao(sequence.retencao);
    }
  }, [sequence]);

  useEffect(() => {
    if (sequence) {
      const calculatedRetention =
        viewsPrimeiro > 0 ? (viewsUltimo / viewsPrimeiro) * 100 : 0;
      const newRetencao = parseFloat(calculatedRetention.toFixed(1));
      setRetencao(newRetencao);

      if (
        viewsPrimeiro !== sequence.views_primeiro ||
        viewsUltimo !== sequence.views_ultimo ||
        respostasTotais !== sequence.respostas_totais ||
        newRetencao !== sequence.retencao
      ) {
        updateSequenceMetricsMutation.mutate({
          views_primeiro: viewsPrimeiro,
          views_ultimo: viewsUltimo,
          respostas_totais: respostasTotais,
          retencao: newRetencao,
        });
      }
    }
  }, [viewsPrimeiro, viewsUltimo, respostasTotais, sequence]);


  if (isLoadingSequence || isLoadingThemes || isLoadingStories) return <div className="text-center">Carregando detalhes da sequência...</div>;
  if (sequenceError) return <div className="text-center text-destructive">Erro ao carregar sequência: {sequenceError.message}</div>;
  if (themesError) return <div className="text-center text-destructive">Erro ao carregar temas: {themesError.message}</div>;
  if (storiesError) return <div className="text-center text-destructive">Erro ao carregar stories: {storiesError.message}</div>;
  if (!sequence) return <div className="text-center text-xl">Sequência não encontrada.</div>;

  const getThemeName = (themeId: string) => {
    const theme = themes?.find((t) => t.id === themeId);
    return theme ? (theme.category === "Outros" ? theme.other_category : theme.name) : "N/A";
  };

  const handleSaveStory = () => {
    if (!storyOrder || !storyText || !storyDevice || !storyCta) {
      showError("Ordem, Texto, Dispositivo e CTA são obrigatórios.");
      return;
    }

    if (editingStory) {
      updateStoryMutation.mutate({
        ...editingStory,
        order: storyOrder,
        text: storyText,
        device: storyDevice,
        cta: storyCta,
        other_cta: storyCta === "Outro" ? otherCta : undefined,
      });
    } else {
      addStoryMutation.mutate({
        sequence_id: sequence.id,
        order: storyOrder,
        text: storyText,
        device: storyDevice,
        cta: storyCta,
        other_cta: storyCta === "Outro" ? otherCta : undefined,
      });
    }
    resetStoryForm();
    setIsStoryDialogOpen(false);
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setStoryOrder(story.order);
    setStoryText(story.text);
    setStoryDevice(story.device);
    setStoryCta(story.cta);
    setOtherCta(story.other_cta || "");
    setIsStoryDialogOpen(true);
  };

  const handleDeleteStory = (storyId: string) => {
    deleteStoryMutation.mutate(storyId);
  };

  const resetStoryForm = () => {
    setEditingStory(null);
    setStoryOrder(stories && stories.length > 0 ? Math.max(...stories.map(s => s.order)) + 1 : 1);
    setStoryText("");
    setStoryDevice("Combustível extra");
    setStoryCta("Nenhum");
    setOtherCta("");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Detalhes da Sequência: {sequence.name}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Sequência</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Nome:</p>
            <p className="text-lg">{sequence.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tema:</p>
            <p className="text-lg">{getThemeName(sequence.theme_id)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tipo:</p>
            <p className="text-lg">{sequence.type}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Data:</p>
            <p className="text-lg">{new Date(sequence.date).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Stories</h2>
        <Dialog open={isStoryDialogOpen} onOpenChange={setIsStoryDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetStoryForm}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar novo Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingStory ? "Editar Story" : "Adicionar Novo Story"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order" className="text-right">
                  Ordem
                </Label>
                <Input
                  id="order"
                  type="number"
                  value={storyOrder}
                  onChange={(e) => setStoryOrder(parseInt(e.target.value) || 0)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="text" className="text-right pt-2">
                  Texto/Roteiro
                </Label>
                <Textarea
                  id="text"
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="device" className="text-right">
                  Dispositivo
                </Label>
                <Select value={storyDevice} onValueChange={(value: Story["device"]) => setStoryDevice(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um dispositivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceOptions.map((device) => (
                      <SelectItem key={device} value={device}>
                        {device}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cta" className="text-right">
                  CTA
                </Label>
                <Select value={storyCta} onValueChange={(value: Story["cta"]) => setStoryCta(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um CTA" />
                  </SelectTrigger>
                  <SelectContent>
                    {ctaOptions.map((cta) => (
                      <SelectItem key={cta} value={cta}>
                        {cta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {storyCta === "Outro" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="otherCta" className="text-right">
                    Especificar CTA
                  </Label>
                  <Input
                    id="otherCta"
                    value={otherCta}
                    onChange={(e) => setOtherCta(e.target.value)}
                    className="col-span-3"
                    placeholder="Ex: Link na Bio"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveStory}>
                Salvar Story
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Ordem</TableHead>
              <TableHead>Texto</TableHead>
              <TableHead className="w-[150px]">Dispositivo</TableHead>
              <TableHead className="w-[150px]">CTA</TableHead>
              <TableHead className="text-right w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories?.map((story) => (
              <TableRow key={story.id}>
                <TableCell>{story.order}</TableCell>
                <TableCell className="max-w-[300px] truncate">{story.text}</TableCell>
                <TableCell>{story.device}</TableCell>
                <TableCell>{story.cta === "Outro" ? story.other_cta : story.cta}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditStory(story)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteStory(story.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="text-2xl font-bold mt-6">📊 Resultados da sequência</h2>
      <Card>
        <CardHeader>
          <CardTitle>Métricas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="views_primeiro">Views do 1° story</Label>
            <Input
              id="views_primeiro"
              type="number"
              value={viewsPrimeiro}
              onChange={(e) => setViewsPrimeiro(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="views_ultimo">Views do último story</Label>
            <Input
              id="views_ultimo"
              type="number"
              value={viewsUltimo}
              onChange={(e) => setViewsUltimo(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="respostas_totais">Soma de respostas</Label>
            <Input
              id="respostas_totais"
              type="number"
              value={respostasTotais}
              onChange={(e) => setRespostasTotais(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>Retenção</Label>
            <div className="flex items-center h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
              {retencao}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SequenceDetail;