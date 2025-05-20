'use client';

import { Table, Typography, message, Button } from 'antd';
import { useState } from 'react';
import { handleDelete, handleEdit } from '@/common/components/MerchantComponent/Infraestructure/functions';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getClientById } from '@/common/components/ClientComponent/infraestructure/functions';
import ClientInfoModal from '@/common/components/shared/ClientInfoModal';
import MerchantDetailModal from '@/common/components/shared/MerchantDetailModal';
import { MerchantDTO } from '@/common/types/merchant';
import { ClientDTO } from '@/common/types/client';

const { Title } = Typography;


const MerchantTable = ({ merchants }: { merchants: MerchantDTO[] }) => {
  const [data, setData] = useState<MerchantDTO[]>(merchants);
  const [merchantModalVisible, setMerchantModalVisible] = useState(false);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [clientNotFound, setClientNotFound] = useState(false);
  const [selectedMerchantDetails, setSelectedMerchantDetails] = useState<MerchantDTO | null>(null);
  const [clientData, setClientData] = useState<Pick<ClientDTO, 'name' | 'surname' | 'email'> | null>(null);
  const router = useRouter();

  const updateData = (id?: string) => {
    setData((prev) => prev.filter((merchant) => merchant.id !== id));
  };

  const fetchClient = async (idCliente: string) => {
    try {
      const client = await getClientById(idCliente);
      if (client) {
        setClientData({
          name: client.name ?? '',
          surname: client.surname ?? '',
          email: client.email ?? 'Email no disponible',
        });
        setClientNotFound(false);
      } else {
        setClientData(null);
        setClientNotFound(true);
      }
    } catch (error: unknown) {
      setClientData(null);
      setClientNotFound(true);
    }
  };

  const handleShowClientModal = async (merchant: MerchantDTO) => {
    if (merchant.idCliente) {
      await fetchClient(merchant.idCliente);
    } else {
      setClientData(null);
      setClientNotFound(true);
    }
    setClientModalVisible(true);
  };

  const handleShowMerchantModal = async (merchant: MerchantDTO) => {
    setSelectedMerchantDetails(merchant);
    if (merchant.idCliente) {
      await fetchClient(merchant.idCliente);
    } else {
      setClientData(null);
      setClientNotFound(true);
    }
    setMerchantModalVisible(true);
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Dirección', dataIndex: 'address', key: 'address' },
    { title: 'Tipo', dataIndex: 'merchantTypeDescription', key: 'merchantTypeDescription' },
    {
      title: 'Cliente',
      key: 'client',
      render: (_: unknown, record: MerchantDTO) =>
        record.idCliente ? (
          <Button type="link" onClick={() => handleShowClientModal(record)}>
            Ver cliente
          </Button>
        ) : (
          <span>No tiene cliente</span>
        ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: MerchantDTO) => (
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
                message.success('Merchant borrado correctamente');
              }
            }}
          >
            Borrar
          </Button>
          <Button
            size="small"
            icon={<InfoCircleOutlined />}
            onClick={() => handleShowMerchantModal(record)}
          >
            Más info
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

      <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} rowKey="id" />

      <ClientInfoModal
        open={clientModalVisible}
        onClose={() => {
          setClientModalVisible(false);
          setClientData(null);
          setClientNotFound(false);
        }}
        clientNotFound={clientNotFound}
        clientData={clientData}
      />

      <MerchantDetailModal
        open={merchantModalVisible}
        onClose={() => {
          setMerchantModalVisible(false);
          setSelectedMerchantDetails(null);
          setClientData(null);
          setClientNotFound(false);
        }}
        merchant={selectedMerchantDetails}
        clientData={clientData}
        clientNotFound={clientNotFound}
      />
    </div>
  );
};

export default MerchantTable;
