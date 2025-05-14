'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientTable from '@/common/components/ClientComponent/Delivery';
import { getClientByEmail, getClientByName } from '@/common/components/ClientComponent/infraestructure/functions';

export default function ClientSearchPage() {
  const [clientes, setClientes] = useState<Record<string, any>[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchClient = async () => {
      if (!query) return;
      try {
        const result = query.includes('@')
          ? await getClientByEmail(query)
          : await getClientByName(query);

        setClientes(Array.isArray(result) ? result : [result]);      
      } catch (error) {
        setClientes([]);
      }
    };

    fetchClient();
  }, [query]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Resultados de búsqueda</h1>
      {clientes.length > 0 ? (
        <ClientTable clientes={clientes} />
      ) : (
        <p className="text-gray-500">No se encontraron clientes.</p>
      )}
    </div>
  );
}
