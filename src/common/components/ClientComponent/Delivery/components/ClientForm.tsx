'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { updateClient, createClient } from '../../infraestructure/functions';
import type { ClientDTO } from '@/common/types/client';

type ClientFormProps = {
  initialClient?: ClientDTO;
  clientId?: string;
};

export default function ClientForm({ initialClient = {}, clientId }: ClientFormProps) {
  console.log("El cliente inicial en el formulario es: ", initialClient)
  const router = useRouter();
  const isEditing = !!clientId;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const clientData = {
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      cifNifNie: formData.get('cifNifNie') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      if (isEditing) {
        await updateClient(clientId!, clientData);
      } else {
        await createClient(clientData);
      }
      router.push('/clients');
    } catch (error) {
      console.error('Error guardando cliente:', error);
      alert('Error al guardar cliente');
    }
  }

  // Función para manejar el botón de "Volver"
  const handleGoBack = () => {
    //router.back();  // Regresa a la página anterior
    router.push("/clients");
    //Tambien se puede usar router.replace(). Dif
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        {isEditing ? 'Editar Cliente' : 'Crear Cliente'}
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={initialClient?.name || ''}
            required
            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            name="surname"
            id="surname"
            defaultValue={initialClient?.surname || ''}
            required
            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="cifNifNie" className="block text-sm font-medium text-gray-700">CIF/NIF/NIE</label>
          <input
            type="text"
            name="cifNifNie"
            id="cifNifNie"
            defaultValue={initialClient?.cifNifNie || ''}
            required
            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={initialClient?.email || ''}
            required
            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            name="phone"
            id="phone"
            defaultValue={initialClient?.phone || ''}
            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleGoBack}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Volver
        </button>
        
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
        </button>
      </div>
    </form>
  );
}
