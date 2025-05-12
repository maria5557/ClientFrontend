import MerchantTable from '@/common/components/MerchantComponent/Delivery';
import Service from '@/service/src';

export default async function MerchantsPageComponent() {
  let res: { data: Record<string, any>[]  } = { data: [] };

  try {
    res = await Service.useCases("getMerchants", {
      signal: null,
      endPointData: {},
      token: "",
    }) as { data:Record<string, any>[] };
  } catch (error) {
    console.error("Error al obtener merchants:", error);
  }

  return (
    <MerchantTable merchants={res.data} />
  );
}
