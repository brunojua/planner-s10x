export interface Theme {
  id: string;
  name: string;
  category:
    | "Urgência oculta"
    | "Situação de identificação"
    | "Dor principal"
    | "Desejo oculto"
    | "Transformação desejada"
    | "Injustiça percebida"
    | "Falta de clareza"
    | "Medo de perda"
    | "Outros";
  otherCategory?: string; // For "Outros" category
}

export interface Story {
  id: string;
  sequenceId: string;
  order: number;
  text: string;
  device:
    | "Combustível extra"
    | "Desafio curto com promessa de análise"
    | "Conversa sem privacidade"
    | "Hotseat"
    | "Meta coletiva"
    | "História com gancho"
    | "Cultura de resultado"
    | "Piada interna"
    | "Pânico pelo conteúdo"
    | "Ansiedade pela abertura"
    | "Abertura de carrinho"
    | "Ativador de notificações"
    | "Alerta para voltar"
    | "B.I Apurado"
    | "Print valioso"
    | "Identidade do comunicador"
    | "Identidade do produto/serviço"
    | "Identidade do consumidor"
    | "Desabafo"
    | "Opinião de quem comprou"
    | "Peça compartilhamento"
    | "Nome esquisito"
    | "Espetacularização"
    | "Você sabia?"
    | "Micro influência"
    | "Presente difícil"
    | "Resposta escondida"
    | "Tarja de curiosidade"
    | "Psicologia reversa"
    | "Resumo"
    | "Os 7 erros"
    | "Diário"
    | "Crítica"
    | "Demonstração curta"
    | "Enquete com curiosidade real"
    | "Link oculto"
    | "Indicação pretensiosa"
    | "Levante a mão";
  cta:
    | "Nenhum"
    | "Inbox"
    | "Caixinha de perguntas"
    | "Enquete"
    | "Link direto de venda"
    | "Compartilhar"
    | "Print valioso"
    | "Reagir com emoji"
    | "Outro";
  otherCta?: string; // For "Outro" CTA
}

export interface Sequence {
  id: string;
  name: string;
  themeId: string; // Relation to Theme
  type:
    | "Engajamento puro"
    | "Geração de consciência"
    | "Venda de produto digital"
    | "Venda de produto físico"
    | "Publicidade"
    | "Promoção de parceiro"
    | "Aquecimento pico de vendas"
    | "Pré-abertura"
    | "Caixinha de pergunta por tema"
    | "Caixinha geral"
    | "Evento"
    | "Divulgação de conteúdo";
  date: string; // ISO date string
  views_primeiro: number;
  views_ultimo: number;
  respostas_totais: number;
  retencao: number; // Calculated field
}