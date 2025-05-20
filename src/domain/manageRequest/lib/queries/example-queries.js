export const EXAMPLE_QUERIES = {
  getClients: () => `http://localhost:8080/clients`,
  deleteClient: (values) => `http://localhost:8080/clients/${values.id}`,
  getClientById: (values) => `http://localhost:8080/clients/${values.id}`,
  getClientByName: (values) => `http://localhost:8080/clients/search/${values.name}`,
  getClientByEmail: (values) => `http://localhost:8080/clients/email/${values.email}`,
  getMerchantsByClientId: (values) => `http://localhost:8080/clients/${values.id}/merchants`,


  updateClient: (values)  => `http://localhost:8080/clients/${values.id}`,
  createClient: () => `http://localhost:8080/clients`,
  loginClient: () => `http://localhost:8080/clients/login`,


  getMerchants: () => `http://localhost:8081/merchants`,
  deleteMerchant: (values) => `http://localhost:8081/merchants/${values.id}`,
  getMerchantById: (values) => `http://localhost:8081/merchants/${values.id}`,
  getMerchantByName: (values) => `http://localhost:8081/merchants/search/${values.name}`,
  updateMerchant: (values)  => `http://localhost:8081/merchants/${values.id}`,
  createMerchant: () => `http://localhost:8081/merchants`,

};

export const EXAMPLE_ERROR_MESSAGES = {
  exampleQuery:'error',
  getClients:'No hay clientes'
}