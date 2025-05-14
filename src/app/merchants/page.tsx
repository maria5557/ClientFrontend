import MerchantsPageComponent from '@/common/components/pages/MerchantPage/Delivery';
import { ClientTableSkeleton } from '@/common/components/Skeleton';
import { Suspense } from "react";
import SearchBar from '@/common/components/SearchBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merchants',
};


export default function MerchantsPage({searchParams}: { searchParams?: {
  merchantName?: string
  page?: string}
}) {

  const queryParam = searchParams?.merchantName || '' ;


  return (
    <div className="p-6">
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <SearchBar placeholder="Buscar Merchants..."  query="merchantName"/>
          </div>
    
          <Suspense key={queryParam}  //la key lo que hace es que el suspense se ejecute cada vez que cambie la query
          fallback = {<ClientTableSkeleton/>} >
            <MerchantsPageComponent query={queryParam}  />
          </Suspense>
        </div>
  );
}
