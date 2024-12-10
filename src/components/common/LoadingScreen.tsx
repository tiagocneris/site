import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36c6c6]" />
        <p className="mt-4 text-neutral-600">Carregando...</p>
      </div>
    </div>
  );
}