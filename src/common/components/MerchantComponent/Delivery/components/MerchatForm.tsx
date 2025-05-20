'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import { updateMerchant, createMerchant } from '@/common/components/MerchantComponent/Infraestructure/functions';
import { getClientByEmail, getClientById } from '@/common/components/ClientComponent/infraestructure/functions';
import type { MerchantDTO, MerchantType } from '@/common/types/merchant';

type MerchantFormProps = {
  initialMerchant?: MerchantDTO;
  merchantId?: string;
};

export default function MerchantForm({ initialMerchant = {}, merchantId }: MerchantFormProps) {
  const router = useRouter();
  const isEditing = !!merchantId;

  const [showClientInput, setShowClientInput] = useState(false);
  const [clientEmail, setClientEmail] = useState(''); // Antes: clientName
  const [idCliente, setIdCliente] = useState(initialMerchant?.idCliente || '');
  const [clientError, setClientError] = useState('');
  const [clientAssigned, setClientAssigned] = useState(false);
  const [clientLabel, setClientLabel] = useState('');

  // Obtener datos del cliente si ya hay uno asignado
  useEffect(() => {
    if (initialMerchant?.idCliente) {
      getClientById(initialMerchant.idCliente)
        .then(client => {
          if (client?.name) {
            setClientLabel(client.name);
            setClientAssigned(true);
          }
        })
        .catch(() => {
          setClientLabel('(Cliente desconocido)');
        });
    }
  }, [initialMerchant?.idCliente]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const merchantData = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      idCliente: idCliente || undefined, // opcional
      merchantType: formData.get('merchantType') as MerchantType,
    };

    try {
      if (isEditing) {
        await updateMerchant(merchantId!, merchantData);
      } else {
        await createMerchant(merchantData);
      }
      router.push('/merchants');
    } catch (error) {
      console.error('Error guardando merchant:', error);
      alert('Error al guardar merchant');
    }
  }

  async function handleClientSearch(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!clientEmail.trim()) return;

    // Validación de email
    const isValidEmail = /^(.+)@(.+)$/.test(clientEmail.trim());
    if (!isValidEmail) {
      setClientError('Email inválido');
      return;
    }

  
    try {
      const client = await getClientByEmail(clientEmail.trim());
      if (client?.id) {
        setIdCliente(client.id);
        setClientLabel(client?.name || '');
        setClientAssigned(true);
        setClientError('');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Recurso no encontrado')) {
        setClientError('El cliente no existe.');
      } else {
        console.error('Error al buscar cliente:', error);
        setClientError('Error al buscar cliente.');
      }
      setIdCliente('');
      setClientAssigned(false);
      setClientLabel('');
    }
  }

  function handleReplaceClient() {
    setShowClientInput(true);
    setClientAssigned(false);
    setIdCliente('');
    setClientLabel('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        {isEditing ? 'Editar Merchant' : 'Crear Merchant'}
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={initialMerchant?.name || ''}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            name="address"
            id="address"
            defaultValue={initialMerchant?.address || ''}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="merchantType" className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            name="merchantType"
            id="merchantType"
            defaultValue={initialMerchant?.merchantType || ''}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Selecciona un tipo</option>
            <option value="MERCHANT_TYPE_PERSONAL_SERVICES">Servicios personales</option>
            <option value="MERCHANT_TYPE_FINANCIAL_SERVICES">Servicios financieros</option>
          </select>
        </div>

        <div>
          {!clientAssigned && (
            <button
              type="button"
              onClick={() => setShowClientInput(true)}
              className="text-blue-600 hover:underline"
            >
              Añadir cliente
            </button>
          )}

          {clientAssigned && (
            <div className="flex items-center justify-between bg-green-50 p-2 rounded">
              <p className="text-green-700 text-sm">
                Cliente asignado: <strong>{clientLabel}</strong>
              </p>
              <button
                type="button"
                onClick={handleReplaceClient}
                className="text-blue-600 text-sm hover:underline"
              >
                Cambiar
              </button>
            </div>
          )}

          {showClientInput && !clientAssigned && (
            <div className="mt-2 space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Email del cliente" 
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={handleClientSearch}
                className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
              >
                Buscar cliente
              </button>
              {clientError && (
                <p className="text-red-600 text-sm">{clientError}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => router.push("/merchants")}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Volver
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Merchant'}
        </button>
      </div>
    </form>
  );
}
