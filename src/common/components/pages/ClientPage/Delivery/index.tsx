import ClientTable from '@/common/components/ClientComponent/Delivery';
import {
  getClientByEmail,
  getClientByName,
  getClients,
} from '@/common/components/ClientComponent/infraestructure/functions';
import { ClientDTO } from '@/common/types/client';

export default async function ClientsPageComponent({ query, token }: { query?: string; token?:string}) {

  const res: { data: ClientDTO[] } = { data: [] };

  try {
    if (query) {
      if (query.includes('@')) {
        // Buscar por email
        const client = await getClientByEmail(query);
        res.data = client ? [client] : [];
      } else {
        // Buscar por nombre
        const clients = await getClientByName(query);
        res.data = clients || [];
      }
    } else {
      // Obtener todos los clientes
      const allClients = await getClients(token);


      res.data = allClients;
    }
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.data = [];
  }


  return <ClientTable clientes={res.data} />;
}
