import ClientForm from "@/common/components/ClientComponent/Delivery/ClientForm";

export default function CreateClientPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Crear Cliente</h1>
      <ClientForm  />
    </div>
  );
}
