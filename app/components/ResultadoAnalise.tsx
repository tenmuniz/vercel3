import { ResultadoAnalise as ResultadoAnaliseType } from '../utils/types';
import { useState } from 'react';

interface ResultadoAnaliseProps {
  resultado: ResultadoAnaliseType;
}

export default function ResultadoAnalise({ resultado }: ResultadoAnaliseProps) {
  const [activeTab, setActiveTab] = useState('resumo');
  
  // Definição das abas
  const tabs = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'transcricao', label: 'Transcrição' },
    { id: 'topicos', label: 'Tópicos' },
    { id: 'importante', label: 'Importante Saber' },
    { id: 'exercicios', label: 'Exercícios' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Abas de navegação */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      <div className="p-6">
        {/* Resumo */}
        {activeTab === 'resumo' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Resumo</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{resultado.resumo}</p>
            </div>
          </div>
        )}

        {/* Transcrição */}
        {activeTab === 'transcricao' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Transcrição</h2>
            <div className="prose max-w-none bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 whitespace-pre-line">{resultado.transcricao}</p>
            </div>
          </div>
        )}

        {/* Tópicos */}
        {activeTab === 'topicos' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Pontos Principais</h2>
            <ul className="list-disc pl-6 space-y-2">
              {resultado.topicos.map((topico, index) => (
                <li key={index} className="text-gray-700">{topico}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Importante Saber */}
        {activeTab === 'importante' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Importante Saber</h2>
            <div className="space-y-3">
              {resultado.importante_saber.map((item, index) => (
                <div key={index} className="bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercícios */}
        {activeTab === 'exercicios' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Exercícios</h2>
            <div className="space-y-6">
              {resultado.exercicios.map((exercicio, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="font-medium text-gray-800 mb-2">
                    Exercício {index + 1}: {exercicio.pergunta}
                  </div>
                  <details className="mt-2">
                    <summary className="text-blue-600 cursor-pointer select-none">
                      Ver resposta
                    </summary>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-700">{exercicio.resposta}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 