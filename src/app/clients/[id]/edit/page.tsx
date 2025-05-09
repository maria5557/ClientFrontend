import { getClientById } from '@/common/components/ClientComponent/infraestructure/functions';
import ClientForm from "@/common/components/ClientComponent/Delivery/ClientForm";

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await getClientById(params.id);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Editar cliente</h1>
      <ClientForm initialClient={client} clientId={params.id} />
    </div>
  );
}
