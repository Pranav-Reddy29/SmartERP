export const validateLedger=(body:any)=>{

    if(!body.ledgerName){

        return "Ledger Name is required";

    }

    if(!body.groupId){

        return "Ledger Group required";

    }

    if(!body.companyId){

        return "Company required";

    }

    return null;

};