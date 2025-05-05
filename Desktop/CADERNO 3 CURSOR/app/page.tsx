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
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-primary mb-3 animate-float">
            Caderno Digital ✨
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Envie uma foto do seu caderno e veja a mágica acontecer com IA! 
            Transforme suas anotações em conteúdo digital organizado 📚🚀
          </p>
        </div>

        {/* Seção principal */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center">
              <span className="mr-2">📸</span> Upload da Imagem
            </h2>
            
            {/* Componente de upload */}
            <ImageUploader onImageSelected={handleImagemSelecionada} />
            
            {/* Botão de análise */}
            <div className="flex justify-center mt-6 mb-8">
              <button
                className={`px-8 py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
                  imagemSelecionada
                    ? 'bg-primary hover:bg-indigo-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={processarImagem}
                disabled={!imagemSelecionada || carregando}
              >
                {carregando ? 'Processando...' : '✨ Analisar Anotação'}
              </button>
            </div>
            
            {/* Mensagem de erro */}
            {erro && (
              <div className="mb-8 p-4 bg-red-50 rounded-lg border-l-4 border-accent text-accent animate-fadeIn">
                <p className="flex items-center">
                  <span className="mr-2">⚠️</span> {erro}
                </p>
              </div>
            )}
            
            {/* Estado de carregamento */}
            {carregando && (
              <div className="animate-fadeIn">
                <LoadingSpinner message="Analisando sua anotação com IA. Isso pode levar alguns segundos... ✨" />
              </div>
            )}
            
            {/* Resultados da análise */}
            {resultado && !carregando && (
              <div className="mt-8 animate-fadeIn">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center">
                  <span className="mr-2">🎉</span> Resultados da Análise
                </h2>
                <ResultadoAnalise resultado={resultado} />
              </div>
            )}
          </div>
        </div>
        
        {/* Destaques e benefícios (visível apenas quando não há resultado) */}
        {!resultado && !carregando && (
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-indigo-700 mb-2">Transcrição Perfeita</h3>
              <p className="text-gray-600">Converte seu texto escrito à mão em texto digital com precisão.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-indigo-700 mb-2">Resumos Inteligentes</h3>
              <p className="text-gray-600">Cria resumos didáticos para facilitar seu estudo e memorização.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-bold text-indigo-700 mb-2">Exercícios Práticos</h3>
              <p className="text-gray-600">Gera exercícios personalizados baseados no conteúdo do seu caderno.</p>
            </div>
          </div>
        )}
        
        {/* Rodapé */}
        <footer className="mt-12 text-center text-gray-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Caderno Digital - Transformando estudos com IA ✨</p>
        </footer>
      </div>
    </main>
  );
}
