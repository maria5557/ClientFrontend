import Service from "@/service/src";
import type { ClientDTO, ClientMerchantOutputDTO } from '@/common/types/client';
import { parseError } from '@/common/utils/parseError';
import { LoginDTO } from "@/common/types/login";
import Cookies from 'js-cookie';


const token2 = Cookies.get('authToken') || '';

export const getClients = async (token?: string): Promise<ClientDTO[]> => {
  try {
    const response = await Service.getuseCases("getClients", {
      signal: null,
      endPointData: {},
      token: token,
    });
    return response as ClientDTO[];
  } catch (error) {
    throw await parseError(error);
  }
};


export const getClientById = async (id: string): Promise<ClientDTO> => {
  try {
    const response = await Service.getuseCases('getClientById', {
      endPointData: { id },
      token: token2,
      signal: null,
    });
    return response as ClientDTO;
  } catch (error) {
    throw await parseError(error);
  }
};

export const getClientByName = async (name: string): Promise<ClientDTO[]> => {
  try {
    const response = await Service.getuseCases('getClientByName', {
      endPointData: { name },
      token: token2,
      signal: null,
    });
    return response as ClientDTO[];
    
  } catch (error) {
    throw await parseError(error);
  }
};

export const getClientByEmail = async (email: string): Promise<ClientDTO> => {
  try {
    const response = await Service.getuseCases('getClientByEmail', {
      endPointData: { email },
      token: token2,
      signal: null,
    });
    return response as ClientDTO;
  } catch (error) {
    console.log("me he metido en el catch de buscar por email")
    throw await parseError(error);
  }
};


export const getMerchantsByClientId = async (id: string): Promise<ClientMerchantOutputDTO> => {
  try {
    const response = await Service.getuseCases('getMerchantsByClientId', {
      endPointData: { id },
      token: token2,
      signal: null,
    });
    return response as ClientMerchantOutputDTO;
  } catch (error) {
    throw await parseError(error);
  }
};



export const handleEdit = (id?: string) => {
    window.location.href = `/clients/${id}/edit`;
  };
  
  export const handleDelete = async (id?: string): Promise<boolean> =>  {
    const confirmed = window.confirm("¿Estás seguro de que quieres borrar este cliente?");
    if (!confirmed) return false;
  
    try {
      await Service.getuseCases("deleteClient", {
        endPointData: { id },
        token: token2,
        signal: null,
      });
      return true;

    } catch (error) {
      console.error("Error al borrar cliente:", error);
      alert("No se pudo borrar el cliente.");
      return false;
    }
  };


 
  
  export const updateClient = async (id?: string, clientData?: ClientDTO) => {
    try {
      await Service.getuseCases('updateClient', {
        endPointData: { id, ...clientData },
        token: token2,
        signal: null,
      });
    } catch (error) {
      console.error('Error updating client:', error);
      throw new Error('No se pudo actualizar el cliente');
    }
  };


  export const createClient = async (clientData: ClientDTO) => {
    try {
      await Service.getuseCases('createClient', {
        endPointData: clientData,
        token: token2,
        signal: null,
      });
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw new Error('No se pudo crear el cliente');
    }
  };

  export const loginClient = async (email: string, password: string): Promise<LoginDTO> => {
    try {
      const token = await Service.getuseCases("loginClient", {
        endPointData: { email, password },
        token: '',
        signal: null,
      });
  
      return token as LoginDTO;
    } catch (error) {
      throw await parseError(error);
    }
  };