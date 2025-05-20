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
      undefined,
      {},
      true,
      values
    );
  },

  getClientById: (signal, values, token) => {
    return manageRequest(
      signal,
      'getClientById',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      {},
      true,
      values
    );
  },


  getMerchantsByClientId: (signal, values, token) => {
    return manageRequest(
      signal,
      'getMerchantsByClientId',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      {},
      true,
      values
    );
  },

  getClientByName: (signal, values, token) => {
    return manageRequest(
      signal,
      'getClientByName',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      {},
      true,
      values
    );
  },

  
  getClientByEmail: (signal, values, token) => {
    return manageRequest(
      signal,
      'getClientByEmail',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      {},
      true,
      values
    );
  },
  
  updateClient: (signal, values, token) => {
    const { id, ...body } = values;
  
    console.log(body)
    return manageRequest(
        signal,
        'updateClient',
         body,            
        'normal',         
        'normal',           
        'PUT',                 
        token,
        undefined,
        {
          'Content-Type': 'application/json', 
        },
        true,
        {id},
      );
    },

    createClient: (signal, values, token) => {
        return manageRequest(
          signal,
          'createClient',        // nombre lógico de la operación
          values,                // datos a enviar como cuerpo
          'body',              
          'normal',              // tipo de cliente (o configuración interna)
          'post',                // método HTTP correcto para crear recursos
          token,
          undefined,
          {
            'Content-Type': 'application/json', 
          },
          true
        );
      },


      loginClient: (signal, values, token) => {
        return manageRequest(
          signal,
          'loginClient',       
          values,             
          'body',              
          'normal',             
          'post',              
          token,
          undefined,
          {
            'Content-Type': 'application/json', 
          },
          true
        );
      },

};

export default clientUseCases;
