'use client'

import { Table, Typography } from 'antd';
import { ClientTableSkeleton } from '@/common/components/Skeleton'; 
import { useEffect, useState } from 'react';

const { Title } = Typography;

const ClientTable = ({ clientes }: { clientes: Record<string, any>[] }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (clientes && clientes.length > 0) {
      setData(clientes);
    }
    setLoading(false);
  }, [clientes]);

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellido', dataIndex: 'surname', key: 'surname' },
    { title: 'DNI', dataIndex: 'cifNifNie', key: 'cifNifNie' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Lista de Clientes</Title>

      {loading ? (
       <div className="space-y-4">
       {[...Array(10)].map((_, index) => (
         <ClientTableSkeleton key={index} />
       ))}
     </div>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default ClientTable;
