export interface LedgerGroup {
  id: string;

  name: string;

  nature: string;

  description?: string;

  companyId: string;

  parentId?: string | null;

  parent?: LedgerGroup | null;

  children?: LedgerGroup[];

  createdAt: string;

  updatedAt: string;
}

export interface CreateGroupDTO {
  name: string;

  nature: string;

  description?: string;

  companyId: string;

  parentId?: string;
}

export interface UpdateGroupDTO {
  name?: string;

  nature?: string;

  description?: string;

  parentId?: string;
}