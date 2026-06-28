export interface CreateProductDTO {

  name: string;

  sku?: string;

  hsnCode?: string;

  gstRate: number;

  openingStock: number;

  purchasePrice: number;

  sellingPrice: number;

  minimumStock: number;

  categoryId: string;

  unitId: string;

  companyId: string;

}

export interface UpdateProductDTO {

  name?: string;

  sku?: string;

  hsnCode?: string;

  gstRate?: number;

  openingStock?: number;

  purchasePrice?: number;

  sellingPrice?: number;

  minimumStock?: number;

  categoryId?: string;

  unitId?: string;

}