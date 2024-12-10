import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { addressService } from '../../services/api';

interface AddressLookupProps {
  onAddressFound: (address: any) => void;
}

export default function AddressLookup({ onAddressFound }: AddressLookupProps) {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);
  };

  const lookupAddress = async () => {
    if (cep.length !== 8) {
      setError('CEP inválido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const address = await addressService.getAddressByCep(cep);
      if (address.erro) {
        setError('CEP não encontrado');
      } else {
        onAddressFound(address);
      }
    } catch (err) {
      setError('Erro ao buscar endereço');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={cep}
          onChange={handleCepChange}
          maxLength={8}
          placeholder="Digite o CEP"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
        />
        <button
          onClick={lookupAddress}
          disabled={loading}
          className="px-4 py-2 bg-[#36c6c6] text-white rounded-lg hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors disabled:opacity-50"
        >
          {loading ? 'Buscando...' : <Search className="h-5 w-5" />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}