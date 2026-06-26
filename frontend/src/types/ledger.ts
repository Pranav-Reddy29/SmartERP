export interface LedgerGroup {
  id: string;
  name: string;
  nature: string;
}

export interface Ledger {
  id: string;

  ledgerName: string;

  ledgerType: string;

  openingBalance: number;

  balanceType: string;

  gstNumber?: string;

  phone?: string;

  email?: string;

  address?: string;

  state?: string;

  isActive: boolean;

  companyId: string;

  groupId: string;

  group: LedgerGroup;

  createdAt: string;

  updatedAt: string;
}

export interface CreateLedgerDTO {
  ledgerName: string;

  ledgerType: string;

  openingBalance: number;

  balanceType: string;

  gstNumber?: string;

  phone?: string;

  email?: string;

  address?: string;

  state?: string;

  groupId: string;

  companyId: string;
}

export interface LedgerResponse {
  success: boolean;

  ledger: Ledger;
}

export interface LedgerListResponse {
  success: boolean;

  ledgers: Ledger[];
}