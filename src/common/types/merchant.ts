export enum MerchantType {
    MERCHANT_TYPE_PERSONAL_SERVICES = 'MERCHANT_TYPE_PERSONAL_SERVICES',
    MERCHANT_TYPE_FINANCIAL_SERVICES = 'MERCHANT_TYPE_FINANCIAL_SERVICES'
  }

export interface MerchantDTO {
    id?: string;
    name?: string;
    address?: string;
    idCliente?: string;
    merchantType?: MerchantType;
}

export const merchantTypeMap: Record<string, string> = {
  MERCHANT_TYPE_PERSONAL_SERVICES: 'Servicios personales',
  MERCHANT_TYPE_FINANCIAL_SERVICES: 'Servicios financieros',
};