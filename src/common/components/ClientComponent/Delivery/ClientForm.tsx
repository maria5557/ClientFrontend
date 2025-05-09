'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { updateClient, createClient } from '../infraestructure/functions';

type ClientFormProps = {
  initialClient?: {
    name?: string;
    surname?: string;
    cifNifNie?: string;
    email?: string;
    phone?: string;
  };
  clientId?: string;
};

export default function ClientForm({ initialClient = {}, clientId }: ClientFormProps) {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <label>
        Nombre:
        <input type="text" name="name" defaultValue={initialClient.name} required />
      </label>
      <label>
        Apellido:
        <input type="text" name="surname" defaultValue={initialClient.surname} required />
      </label>
      <label>
        CIF/NIF/NIE:
        <input type="text" name="cifNifNie" defaultValue={initialClient.cifNifNie} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" defaultValue={initialClient.email} required />
      </label>
      <label>
        Teléfono:
        <input type="text" name="phone" defaultValue={initialClient.phone} />
      </label>
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
      </button>
    </form>
  );
}
