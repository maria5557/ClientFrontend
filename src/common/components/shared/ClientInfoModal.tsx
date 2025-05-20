'use client';

import { ClientDTO } from '@/common/types/client';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';


type Props = {
  open: boolean;
  onClose: () => void;
  clientNotFound: boolean;
  clientData: ClientDTO | null;
};

const ClientInfoModal = ({ open, onClose, clientNotFound, clientData }: Props) => {
  const router = useRouter();

  const handleViewClientPage = () => {
    if (clientData?.name) {
      const params = new URLSearchParams();
      params.set('clientName', clientData.name);
      router.push(`/clients?${params.toString()}`);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Información del Cliente">
      {clientNotFound ? (
        <p style={{ color: 'red' }}>Cliente no encontrado o no asociado.</p>
      ) : clientData ? (
        <div className="space-y-2">
          <p><strong>Nombre:</strong> {clientData.name} {clientData.surname}</p>
          <p><strong>Email:</strong> {clientData.email}</p>
          <button
            onClick={handleViewClientPage}
            className="text-blue-600 hover:underline text-sm mt-2"
          >
            Ver más sobre este cliente
          </button>
        </div>
      ) : (
        <p>Cargando información del cliente...</p>
      )}
    </Modal>
  );
};

export default ClientInfoModal;
