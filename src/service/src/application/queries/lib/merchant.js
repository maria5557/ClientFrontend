import manageRequest from '@/domain/manageRequest';

const merchantUseCases = {
 
  getMerchants: (signal, values, token) => {
    return manageRequest(
      signal,
      'getMerchants',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined
    );
  },

  
  deleteMerchant: (signal, values, token) => {
    return manageRequest(
      signal,
      'deleteMerchant',
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

  getMerchantById: (signal, values, token) => {
    return manageRequest(
      signal,
      'getMerchantById',
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
  
  updateMerchant: (signal, values, token) => {
    const { id, ...body } = values;
  
    console.log(body)
    return manageRequest(
        signal,
        'updateMerchant',
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

    createMerchant: (signal, values, token) => {
        return manageRequest(
          signal,
          'createMerchant',        // nombre lógico de la operación
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

};

export default merchantUseCases;
