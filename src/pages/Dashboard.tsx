"use client";

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Smartphone, PlusCircle } from "lucide-react";
import { mockThemes, mockSequences } from "@/data/mockData";

const Dashboard = () => {
  const totalThemes = mockThemes.length;
  const totalSequences = mockSequences.length;

  const totalRetention = mockSequences.reduce((sum, seq) => sum + seq.retencao, 0);
  const averageRetention = totalSequences > 0 ? (totalRetention / totalSequences).toFixed(1) : "0.0";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Temas</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalThemes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Sequências</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSequences}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Retenção Geral</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRetention}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/themes">
            <PlusCircle className="mr-2 h-4 w-4" /> Cadastrar novo Tema
          </Link>
        </Button>
        <Button asChild>
          <Link to="/sequences">
            <PlusCircle className="mr-2 h-4 w-4" /> Criar nova Sequência
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;