"use client";

import React from "react";
import { SequenceTypeCard } from "./SequenceTypeCard"; // Import the new card component

const sequenceTypesData = [
  {
    type: "Venda de Produto Digital",
    objective: "Gerar desejo e levar o seguidor a comprar um infoproduto",
    cadence: "Baixa",
    devices: "(34) Demonstração curta, (6) História com gancho, (3) Conversa sem privacidade",
  },
  {
    type: "Venda de Produto Físico",
    objective: "Conduzir à compra de produtos tangíveis",
    cadence: "Baixa",
    devices: "(22) Nome esquisito, (34) Demonstração curta, (6) História com gancho, (3) Conversa sem privacidade",
  },
  {
    type: "Geração de Consciência",
    objective: "Preparar a audiência para futuras ofertas, falar de temas indiretos ao produto",
    cadence: "Baixa",
    devices: "(14) B.I Apurado, (35) Enquete com curiosidade real, (6) História com gancho, (3) Conversa sem privacidade",
  },
  {
    type: "Engajamento Puro",
    objective: "Criar conexão e conversas espontâneas com a audiência",
    cadence: "Alta",
    devices: "(6) História com gancho, (25) Micro influência, (31) Os 7 erros, (23) Espetacularização, (32) Diário, (5) Meta coletiva",
  },
  {
    type: "Publicidade",
    objective: "Gerar impacto e entrega profissional para marcas e empresas",
    cadence: "Baixa–média",
    devices: "(3) Conversa sem privacidade, (14) B.I Apurado, (35) Enquete com curiosidade real",
  },
  {
    type: "Promoção de Parceiro",
    objective: "Promover outra pessoa ou colaborador",
    cadence: "Baixa",
    devices: "Pode combinar dispositivos de engajamento e credibilidade (Ex: (19) Desabafo, (7) Cultura de resultado)",
  },
  {
    type: "Aquecimento – Pico de Vendas",
    objective: "Aquecer a audiência para um grande lançamento ou oferta especial",
    cadence: "Alta",
    devices: "(35) Enquete com curiosidade real, (3) Conversa sem privacidade, (9) Pânico pelo conteúdo, (1) Combustível extra",
  },
  {
    type: "Pré-abertura",
    objective: "Gerar antecipação e tensão antes de abrir o carrinho/oferta",
    cadence: "Alta",
    devices: "(14) B.I Apurado, (3) Conversa sem privacidade, (9) Pânico pelo conteúdo, (38) Levante a mão",
  },
  {
    type: "Caixinha de Pergunta por Tema",
    objective: "Educar e gerar valor sobre um tema específico",
    cadence: "Alta",
    devices: "(35) Enquete com curiosidade real, (14) B.I Apurado, (15) Print valioso",
  },
  {
    type: "Caixinha de Pergunta Geral",
    objective: "Criar conexão livre com a audiência e descobrir novos temas",
    cadence: "Média",
    devices: "(35) Enquete com curiosidade real, (14) B.I Apurado, (15) Print valioso, (24) Você sabia",
  },
  {
    type: "Evento",
    objective: "Cobertura e valorização de eventos internos ou externos",
    cadence: "Alta",
    devices: "(2) Desafio curto com promessa de análise, (1) Combustível extra, (14) B.I Apurado, (26) Presente difícil",
  },
  {
    type: "Divulgação de Conteúdo",
    objective: "Divulgar e levar tráfego para podcasts, vídeos, posts e aulas",
    cadence: "Baixa–média",
    devices: "(25) Micro influência, (35) Enquete com curiosidade real, (1) Combustível extra, (2) Desafio curto com promessa de análise",
  },
];

export function SequenceTypesDisplay() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sequenceTypesData.map((item, index) => (
        <SequenceTypeCard
          key={index} // Using index as key for static data is acceptable here
          type={item.type}
          objective={item.objective}
          cadence={item.cadence}
          devices={item.devices}
        />
      ))}
    </div>
  );
}