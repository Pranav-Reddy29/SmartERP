export interface PurchaseItem {
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

export interface Purchase {
  id: string;

  voucherNumber: string;

  voucherDate: string;

  supplierId: string;

  companyId: string;

  subTotal: number;

  discount: number;

  gstTotal: number;

  grandTotal: number;

  notes?: string;

  supplier: {
    id: string;

    ledgerName: string;
  };

  items: PurchaseItem[];

  createdAt: string;

  updatedAt: string;
}

export interface CreatePurchaseItemDTO {
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

  voucherDate: string;

  supplierId: string;

  companyId: string;

  subTotal: number;

  discount?: number;

  gstTotal?: number;

  grandTotal: number;

  notes?: string;

  items: CreatePurchaseItemDTO[];
}

export interface UpdatePurchaseDTO
  extends Partial<CreatePurchaseDTO> {}

export interface PurchaseResponse {
  success: boolean;

  purchase: Purchase;
}

export interface PurchaseListResponse {
  success: boolean;

  purchases: Purchase[];
}