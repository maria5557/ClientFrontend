'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { updateMerchant, createMerchant } from '@/common/components/MerchantComponent/Infraestructure/functions';
import type { MerchantDTO, MerchantType } from '@/common/types/merchant';

type MerchantFormProps = {
  initialMerchant?: MerchantDTO;
  merchantId?: string;
};

export default function MerchantForm({ initialMerchant = {}, merchantId }: MerchantFormProps) {
  const router = useRouter();
  const isEditing = !!merchantId;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const merchantData = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      idCliente: formData.get('idCliente') as string,
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
          <label htmlFor="idCliente" className="block text-sm font-medium text-gray-700">ID Cliente</label>
          <input
            type="text"
            name="idCliente"
            id="idCliente"
            defaultValue={initialMerchant?.idCliente || ''}
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
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => router.back()}
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
