export interface Theme {
  id: string; // UUID from Supabase
  user_id: string; // User ID from Supabase auth.users
  name: string;
  category:
    | "categoria do produto"
    | "urgência oculta"
    | "situação de identificação"
    | "tema livre";
  other_category?: string; // For "Outros" category, changed to snake_case for Supabase
}

export interface Story {
  id: string; // UUID from Supabase
  user_id: string; // User ID from Supabase auth.users
  sequence_id: string; // Relation to Sequence, UUID
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
  other_cta?: string; // For "Outro" CTA, changed to snake_case for Supabase
}

export interface Sequence {
  id: string; // UUID from Supabase
  user_id: string; // User ID from Supabase auth.users
  name: string;
  theme_id: string; // Relation to Theme, UUID, changed to snake_case for Supabase
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