import manageRequest from '@/domain/manageRequest';

const clientUseCases = {
 
  getClients: (signal, values, token) => {
    return manageRequest(
      signal,
      'getClients',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined
    );
  },

  
  deleteClient: (signal, values, token) => {
    return manageRequest(
      signal,
      'deleteClient',
      values,
      'query',
      'normal',
      'delete',
      token,
      undefined
    );
  },


};

export default clientUseCases;
