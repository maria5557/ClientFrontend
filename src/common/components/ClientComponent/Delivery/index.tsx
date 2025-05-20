'use client';

import { Table, Typography, message, Button } from 'antd';
import { useState } from 'react';
import { handleDelete, handleEdit, getMerchantsByClientId } from '@/common/components/ClientComponent/infraestructure/functions';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MerchantsByClientModal from '@/common/components/shared/MerchantsByClientModal';
import { ClientDTO } from '@/common/types/client';
import { MerchantDTO } from '@/common/types/merchant';

const { Title } = Typography;

const ClientTable = ({ clientes }: { clientes: ClientDTO[] }) => {

  const [data, setData] = useState<ClientDTO[]>(clientes);
  const [merchantsModalVisible, setMerchantsModalVisible] = useState(false);
  const [merchants, setMerchants] = useState<MerchantDTO[] | null>(null);
  const [merchantsNotFound, setMerchantsNotFound] = useState(false);
  const router = useRouter();

  const updateData = (id?: string) => {
    setData((prev) => prev.filter((cliente) => cliente.id !== id));
  };

  const showMerchantsModal = async (idCliente: string) => {
    try {
      const response = await getMerchantsByClientId(idCliente);
      if (response?.merchants && response.merchants.length > 0) {
        setMerchants(response.merchants);
        setMerchantsNotFound(false);
      } else {
        setMerchants(null);
        setMerchantsNotFound(true);
      }
    } catch {
      setMerchants(null);
      setMerchantsNotFound(true);
    } finally {
      setMerchantsModalVisible(true);
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellido', dataIndex: 'surname', key: 'surname' },
    { title: 'DNI', dataIndex: 'cifNifNie', key: 'cifNifNie' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: ClientDTO) => (
        <div className="flex gap-2">
          <Button
            size="small"
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            Editar
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={async () => {
              const success = await handleDelete(record.id);
              if (success) {
                updateData(record.id);
                message.success('Cliente borrado correctamente');
              }
            }}
          >
            Borrar
          </Button>
          <Button
            size="small"
            type="default"
            icon={<InfoCircleOutlined />}
            onClick={() => {
              if (record.id) {
                showMerchantsModal(record.id);
              } else {
                message.error('ID de cliente no disponible');
              }
            }}
          >
            Más info
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Lista de Clientes</Title>

      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => router.push('/clients/nuevo')}>
          Crear Cliente
        </Button>
      </div>

      <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} rowKey="id" />

      <MerchantsByClientModal
        open={merchantsModalVisible}
        onClose={() => {
          setMerchantsModalVisible(false);
          setMerchants(null);
          setMerchantsNotFound(false);
        }}
        merchantsNotFound={merchantsNotFound}
        merchants={merchants}
      />
    </div>
  );
};

export default ClientTable;
