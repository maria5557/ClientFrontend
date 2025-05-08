import Service from "@/service/src";

export const handleEdit = (id: string) => {
    window.location.href = `/clients/edit?id=${id}`;
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