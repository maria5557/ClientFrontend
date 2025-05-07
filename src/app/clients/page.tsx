import ClientTable from '@/common/components/ClientComponent/Delivery';
import Service from '@/service/src';
import { Suspense } from "react";

export default async function ClientsPage() {
  let res: { data: Record<string, any>[] } = { data: [] };

  try {
     res = await Service.useCases("getClients", {
      signal: null,
      endPointData: {},
      token: "token-ejemplo",
    }) as { data: Record<string, any>[] };
  
  } catch (error) {
    console.error("Error al obtener clientes:", error);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      <Suspense>
        <ClientTable clientes={res.data} />
      </Suspense>
    </div>
  );
}
