import { getMerchantById } from '@/common/components/MerchantComponent/Infraestructure/functions';
import MerchantForm from "@/common/components/MerchantComponent/Delivery/MerchatForm";

export default async function EditMerchantPage({ params }: { params: { id: string } }) {
  const merchant = await getMerchantById(params.id);

  return (
    <div className="p-4">
      <MerchantForm initialMerchant={merchant} merchantId={params.id} />
    </div>
  );
}
