export interface Unit {
  id: string;

  name: string;

  shortName: string;

  companyId: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateUnitDTO {
  name: string;

  shortName: string;

  companyId: string;
}

export interface UpdateUnitDTO {
  name?: string;

  shortName?: string;
}

export interface UnitResponse {
  success: boolean;

  unit: Unit;
}

export interface UnitListResponse {
  success: boolean;

  units: Unit[];
}