import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
  };

  const handleFileSelected = (file: File) => {
    // Verificar se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    // Criar URL para preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewURL(objectUrl);

    // Chamar callback
    onImageSelected(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelected(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mb-6">
      <div
        className={`border-3 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer transform hover:scale-[1.01] ${
          isDragging 
            ? 'border-primary bg-indigo-50' 
            : 'border-indigo-200 hover:border-primary hover:bg-indigo-50/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        {previewURL ? (
          <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg shadow-md">
            <div className="absolute top-2 right-2 z-10 bg-white/80 text-xs text-indigo-600 px-2 py-1 rounded-full font-medium">
              Imagem selecionada ✓
            </div>
            <Image
              src={previewURL}
              alt="Preview da imagem"
              className="object-contain w-full h-full"
              width={600}
              height={400}
            />
          </div>
        ) : (
          <div className="py-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Envie uma foto do seu caderno 📸
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Arraste e solte uma imagem aqui ou clique para selecionar do seu dispositivo
            </p>
            <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium text-sm">
              <span className="mr-2">📲</span> Selecionar foto
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Suporta JPG, PNG, HEIC (iPhone) • Tamanho máximo: 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 