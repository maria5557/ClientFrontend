import Service from "@/service/src";

export interface ClientDTO {
    id?: string;
    name?: string;
    surname?: string;
    cifNifNie?: string;
    email?: string;
    phone?: string;
  }


export const handleEdit = (id: string) => {
    window.location.href = `/clients/${id}/edit`;
  };
  
  export const handleDelete = async (id: string): Promise<boolean> =>  {
    const confirmed = window.confirm("¿Estás seguro de que quieres borrar este cliente?");
    if (!confirmed) return false;
  
    try {
      await Service.useCases("deleteClient", {
        endPointData: { id },
        token: "",
        signal: null,
      });
      return true;

    } catch (error) {
      console.error("Error al borrar cliente:", error);
      alert("No se pudo borrar el cliente.");
      return false;
    }
  };


  export const getClientById = async (id: string): Promise<ClientDTO> => {
    const response = await Service.useCases('getClientById', {
      endPointData: { id },
      token: '',
      signal: null,
    });
  
    return response as ClientDTO;
  };
  
  export const updateClient = async (id: string, clientData: any) => {
    try {
      await Service.useCases('updateClient', {
        endPointData: { id, ...clientData },
        token: '',
        signal: null,
      });
    } catch (error) {
      console.error('Error updating client:', error);
      throw new Error('No se pudo actualizar el cliente');
    }
  };


  export const createClient = async (clientData: any) => {
    try {
      await Service.useCases('createClient', {
        endPointData: clientData,
        token: '',
        signal: null,
      });
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw new Error('No se pudo crear el cliente');
    }
  };