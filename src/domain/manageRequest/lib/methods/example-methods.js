import { merchantTypeMap } from '@/common/types/merchant';


export const EXAMPLE_METHODS = {
  
  getComerces: (response) => {
    
    return response
  },

  getClients: (response) => {
    return response.data;
  },

  deleteClient: (response) => {
    return response;
  },

  getClientById: (response) => {
    return response.data;
  },
  
  updateClient: (response) => {
    return response;
  },

  createClient: (response) => {
    return response;
  },
  getClientByName: (response) => {
    return response.data;
  },
  getClientByEmail: (response) => {
    return response.data;
  },
  getMerchantsByClientId: (response) => {
    return response.data;
  },
  

  getMerchants: (response) => {
    return response.data;
  },

  deleteMerchant: (response) => {
    return response;
  },
  getMerchantById: (response) => {
    return response.data;
  },
  updateMerchant: (response) => {
    return response;
  },
  createMerchant: (response) => {
    return response;
  },
  getMerchantByName: (response) => {
    return response.data;
  },
  
};
