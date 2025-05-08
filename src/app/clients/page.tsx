import ClientsPageComponent from '@/common/components/pages/ClientPage/Delivery';
import { ClientTableSkeleton } from '@/common/components/Skeleton';
import { Suspense } from "react";

export default async function ClientsPage() {
  return (
    <div className="p-6">
      <Suspense fallback = {<ClientTableSkeleton/>} >
        <ClientsPageComponent />
      </Suspense>
    </div>
  );
}
