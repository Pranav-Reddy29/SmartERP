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

  voucherDate: Date;

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