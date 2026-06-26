export interface CreateLedgerDTO{

    ledgerName:string;

    ledgerType:string;

    openingBalance:number;

    balanceType:string;

    gstNumber?:string;

    phone?:string;

    email?:string;

    address?:string;

    state?:string;

    groupId:string;

    companyId:string;

}