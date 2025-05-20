import Service from "@/service/src";
import type { MerchantDTO } from '@/common/types/merchant';
import { parseError } from '@/common/utils/parseError';

export const getMerchants = async (): Promise<MerchantDTO[]> => {
  try {
    const response = await Service.getuseCases("getMerchants", {
      signal: null,
      endPointData: {},
      token: "",
    });
    return response as MerchantDTO[];
  } catch (error) {
    throw await parseError(error);
  }
};


  export const getMerchantById = async (id: string): Promise<MerchantDTO> => {
    try {
      const response = await Service.getuseCases('getMerchantById', {
        endPointData: { id },
        token: '',
        signal: null,
      });
      return response as MerchantDTO;
    }catch (error) {
      throw await parseError(error);
    }
  };

  export const getMerchantByName = async (name: string): Promise<MerchantDTO[]> => {
    try {
      const response = await Service.getuseCases('getMerchantByName', {
        endPointData: { name },
        token: '',
        signal: null,
      });
      return response as MerchantDTO[];
      
    } catch (error) {
      throw await parseError(error);
    }
  };




export const handleEdit = (id?: string) => {
    window.location.href = `/merchants/${id}/edit`;
  };
  
  export const handleDelete = async (id?: string): Promise<boolean> =>  {
    const confirmed = window.confirm("¿Estás seguro de que quieres borrar este merchant?");
    if (!confirmed) return false;
  
    try {
      await Service.getuseCases("deleteMerchant", {
        endPointData: { id },
        token: "",
        signal: null,
      });
      return true;

    } catch (error) {
      console.error("Error al borrar merchant:", error);
      alert("No se pudo borrar el merchant.");
      return false;
    }
  };


 
  
  export const updateMerchant = async (id: string, merchantData: MerchantDTO) => {
    try {
      await Service.getuseCases('updateMerchant', {
        endPointData: { id, ...merchantData },
        token: '',
        signal: null,
      });
    } catch (error) {
      console.error('Error updating merchant:', error);
      throw new Error('No se pudo actualizar el merchant');
    }
  };


  export const createMerchant = async (merchantData: MerchantDTO) => {
    try {
      await Service.getuseCases('createMerchant', {
        endPointData: merchantData,
        token: '',
        signal: null,
      });
    } catch (error) {
      console.error('Error al crear el merchant:', error);
      throw new Error('No se pudo crear el merchant');
    }
  };

