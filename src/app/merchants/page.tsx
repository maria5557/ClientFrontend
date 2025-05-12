import MerchantsPageComponent from '@/common/components/pages/MerchantPage/Delivery';
import { ClientTableSkeleton } from '@/common/components/Skeleton';
import { Suspense } from "react";

export default function MerchantsPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<ClientTableSkeleton />}>
        <MerchantsPageComponent />
      </Suspense>
    </div>
  );
}
