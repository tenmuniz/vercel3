import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Processando...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full relative animate-pulse">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg">✨</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-indigo-700 font-medium">{message}</p>
        <p className="text-xs text-gray-500 mt-2">Estamos usando inteligência artificial para processar sua imagem</p>
      </div>
      
      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-indigo-700 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
} 