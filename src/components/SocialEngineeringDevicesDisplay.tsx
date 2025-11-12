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

const socialEngineeringDevicesData = [
  {
    num: 1,
    name: "Combustível Extra",
    explanation: "Traz audiência de outros lugares (email, feed, outras redes) para aumentar as views dos stories.",
    example: "“Vim do e-mail pra te mostrar isso aqui” / “Sai lá do meu post e vem pra cá!”",
  },
  {
    num: 2,
    name: "Desafio Curto com Promessa de Análise",
    explanation: "Cria um mini desafio. A audiência faz e você analisa, gerando engajamento e conexão.",
    example: "“Grava seu anúncio e me manda — vou analisar 10 hoje nos stories.”",
  },
  {
    num: 3,
    name: "Conversa sem Privacidade",
    explanation: "Transforma perguntas do inbox em conteúdo público (sem expor a pessoa).",
    example: "“Uma seguidora me perguntou isso aqui, e olha a resposta...”",
  },
  {
    num: 4,
    name: "Hotseat",
    explanation: "A comunidade ajuda uma pessoa específica.",
    example: "“Envie sua página de vendas que eu e minha audiência vamos revisar.”",
  },
  {
    num: 5,
    name: "Meta Coletiva",
    explanation: "Estimula reação em troca de algo valioso.",
    example: "“Se chegarmos a 2000 reações, eu libero a aula sobre fotos com celular.”",
  },
  {
    num: 6,
    name: "História com Gancho",
    explanation: "Conta uma história real que naturalmente envolve seu produto/serviço.",
    example: "“Um dia meu cliente fez X… e foi aí que eu percebi Y.”",
  },
  {
    num: 7,
    name: "Cultura de Resultado",
    explanation: "Incentiva o hábito de mostrar depoimentos e resultados.",
    example: "“Quando fizer sua primeira venda, me manda print!”",
  },
  {
    num: 8,
    name: "Piada Interna",
    explanation: "Cria senso de pertencimento com humor interno da comunidade.",
    example: "“Quem manda 😢 nos stories sabe o que significa!”",
  },
  {
    num: 9,
    name: "Pânico pelo Conteúdo",
    explanation: "Libera um conteúdo super valioso por pouco tempo para gerar urgência.",
    example: "“Às 01:30 vou postar e 3 minutos depois vou apagar.”",
  },
  {
    num: 10,
    name: "Ansiedade pela Abertura",
    explanation: "Cria expectativa para uma oferta/lançamento.",
    example: "“As vagas abrem sexta, e na última vez acabaram em 11 minutos.”",
  },
  {
    num: 11,
    name: "Abertura de Carrinho",
    explanation: "Foco total em vendas; anuncia abertura de inscrições.",
    example: "“Inscrições abertas para o Venda Todo Santo Dia!”",
  },
  {
    num: 12,
    name: "Ativador de Notificações",
    explanation: "Gera expectativa para lives/conteúdos densos, pedindo ativar sininhos/alertas.",
    example: "“Amanhã tem live sobre X — ativa o lembrete aqui pra não perder!”",
  },
  {
    num: 13,
    name: "Alerta para Voltar",
    explanation: "Faz o público revisar um story anterior, reforçando valor.",
    example: "“Alerta de resposta valiosa: volta no story anterior e salva!”",
  },
  {
    num: 14,
    name: "B.I Apurado",
    explanation: "Coleta informações da audiência (pesquisa, enquetes).",
    example: "“Qual seu maior desafio com relacionamentos?”",
  },
  {
    num: 15,
    name: "Print Valioso",
    explanation: "Induz o seguidor a tirar print de algo importante.",
    example: "“Prepare o print — no próximo story vou entregar muito valor.”",
  },
  {
    num: 16,
    name: "Identidade do Comunicador",
    explanation: "A forma única e consistente de se comunicar (palavras, bordões).",
    example: "Repetir frases e expressões únicas em todos os stories.",
  },
  {
    num: 17,
    name: "Identidade do Produto/Serviço",
    explanation: "Dá um estilo próprio e inconfundível ao produto, descomoditizando-o.",
    example: "Criar nomes únicos: “Furadeira”, “Plano Light Balboa”, etc.",
  },
  {
    num: 18,
    name: "Identidade do Consumidor",
    explanation: "Comunicação voltada ao cliente ideal, para atrair o certo e repelir o errado.",
    example: "“Disciplina pra emagrecer de forma definitiva” afasta quem quer milagre.",
  },
  {
    num: 19,
    name: "Desabafo",
    explanation: "Dá espaço pra exposições pessoais e identificação emocional.",
    example: "“Quem aqui já foi desacreditado profissionalmente?”",
  },
  {
    num: 20,
    name: "Opinião de Quem Comprou",
    explanation: "Mostra depoimentos de clientes que usaram o produto.",
    example: "“Você já vendeu com stories hoje? Me conta!”",
  },
  {
    num: 21,
    name: "Peça Compartilhamento",
    explanation: "Pede pra audiência compartilhar o conteúdo com amigos.",
    example: "“Se esse story fez sentido pra você, compartilha com 5 amigas.”",
  },
  {
    num: 22,
    name: "Nome Esquisito",
    explanation: "Dar nomes curiosos aos métodos/processos — gera curiosidade e diferenciação.",
    example: "“Anteninha do Prazer”, “Zé Gatilho”, “Remarketing dos Sonhos.”",
  },
  {
    num: 23,
    name: "Espetacularização",
    explanation: "Exagerar algo comum, tornando-o interessante e emocional.",
    example: "“O café mais importante da história da minha empresa ☕🔥”",
  },
  {
    num: 24,
    name: "Você Sabia?",
    explanation: "Começa com um fato chocante pra prender atenção.",
    example: "“Você sabia que um orgasmo acende uma lâmpada?”",
  },
  {
    num: 25,
    name: "Micro Influência",
    explanation: "Recomendações pessoais e exóticas — reforça autoridade.",
    example: "“Quer um livro que quase ninguém conhece? ‘BrandWashed’!”",
  },
  {
    num: 26,
    name: "Presente Difícil",
    explanation: "Gincanas e desafios com prêmios que exigem mais esforço.",
    example: "“Adivinha todos os países da ONU — quem acertar ganha mentoria.”",
  },
  {
    num: 27,
    name: "Resposta Escondida",
    explanation: "Deixa uma revelação “oculta” em um dos stories pra gerar retenção.",
    example: "“Tem algo valioso escondido no 3º story — descobre e me conta.”",
  },
  {
    num: 28,
    name: "Tarja de Curiosidade",
    explanation: "Cobre parte do texto/imagem para forçar curiosidade.",
    example: "“O nome do meu método é ▓▓▓▓ — com mil reações eu revelo!”",
  },
  {
    num: 29,
    name: "Psicologia Reversa",
    explanation: "Falar o oposto do esperado para gerar credibilidade.",
    example: "“Não compra o meu curso — compra do concorrente (é pior 😎).”",
  },
  {
    num: 30,
    name: "Resumo",
    explanation: "Pede para o público resumir o conteúdo — ativa envolvimento.",
    example: "“Quem fizer o melhor resumo da live ganha uma sessão comigo.”",
  },
  {
    num: 31,
    name: "Os 7 Erros",
    explanation: "Mostra situações erradas e pede ao público identificar.",
    example: "“Quais os 3 erros nessa mesa posta?”",
  },
  {
    num: 32,
    name: "Diário",
    explanation: "Compartilha momentos reais e vulneráveis do dia a dia.",
    example: "“Hoje eu chorei no meio do expediente — e aprendi algo pesado.”",
  },
  {
    num: 33,
    name: "Crítica",
    explanation: "Deixa o público desabafar ou reagir a um tema quente.",
    example: "“Conta aqui: já se arrependeu de comprar um curso digital?”",
  },
  {
    num: 34,
    name: "Demonstração Curta",
    explanation: "Mostra visualmente o produto em ação.",
    example: "“Veja em 10 segundos como o Stories 10x funciona.”",
  },
  {
    num: 35,
    name: "Enquete com Curiosidade Real",
    explanation: "Usa perguntas curiosas que todos querem responder.",
    example: "“Quantos banhos você toma por dia?”",
  },
  {
    num: 36,
    name: "Link Oculto",
    explanation: "Usa links de forma sutil ou surpresa no meio do conteúdo.",
    example: "“Outro dia contei uma história da minha mãe… [link escondido]”",
  },
  {
    num: 37,
    name: "Indicação Pretensiosa",
    explanation: "Pede pra audiência indicar algo — faz ela sentir que participa.",
    example: "“Me indiquem os melhores apps de finanças, vou testar todos.”",
  },
  {
    num: 38,
    name: "Levante a Mão",
    explanation: "Mede o interesse e aquece o público para ações futuras.",
    example: "“Quem quer participar da minha live amanhã? Manda um 🙋‍♀️ no inbox.”",
  },
];

export function SocialEngineeringDevicesDisplay() {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Nº</TableHead>
            <TableHead className="min-w-[150px]">Nome do Dispositivo</TableHead>
            <TableHead className="min-w-[250px]">Explicação</TableHead>
            <TableHead className="min-w-[250px]">Exemplo de uso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialEngineeringDevicesData.map((device) => (
            <TableRow key={device.num}>
              <TableCell className="font-medium">{device.num}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.explanation}</TableCell>
              <TableCell>{device.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}