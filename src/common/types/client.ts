export interface ClientDTO {
  id?: string;
  name?: string;
  surname?: string;
  cifNifNie?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface MerchantObject {
  id: string;
  name: string;
}

export interface ClientMerchantOutputDTO {
  id: string;
  name: string;
  surname: string;
  cifNifNie: string;
  phone: string;
  email: string;
  merchants: MerchantObject[];
}