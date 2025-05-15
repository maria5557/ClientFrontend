'use client';

import { Modal } from 'antd';

type Props = {
  open: boolean;
  onClose: () => void;
  merchantsNotFound: boolean;
  merchants: Record<string, any>[] | null;
};

const MerchantsByClientModal = ({ open, onClose, merchantsNotFound, merchants }: Props) => (
  <Modal open={open} onCancel={onClose} footer={null} title="Merchants Asociados">
    {merchantsNotFound ? (
      <p className="text-red-500">No se encontraron merchants asociados a este cliente.</p>
    ) : merchants ? (
      <div className="space-y-2">
        {merchants.map((merchant, index) => (
          <div key={index} className="flex items-center space-x-3 border-b pb-2">
            <span className="text-md font-medium text-gray-800 truncate">{merchant.name || 'No disponible'}</span>
          </div>
        ))}
      </div>
    ) : (
      <p>Cargando merchants...</p>
    )}
  </Modal>
);

export default MerchantsByClientModal;
