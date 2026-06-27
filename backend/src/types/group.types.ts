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