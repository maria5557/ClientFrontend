'use client';

import { Table, Typography, message, Button, Modal } from 'antd';
import { useState } from 'react';
import { handleDelete, handleEdit, getMerchantsByClientId } from '@/common/components/ClientComponent/infraestructure/functions';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

const ClientTable = ({ clientes }: { clientes: Record<string, any>[] }) => {
  const [data, setData] = useState<Record<string, any>[]>(clientes);
  const [merchantsModalVisible, setMerchantsModalVisible] = useState(false);
  const [merchantNames, setMerchantNames] = useState<string[] | null>(null);
  const [merchantsNotFound, setMerchantsNotFound] = useState(false);
  const router = useRouter();

  const updateData = (id: string) => {
    setData((prev) => prev.filter((cliente) => cliente.id !== id));
  };

  const showMerchantsModal = async (idCliente: string) => {
    try {
      const response = await getMerchantsByClientId(idCliente);
      if (response?.merchants && response.merchants.length > 0) {
        const names = response.merchants.map((m: any) => m.name || 'Nombre no disponible');
        setMerchantNames(names);
        setMerchantsNotFound(false);
      } else {
        setMerchantNames(null);
        setMerchantsNotFound(true);
      }
    } catch (error) {
      setMerchantNames(null);
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
      render: (_: any, record: Record<string, any>) => (
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
            onClick={() => showMerchantsModal(record.id)}
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

      <Modal
        open={merchantsModalVisible}
        onCancel={() => {
          setMerchantsModalVisible(false);
          setMerchantNames(null);
          setMerchantsNotFound(false);
        }}
        footer={null}
        title="Merchants Asociados"
      >
        {merchantsNotFound ? (
          <p style={{ color: 'red' }}>No se encontraron merchants asociados a este cliente.</p>
        ) : merchantNames ? (
          <ul className="list-disc list-inside space-y-1">
            {merchantNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>Cargando merchants...</p>
        )}
      </Modal>
    </div>
  );
};

export default ClientTable;
