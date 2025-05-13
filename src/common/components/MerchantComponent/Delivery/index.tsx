'use client';

import { Table, Typography, message, Button, Modal } from 'antd';
import { useState } from 'react';
import { handleDelete, handleEdit } from '@/common/components/MerchantComponent/Infraestructure/functions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getClientById } from '@/common/components/ClientComponent/infraestructure/functions';

const { Title } = Typography;

const MerchantTable = ({ merchants }: { merchants: Record<string, any>[] }) => {
  const [data, setData] = useState<Record<string, any>[]>(merchants);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [clientData, setClientData] = useState<{ name: string; email: string } | null>(null);
  const [clientNotFound, setClientNotFound] = useState(false);
  const router = useRouter();

  const updateData = (id: string) => {
    setData((prev) => prev.filter((merchant) => merchant.id !== id));
  };

  const showClientModal = async (idCliente: string) => {
    try {
      const client = await getClientById(idCliente);
      if (client) {
        setClientData({
          name: client.name ?? 'Nombre no disponible',
          email: client.email ?? 'Email no disponible',
        });
        setClientNotFound(false);
      } else {
        setClientData(null);
        setClientNotFound(true);
      }
    } catch (error) {
      setClientData(null);
      setClientNotFound(true);
    } finally {
      setClientModalVisible(true);
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Dirección', dataIndex: 'address', key: 'address' },
    { title: 'Tipo', dataIndex: 'merchantTypeDescription', key: 'merchantTypeDescription' },
    {
      title: 'Cliente',
      key: 'client',
      render: (_: any, record: Record<string, any>) => {
        const hasClient = record.idCliente && record.idCliente !== '';
        return hasClient ? (
          <Button
            type="link"
            onClick={() => showClientModal(record.idCliente)}
          >
            Ver cliente
          </Button>
        ) : (
          <span>No tiene cliente</span>
        );
      },
    },
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

      <Modal
        open={clientModalVisible}
        onCancel={() => {
          setClientModalVisible(false);
          setClientData(null);
          setClientNotFound(false);
        }}
        footer={null}
        title="Información del Cliente"
      >
        {clientNotFound ? (
          <p style={{ color: 'red' }}>Cliente no encontrado o no asociado</p>
        ) : clientData ? (
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {clientData.name}</p>
            <p><strong>Email:</strong> {clientData.email}</p>
          </div>
        ) : (
          <p>Cargando información del cliente...</p>
        )}
      </Modal>
    </div>
  );
};

export default MerchantTable;
