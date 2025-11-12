"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SequenceTypesTable } from "@/components/SequenceTypesTable";

const Methodology = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Metodologia Stories 10x</h1>

      <Tabs defaultValue="sequence-types" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sequence-types">Tipos de Sequências</TabsTrigger>
          <TabsTrigger value="social-engineering-devices">Dispositivos de Engenharia Social</TabsTrigger>
        </TabsList>
        <TabsContent value="sequence-types">
          <p className="mb-4 text-muted-foreground">
            Aqui você encontra uma lista detalhada dos tipos de sequências do Stories 10x, seus objetivos, cadência e dispositivos recomendados.
          </p>
          <SequenceTypesTable />
        </TabsContent>
        <TabsContent value="social-engineering-devices">
          <p className="text-muted-foreground">
            Conteúdo para "Dispositivos de Engenharia Social" será adicionado aqui.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Methodology;