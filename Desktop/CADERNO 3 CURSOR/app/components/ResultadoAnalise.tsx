import { ResultadoAnalise as ResultadoAnaliseType } from '../utils/types';
import { useState } from 'react';

interface ResultadoAnaliseProps {
  resultado: ResultadoAnaliseType;
}

export default function ResultadoAnalise({ resultado }: ResultadoAnaliseProps) {
  const [activeTab, setActiveTab] = useState('resumo');
  
  // Definição das abas com ícones
  const tabs = [
    { id: 'resumo', label: 'Resumo', icon: '📝' },
    { id: 'transcricao', label: 'Transcrição', icon: '📄' },
    { id: 'topicos', label: 'Tópicos', icon: '📋' },
    { id: 'importante', label: 'Importante Saber', icon: '💡' },
    { id: 'exercicios', label: 'Exercícios', icon: '✏️' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
      {/* Abas de navegação */}
      <div className="flex flex-wrap border-b border-indigo-100 bg-indigo-50/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-4 px-5 text-sm md:text-base font-medium transition-all flex items-center ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary bg-white'
                : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      <div className="p-6">
        {/* Resumo */}
        {activeTab === 'resumo' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📝</span>
              <h2 className="text-xl font-semibold text-indigo-700">Resumo</h2>
            </div>
            <div className="prose max-w-none bg-gradient-to-br from-indigo-50/50 to-white p-5 rounded-xl border border-indigo-100 shadow-sm">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{resultado.resumo}</p>
            </div>
          </div>
        )}

        {/* Transcrição */}
        {activeTab === 'transcricao' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📄</span>
              <h2 className="text-xl font-semibold text-indigo-700">Transcrição</h2>
            </div>
            <div className="prose max-w-none bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-700 whitespace-pre-line font-mono text-sm">{resultado.transcricao}</p>
            </div>
          </div>
        )}

        {/* Tópicos */}
        {activeTab === 'topicos' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📋</span>
              <h2 className="text-xl font-semibold text-indigo-700">Pontos Principais</h2>
            </div>
            <ul className="space-y-3">
              {resultado.topicos.map((topico, index) => (
                <li key={index} className="flex items-start bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <span className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-3 shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{topico}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Importante Saber */}
        {activeTab === 'importante' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">💡</span>
              <h2 className="text-xl font-semibold text-indigo-700">Importante Saber</h2>
            </div>
            <div className="space-y-4">
              {resultado.importante_saber.map((item, index) => (
                <div key={index} className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
                  <div className="flex">
                    <span className="text-xl mr-3">💭</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercícios */}
        {activeTab === 'exercicios' && (
          <div className="animate-fadeIn">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">✏️</span>
              <h2 className="text-xl font-semibold text-indigo-700">Exercícios</h2>
            </div>
            <div className="space-y-6">
              {resultado.exercicios.map((exercicio, index) => (
                <div key={index} className="bg-white border border-indigo-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center font-medium text-indigo-800 mb-3">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <p>{exercicio.pergunta}</p>
                  </div>
                  <details className="mt-3 group">
                    <summary className="text-primary cursor-pointer select-none font-medium flex items-center">
                      <span className="mr-2">👀</span> Ver resposta
                      <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="mt-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
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