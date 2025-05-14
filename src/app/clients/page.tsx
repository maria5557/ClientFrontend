import ClientsPageComponent from '@/common/components/pages/ClientPage/Delivery';
import SearchBar from '@/common/components/SearchBar';
import { ClientTableSkeleton } from '@/common/components/Skeleton';
import { Suspense } from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clientes',
};

export default async function ClientsPage({searchParams}: { searchParams?: {
  clientName?: string
  page?: string}
}) {

  const queryParam = searchParams?.clientName || '' ;
  //const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="p-6">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchBar placeholder="Buscar Clientes..."  query="clientName"/>
      </div>

      <Suspense key={queryParam}  //la key lo que hace es que el suspense se ejecute cada vez que cambie la query
      fallback = {<ClientTableSkeleton/>} >
        <ClientsPageComponent query={queryParam}  />
      </Suspense>
    </div>
  );
}
