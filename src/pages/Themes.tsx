"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Theme } from "@/types";
import { mockThemes } from "@/data/mockData"; // Using mock data for now

const themeCategories = [
  "Urgência oculta",
  "Situação de identificação",
  "Dor principal",
  "Desejo oculto",
  "Transformação desejada",
  "Injustiça percebida",
  "Falta de clareza",
  "Medo de perda",
  "Outros",
];

const Themes = () => {
  const [themes, setThemes] = useState<Theme[]>(mockThemes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeCategory, setThemeCategory] = useState<Theme["category"]>("Urgência oculta");
  const [otherCategory, setOtherCategory] = useState("");

  const handleSaveTheme = () => {
    if (!themeName || !themeCategory) return;

    if (editingTheme) {
      setThemes(
        themes.map((t) =>
          t.id === editingTheme.id
            ? { ...t, name: themeName, category: themeCategory, otherCategory: themeCategory === "Outros" ? otherCategory : undefined }
            : t,
        ),
      );
    } else {
      const newTheme: Theme = {
        id: String(themes.length + 1),
        name: themeName,
        category: themeCategory,
        otherCategory: themeCategory === "Outros" ? otherCategory : undefined,
      };
      setThemes([...themes, newTheme]);
    }
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (theme: Theme) => {
    setEditingTheme(theme);
    setThemeName(theme.name);
    setThemeCategory(theme.category);
    setOtherCategory(theme.otherCategory || "");
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setThemes(themes.filter((t) => t.id !== id));
  };

  const resetForm = () => {
    setEditingTheme(null);
    setThemeName("");
    setThemeCategory("Urgência oculta");
    setOtherCategory("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Temas</h1>
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
              {themeCategory === "Outros" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="otherCategory" className="text-right">
                    Especificar
                  </Label>
                  <Input
                    id="otherCategory"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    className="col-span-3"
                    placeholder="Nome da categoria"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveTheme}>
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
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map((theme) => (
              <TableRow key={theme.id}>
                <TableCell className="font-medium">{theme.name}</TableCell>
                <TableCell>{theme.category === "Outros" ? theme.otherCategory : theme.category}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(theme)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(theme.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
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

export default Themes;