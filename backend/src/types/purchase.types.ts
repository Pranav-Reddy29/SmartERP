export interface PurchaseItemDTO {
  productId: string;

  quantity: number;

  rate: number;

  discount?: number;

  gstRate?: number;

  gstAmount?: number;

  amount: number;
}

export interface CreatePurchaseDTO {
  voucherNumber: string;

  voucherDate: Date;

  supplierId: string;

  companyId: string;

  subTotal: number;

  discount?: number;

  gstTotal?: number;

  grandTotal: number;

  notes?: string;

  items: PurchaseItemDTO[];
}

export interface UpdatePurchaseDTO
  extends Partial<CreatePurchaseDTO> {}