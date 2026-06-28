export interface CreateCategoryDTO {

  name: string;

  description?: string;

  companyId: string;

}

export interface UpdateCategoryDTO {

  name?: string;

  description?: string;

}