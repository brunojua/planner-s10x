"use client";

import React, { useState } from "react";
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
import { PlusCircle, Eye } from "lucide-react";
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
import { Sequence, Theme } from "@/types";
import { mockSequences, mockThemes } from "@/data/mockData"; // Using mock data for now

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

const Sequences = () => {
  const navigate = useNavigate();
  const [sequences, setSequences] = useState<Sequence[]>(mockSequences);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sequenceName, setSequenceName] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState<string>("");
  const [sequenceType, setSequenceType] = useState<Sequence["type"]>("Engajamento puro");
  const [sequenceDate, setSequenceDate] = useState("");

  const handleCreateSequence = () => {
    if (!sequenceName || !selectedThemeId || !sequenceType || !sequenceDate) return;

    const newSequence: Sequence = {
      id: `seq${sequences.length + 1}`,
      name: sequenceName,
      themeId: selectedThemeId,
      type: sequenceType,
      date: sequenceDate,
      views_primeiro: 0,
      views_ultimo: 0,
      respostas_totais: 0,
      retencao: 0,
    };
    setSequences([...sequences, newSequence]);
    resetForm();
    setIsDialogOpen(false);
    navigate(`/sequences/${newSequence.id}`); // Redirect to detail page
  };

  const resetForm = () => {
    setSequenceName("");
    setSelectedThemeId("");
    setSequenceType("Engajamento puro");
    setSequenceDate("");
  };

  const getThemeName = (themeId: string) => {
    const theme = mockThemes.find((t) => t.id === themeId);
    return theme ? (theme.category === "Outros" ? theme.otherCategory : theme.name) : "N/A";
  };

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
                    {mockThemes.map((theme) => (
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
            {sequences.map((sequence) => (
              <TableRow key={sequence.id}>
                <TableCell className="font-medium">{sequence.name}</TableCell>
                <TableCell>{getThemeName(sequence.themeId)}</TableCell>
                <TableCell>{sequence.type}</TableCell>
                <TableCell>{new Date(sequence.date).toLocaleDateString()}</TableCell>
                <TableCell>{sequence.retencao.toFixed(1)}%</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/sequences/${sequence.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Sequences;