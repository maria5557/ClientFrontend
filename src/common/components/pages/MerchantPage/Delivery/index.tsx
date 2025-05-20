import MerchantTable from '@/common/components/MerchantComponent/Delivery';
import {getMerchants, getMerchantByName} from '@/common/components/MerchantComponent/Infraestructure/functions'

export default async function MerchantsPageComponent({ query }: { query?: string }) {
  const res: { data: Record<string, any>[]  } = { data: [] };

  try {
    if(query){
      const merchant = await getMerchantByName(query)
      res.data = merchant || [];
    }else{
      const allMerchants = await getMerchants();
      res.data = allMerchants;
    }

  } catch (error) {
    console.error("Error al obtener merchants:", error);
    res.data = [];
  }

  return (
    <MerchantTable merchants={res.data} />
  );
}
