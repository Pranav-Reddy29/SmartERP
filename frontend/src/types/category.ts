export interface Category {
  id: string;

  name: string;

  description?: string;

  companyId: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateCategoryDTO {
  name: string;

  description?: string;

  companyId: string;
}

export interface UpdateCategoryDTO {
  name?: string;

  description?: string;
}

export interface CategoryResponse {
  success: boolean;

  category: Category;
}

export interface CategoryListResponse {
  success: boolean;

  categories: Category[];
}