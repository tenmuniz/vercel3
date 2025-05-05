import { NextRequest, NextResponse } from 'next/server';
import { processarImagem } from '@/app/utils/openai';
import { RespostaProcessamento } from '@/app/utils/types';

export async function POST(request: NextRequest) {
  try {
    // Verifica se a chave da API existe
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { sucesso: false, erro: 'Chave da API da OpenAI não configurada' } as RespostaProcessamento,
        { status: 500 }
      );
    }

    // Obtém o FormData do request
    const formData = await request.formData();
    const imagemFile = formData.get('imagem') as File | null;

    if (!imagemFile) {
      return NextResponse.json(
        { sucesso: false, erro: 'Nenhuma imagem enviada' } as RespostaProcessamento,
        { status: 400 }
      );
    }

    // Converte a imagem para base64
    const imagemBytes = await imagemFile.arrayBuffer();
    const imagemBase64 = Buffer.from(imagemBytes).toString('base64');

    // Processa a imagem com a OpenAI
    const resultado = await processarImagem(imagemBase64);

    // Retorna o resultado
    return NextResponse.json(
      { sucesso: true, dados: resultado } as RespostaProcessamento,
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    const mensagemErro = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return NextResponse.json(
      { sucesso: false, erro: mensagemErro } as RespostaProcessamento,
      { status: 500 }
    );
  }
} 