export interface ResultadoAnalise {
  transcricao: string;
  resumo: string;
  topicos: string[];
  importante_saber: string[];
  exercicios: Exercicio[];
}

export interface Exercicio {
  pergunta: string;
  resposta: string;
}

export interface RespostaProcessamento {
  sucesso: boolean;
  dados?: ResultadoAnalise;
  erro?: string;
} 