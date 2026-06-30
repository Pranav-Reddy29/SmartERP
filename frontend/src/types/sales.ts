export interface SalesItem {
  id: string;

  productId: string;

  quantity: number;

  rate: number;

  discount: number;

  gstRate: number;

  gstAmount: number;

  amount: number;

  product: {
    id: string;

    name: string;

    sku?: string;
  };
}

export interface Sales {
  id: string;

  voucherNumber: string;

  voucherDate: string;

  customerId: string;

  companyId: string;

  subTotal: number;

  discount: number;

  gstTotal: number;

  grandTotal: number;

  notes?: string;

  customer: {
    id: string;

    ledgerName: string;
  };

  items: SalesItem[];

  createdAt: string;

  updatedAt: string;
}

export interface CreateSalesItemDTO {
  productId: string;

  quantity: number;

  rate: number;

  discount?: number;

  gstRate?: number;

  gstAmount?: number;

  amount: number;
}

export interface CreateSalesDTO {
  voucherNumber: string;

  voucherDate: string;

  customerId: string;

  companyId: string;

  subTotal: number;

  discount?: number;

  gstTotal?: number;

  grandTotal: number;

  notes?: string;

  items: CreateSalesItemDTO[];
}

export interface UpdateSalesDTO
  extends Partial<CreateSalesDTO> {}

export interface SalesResponse {
  success: boolean;

  sales: Sales;
}

export interface SalesListResponse {
  success: boolean;

  sales: Sales[];
}