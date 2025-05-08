'use client'

import { Table, Typography, message  } from 'antd';
import { useState } from 'react';
import { handleDelete, handleEdit } from '@/common/components/ClientComponent/infraestructure/functions';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ClientTable = ({ clientes }: { clientes: Record<string, any>[] }) => {
  const [data, setData] = useState<Record<string, any>[]>(clientes);


  // Función para actualizar el estado de la tabla tras eliminar
  const updateData = (id: string) => {
    setData((prev) => prev.filter((cliente) => cliente.id !== id));
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
            onClick={() => handleEdit(record.id)}>
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
                message.success("Cliente borrado correctamente");
              }
            }}>
            Borrar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Lista de Clientes</Title>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </div>
  );
};

export default ClientTable;
