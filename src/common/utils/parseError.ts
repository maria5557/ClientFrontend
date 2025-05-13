export const parseError = async (error: any): Promise<Error> => {
    if (error?.response?.status && error.response.data) {
      const { status, message } = error.response.data;
      return new Error(message || `Error ${status}`);
    }
  
    if (error?.status === 404) {
      return new Error('Recurso no encontrado');
    }
  
    return new Error('Error inesperado');
  };
  