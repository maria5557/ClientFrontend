'use client';

import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import Service from "@/service/src";

const { Title } = Typography;

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
  
    Service.useCases('getClients', {
      signal: controller.signal,
      endPointData: {},
      token: 'token-ejemplo',
    })
      .then((res) => {
        console.log("Respuesta del backend:", res);
        setClients(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener clientes", err);
      })
      .finally(() => {
        setLoading(false);
      });
  
    return () => controller.abort();
  }, []);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'DNI',
      dataIndex: 'cifNifNie',
      key: 'cifNifNie',
    },
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
      },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Lista de Clientes</Title>
      <Table
        dataSource={clients}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ClientTable;
