import { Theme, Sequence, Story } from "@/types";

export const mockThemes: Theme[] = [
  { id: "1", name: "Autoestima", category: "Desejo oculto" },
  { id: "2", name: "Solidão", category: "Dor principal" },
  { id: "3", name: "Dinheiro", category: "Urgência oculta" },
  { id: "4", name: "Produtividade", category: "Transformação desejada" },
];

export const mockSequences: Sequence[] = [
  {
    id: "seq1",
    name: "Semana da Autoconfiança",
    themeId: "1",
    type: "Engajamento puro",
    date: "2023-10-26",
    views_primeiro: 1000,
    views_ultimo: 780,
    respostas_totais: 50,
    retencao: 78.0,
  },
  {
    id: "seq2",
    name: "Desvendando a Solidão",
    themeId: "2",
    type: "Geração de consciência",
    date: "2023-11-15",
    views_primeiro: 1500,
    views_ultimo: 900,
    respostas_totais: 70,
    retencao: 60.0,
  },
];

export const mockStories: Story[] = [
  {
    id: "story1",
    sequenceId: "seq1",
    order: 1,
    text: "Bem-vindos à semana da autoconfiança! Hoje vamos falar sobre o primeiro passo para se sentir melhor.",
    device: "História com gancho",
    cta: "Reagir com emoji",
  },
  {
    id: "story2",
    sequenceId: "seq1",
    order: 2,
    text: "Você sabia que a forma como você se vê impacta diretamente seus resultados? Compartilhe sua maior insegurança nos stories!",
    device: "Você sabia?",
    cta: "Caixinha de perguntas",
  },
  {
    id: "story3",
    sequenceId: "seq2",
    order: 1,
    text: "A solidão é um sentimento comum, mas muitas vezes incompreendido. Vamos explorar juntos?",
    device: "Desabafo",
    cta: "Nenhum",
  },
];