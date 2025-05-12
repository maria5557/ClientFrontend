'use client';

import { Table, Typography, message, Button } from 'antd';
import { useState } from 'react';
import { handleDelete, handleEdit } from '@/common/components/MerchantComponent/Infraestructure/functions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

const MerchantTable = ({ merchants }: { merchants: Record<string, any>[]}) => {
  const [data, setData] = useState<Record<string, any>[]>(merchants);
  const router = useRouter();

  const updateData = (id: string) => {
    setData((prev) => prev.filter((merchant) => merchant.id !== id));
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Dirección', dataIndex: 'address', key: 'address' },
    { title: 'Tipo', dataIndex: 'merchantTypeDescription', key: 'merchantTypeDescription' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Record<string, any>) => (
        <div className="flex gap-2">
          <Button
            size="small"
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id!)}
          >
            Editar
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={async () => {
              const success = await handleDelete(record.id!);
              if (success) {
                updateData(record.id!);
                message.success("Merchant borrado correctamente");
              }
            }}
          >
            Borrar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Lista de Merchants</Title>

      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => router.push('/merchants/nuevo')}>
          Crear Merchant
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </div>
  );
};

export default MerchantTable;
