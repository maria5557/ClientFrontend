export const EXAMPLE_QUERIES = {
  getComerces: (values) =>
    `https://localhost:3000/updateComerce/${values.id}`,
  getClients: () => `http://localhost:8080/clients`,
  deleteClient: (values) => `http://localhost:8080/clients/${values.id}`,
  getClientById: (values) => `http://localhost:8080/clients/${values.id}`,
  updateClient: (values)  => `http://localhost:8080/clients/${values.id}`,
  createClient: () => `http://localhost:8080/clients`,
};

export const EXAMPLE_ERROR_MESSAGES = {
  exampleQuery:'error',
  getClients:'No hay clientes'
}