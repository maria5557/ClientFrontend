'use client';

import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { MerchantDTO } from '@/common/types/merchant';
import {message} from 'antd';


type Props = {
  open: boolean;
  onClose: () => void;
  merchantsNotFound: boolean;
  merchants: MerchantDTO[] | null;
};

const MerchantsByClientModal = ({ open, onClose, merchantsNotFound, merchants }: Props) => {
  const router = useRouter();

  const handleViewMore = (merchantName: string) => {
    const params = new URLSearchParams();
    params.set('merchantName', merchantName);
    router.push(`/merchants?${params.toString()}`);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Merchants Asociados">
      {merchantsNotFound ? (
        <p className="text-red-500">No se encontraron merchants asociados a este cliente.</p>
      ) : merchants ? (
        <div className="space-y-2">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="flex items-center justify-between border-b pb-2">
              <span className="text-md font-medium text-gray-800 truncate">
                {merchant.name || 'No disponible'}
              </span>
              {merchant.name && (
                <button
                onClick={() => {
                  if (merchant.name) {
                    handleViewMore(merchant.name);
                  } else {
                    message.error('Nombre de merchant no disponible');
                  }
                }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver más
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando merchants...</p>
      )}
    </Modal>
  );
};

export default MerchantsByClientModal;
