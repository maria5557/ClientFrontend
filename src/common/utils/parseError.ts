type CustomError = {
  response?: {
    status?: number;
    data?: {
      status?: number;
      message?: string;
    };
  };
  status?: number;
};


export const parseError = async (error: unknown): Promise<Error> => {
  const err = error as CustomError;

  if (err?.response?.status && err.response.data) {
    const { status, message } = err.response.data;
    return new Error(message || `Error ${status}`);
  }

  if (err?.status === 404) {
    return new Error('Recurso no encontrado');
  }

  return new Error('Error inesperado');
};
  