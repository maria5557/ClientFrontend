import ClientTable from '@/common/components/ClientComponent/Delivery';
import Service from '@/service/src';


export default async function ClientsPageComponent() {
    let res: { data: Record<string, any>[] } = { data: [] };
  
    try {
        res = await Service.useCases("getClients", {
        signal: null,
        endPointData: {},
        token: "",
      }) as { data: Record<string, any>[] };
    
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  
    return (
          <ClientTable clientes={res.data} />
    );
  }