'use client';

import { Modal } from 'antd';

type Props = {
  open: boolean;
  onClose: () => void;
  merchant: Record<string, any> | null;
  clientData: { name: string; email: string } | null;
  clientNotFound: boolean;
};

const MerchantDetailModal = ({ open, onClose, merchant, clientData, clientNotFound }: Props) => (
  <Modal open={open} onCancel={onClose} footer={null} title="Detalles del Merchant">
    {merchant ? (
      <div className="space-y-2">
        <p><strong>Nombre:</strong> {merchant.name}</p>
        <p><strong>Dirección:</strong> {merchant.address}</p>
        <p><strong>Tipo:</strong> {merchant.merchantTypeDescription}</p>
        {clientNotFound ? (
          <p><strong>Cliente:</strong> No tiene cliente asociado</p>
        ) : clientData ? (
          <>
            <p><strong>Cliente:</strong> {clientData.name}</p>
            <p><strong>Email del Cliente:</strong> {clientData.email}</p>
          </>
        ) : (
          <p>Cargando información del cliente...</p>
        )}
      </div>
    ) : (
      <p>Cargando información del merchant...</p>
    )}
  </Modal>
);

export default MerchantDetailModal;
