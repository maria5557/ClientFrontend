'use client';

import { Modal } from 'antd';

type Props = {
  open: boolean;
  onClose: () => void;
  clientNotFound: boolean;
  clientData: { name: string; email: string } | null;
};

const ClientInfoModal = ({ open, onClose, clientNotFound, clientData }: Props) => (
  <Modal open={open} onCancel={onClose} footer={null} title="Información del Cliente">
    {clientNotFound ? (
      <p style={{ color: 'red' }}>Cliente no encontrado o no asociado.</p>
    ) : clientData ? (
      <div className="space-y-2">
        <p><strong>Nombre:</strong> {clientData.name}</p>
        <p><strong>Email:</strong> {clientData.email}</p>
      </div>
    ) : (
      <p>Cargando información del cliente...</p>
    )}
  </Modal>
);

export default ClientInfoModal;
