export const EXAMPLE_QUERIES = {
  getClients: () => `http://localhost:8080/clients`,
  deleteClient: (values) => `http://localhost:8080/clients/${values.id}`,
  getClientById: (values) => `http://localhost:8080/clients/${values.id}`,
  updateClient: (values)  => `http://localhost:8080/clients/${values.id}`,
  createClient: () => `http://localhost:8080/clients`,

  getMerchants: () => `http://localhost:8081/merchants`,
  deleteMerchant: (values) => `http://localhost:8081/merchants/${values.id}`,
  getMerchantById: (values) => `http://localhost:8081/merchants/${values.id}`,
  updateMerchant: (values)  => `http://localhost:8081/merchants/${values.id}`,
  createMerchant: () => `http://localhost:8081/merchants`,

};

export const EXAMPLE_ERROR_MESSAGES = {
  exampleQuery:'error',
  getClients:'No hay clientes'
}