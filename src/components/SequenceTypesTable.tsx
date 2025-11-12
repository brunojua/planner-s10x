"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sequenceTypesData = [
  {
    no: 1,
    type: "Venda de Produto Digital",
    objective: "Gerar desejo e levar o seguidor a comprar um infoproduto",
    cadence: "Baixa",
    devices: "(34) Demonstração curta, (6) História com gancho, (3) Conversa sem privacidade",
  },
  {
    no: 2,
    type: "Venda de Produto Físico",
    objective: "Conduzir à compra de produtos tangíveis",
    cadence: "Baixa",
    devices: "(22) Nome esquisito, (34) Demonstração curta, (6) História com gancho, (3) Conversa sem privacidade",
  },
  {
    no: 3,
    type: "Geração de Consciência",
    objective: "Preparar a audiência para futuras ofertas, falar de temas indiretos ao produto",
    cadence: "Baixa",
    devices: "(14) B.I Apurado, (35) Enquete com curiosidade real, (6) História com gancho, (3) Conversa sem privacidade",
  },
  {
    no: 4,
    type: "Engajamento Puro",
    objective: "Criar conexão e conversas espontâneas com a audiência",
    cadence: "Alta",
    devices: "(6) História com gancho, (25) Micro influência, (31) Os 7 erros, (23) Espetacularização, (32) Diário, (5) Meta coletiva",
  },
  {
    no: 5,
    type: "Publicidade",
    objective: "Gerar impacto e entrega profissional para marcas e empresas",
    cadence: "Baixa–média",
    devices: "(3) Conversa sem privacidade, (14) B.I Apurado, (35) Enquete com curiosidade real",
  },
  {
    no: 6,
    type: "Promoção de Parceiro",
    objective: "Promover outra pessoa ou colaborador",
    cadence: "Baixa",
    devices: "Pode combinar dispositivos de engajamento e credibilidade (Ex: (19) Desabafo, (7) Cultura de resultado)",
  },
  {
    no: 7,
    type: "Aquecimento – Pico de Vendas",
    objective: "Aquecer a audiência para um grande lançamento ou oferta especial",
    cadence: "Alta",
    devices: "(35) Enquete com curiosidade real, (3) Conversa sem privacidade, (9) Pânico pelo conteúdo, (1) Combustível extra",
  },
  {
    no: 8,
    type: "Pré-abertura",
    objective: "Gerar antecipação e tensão antes de abrir o carrinho/oferta",
    cadence: "Alta",
    devices: "(14) B.I Apurado, (3) Conversa sem privacidade, (9) Pânico pelo conteúdo, (38) Levante a mão",
  },
  {
    no: 9,
    type: "Caixinha de Pergunta por Tema",
    objective: "Educar e gerar valor sobre um tema específico",
    cadence: "Alta",
    devices: "(35) Enquete com curiosidade real, (14) B.I Apurado, (15) Print valioso",
  },
  {
    no: 10,
    type: "Caixinha de Pergunta Geral",
    objective: "Criar conexão livre com a audiência e descobrir novos temas",
    cadence: "Média",
    devices: "(35) Enquete com curiosidade real, (14) B.I Apurado, (15) Print valioso, (24) Você sabia",
  },
  {
    no: 11,
    type: "Evento",
    objective: "Cobertura e valorização de eventos internos ou externos",
    cadence: "Alta",
    devices: "(2) Desafio curto com promessa de análise, (1) Combustível extra, (14) B.I Apurado, (26) Presente difícil",
  },
  {
    no: 12,
    type: "Divulgação de Conteúdo",
    objective: "Divulgar e levar tráfego para podcasts, vídeos, posts e aulas",
    cadence: "Baixa–média",
    devices: "(25) Micro influência, (35) Enquete com curiosidade real, (1) Combustível extra, (2) Desafio curto com promessa de análise",
  },
];

export function SequenceTypesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Nº</TableHead>
            <TableHead className="w-[200px]">Tipo de Sequência</TableHead>
            <TableHead>Objetivo Principal</TableHead>
            <TableHead className="w-[120px]">Cadência Típica</TableHead>
            <TableHead>Dispositivos Recomendados</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sequenceTypesData.map((item) => (
            <TableRow key={item.no}>
              <TableCell className="font-medium">{item.no}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.objective}</TableCell>
              <TableCell>{item.cadence}</TableCell>
              <TableCell>{item.devices}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}