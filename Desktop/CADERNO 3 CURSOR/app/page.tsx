'use client';

import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import LoadingSpinner from './components/LoadingSpinner';
import ResultadoAnalise from './components/ResultadoAnalise';
import { ResultadoAnalise as ResultadoAnaliseType } from './utils/types';
import axios from 'axios';

export default function Home() {
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoAnaliseType | null>(null);

  const handleImagemSelecionada = (file: File) => {
    setImagemSelecionada(file);
    // Limpar resultados anteriores quando uma nova imagem é selecionada
    setResultado(null);
    setErro(null);
  };

  const processarImagem = async () => {
    if (!imagemSelecionada) {
      setErro('Por favor, selecione uma imagem antes de continuar.');
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      // Criar form data para enviar a imagem
      const formData = new FormData();
      formData.append('imagem', imagemSelecionada);

      // Enviar para a API
      const response = await axios.post('/api/processar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.data.sucesso) {
        setResultado(response.data.dados);
      } else {
        setErro(response.data.erro || 'Ocorreu um erro ao processar a imagem.');
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      setErro('Ocorreu um erro ao processar a imagem. Por favor, tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Caderno Digital
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Faça upload de uma foto do seu caderno e obtenha uma análise completa do conteúdo, 
            incluindo transcrição, resumo, tópicos importantes e exercícios.
          </p>
        </div>

        {/* Seção principal */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Upload da Imagem
            </h2>
            
            {/* Componente de upload */}
            <ImageUploader onImageSelected={handleImagemSelecionada} />
            
            {/* Botão de análise */}
            <div className="flex justify-center mt-4 mb-8">
              <button
                className={`px-6 py-3 rounded-md text-white font-medium transition-all ${
                  imagemSelecionada
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={processarImagem}
                disabled={!imagemSelecionada || carregando}
              >
                {carregando ? 'Processando...' : 'Analisar Anotação'}
              </button>
            </div>
            
            {/* Mensagem de erro */}
            {erro && (
              <div className="mb-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{erro}</p>
              </div>
            )}
            
            {/* Estado de carregamento */}
            {carregando && (
              <LoadingSpinner message="Analisando sua anotação. Isso pode levar alguns segundos..." />
            )}
            
            {/* Resultados da análise */}
            {resultado && !carregando && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Resultados da Análise
                </h2>
                <ResultadoAnalise resultado={resultado} />
              </div>
            )}
          </div>
        </div>
        
        {/* Rodapé */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Caderno Digital - Todos os direitos reservados</p>
        </footer>
      </div>
    </main>
  );
}
