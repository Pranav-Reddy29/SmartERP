export interface ProductCategory {
  id: string;

  name: string;
}

export interface ProductUnit {
  id: string;

  name: string;

  shortName: string;
}

export interface Product {
  id: string;

  name: string;

  sku: string;

  hsnCode: string;

  gstRate: number;

  openingStock: number;

  purchasePrice: number;

  sellingPrice: number;

  minimumStock: number;

  companyId: string;

  categoryId: string;

  unitId: string;

  category: ProductCategory;

  unit: ProductUnit;

  createdAt: string;

  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;

  sku: string;

  hsnCode: string;

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

export interface ProductResponse {
  success: boolean;

  product: Product;
}

export interface ProductListResponse {
  success: boolean;

  products: Product[];
}