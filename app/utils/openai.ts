import OpenAI from 'openai';
import { ResultadoAnalise } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processarImagem(base64Image: string): Promise<ResultadoAnalise> {
  try {
    const prompt = `
      Você está analisando uma imagem de anotações de caderno de uma estudante.
      Por favor, faça o seguinte:
      1. Transcreva todo o conteúdo escrito na imagem.
      2. Crie um resumo didático com base no conteúdo.
      3. Liste os pontos principais em tópicos.
      4. Indique os conceitos importantes que precisam ser memorizados.
      5. Crie 3 exercícios com resposta sobre o conteúdo para treinar o conhecimento.
      
      Formate sua resposta no seguinte formato JSON:
      {
        "transcricao": "texto completo transcrito",
        "resumo": "resumo didático",
        "topicos": ["tópico 1", "tópico 2", "tópico 3", ...],
        "importante_saber": ["conceito 1", "conceito 2", "conceito 3", ...],
        "exercicios": [
          {
            "pergunta": "Pergunta 1?",
            "resposta": "Resposta 1"
          },
          {
            "pergunta": "Pergunta 2?",
            "resposta": "Resposta 2"
          },
          {
            "pergunta": "Pergunta 3?",
            "resposta": "Resposta 3"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    // Extrair a resposta JSON
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Resposta da OpenAI vazia");
    }

    const resultadoJSON = JSON.parse(content) as ResultadoAnalise;
    return resultadoJSON;
  } catch (error) {
    console.error("Erro ao processar imagem com OpenAI:", error);
    throw error;
  }
} 